package LoL_Client_Back.services.implementations.domain.matchLogic;
import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import LoL_Client_Back.entities.reference.ChampionStyleEntity;
import LoL_Client_Back.entities.reference.PlayerMatchItemEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class DamageEstimatorService {

    public void distributeDamage(MatchEntity match) {
        if (match == null || match.getPlayerDetails() == null) return;

        for (PlayerMatchDetailEntity detail : match.getPlayerDetails()) {
            int estimatedDamage = estimateDamage(detail, match.getDuration());
            detail.setTotalDamage(estimatedDamage);
        }
    }

    private int estimateDamage(PlayerMatchDetailEntity detail, String duration) {
        // string to duration/minutes
        int minutes = parseDurationToMinutes(duration);

        // build style
        ChampionStyleEntity style = detectStyleFromItems(detail);

        // 3. Calcular daño base según estilo
        int baseDamage = getBaseDamageForStyle(style, minutes);


        int kills = (detail.getKills() != null ? detail.getKills() : 0);
        int assists = (detail.getAssists() != null ? detail.getAssists() : 0);

        //bonifications per kills & assists per minutes
        int killsBonus = (int) Math.round(kills * getScaledBonus(1500, minutes, false));
        int assistsBonus = (int) Math.round(assists * getScaledBonus(400, minutes, true));

        return baseDamage + killsBonus + assistsBonus;
    }

    public int parseDurationToMinutes(String duration) {
        if (duration == null || duration.isBlank()) {
            throw new IllegalArgumentException("Duration is null or empty");
        }

        String[] parts = duration.split(":");

        try {
            if (parts.length == 2) {
                int minutes = Integer.parseInt(parts[0]);
                int seconds = Integer.parseInt(parts[1]);

                return seconds >= 30 ? minutes + 1 : minutes;
            } else if (parts.length == 3) {
                int hours = Integer.parseInt(parts[0]);
                int minutes = Integer.parseInt(parts[1]);
                return hours * 60 + minutes;
            }
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Duration format not numeric: " + duration, e);
        }

        throw new IllegalArgumentException("Duration format not recognized: " + duration);
    }

    public int parseDurationToSeconds(String duration) {
        if (duration == null || duration.isBlank()) return 0;
        String[] parts = duration.split(":");
        try {
            if (parts.length == 2) { // mm:ss
                int minutes = Integer.parseInt(parts[0]);
                int seconds = Integer.parseInt(parts[1]);
                return minutes * 60 + seconds;
            } else if (parts.length == 3) { // hh:mm:ss
                int hours = Integer.parseInt(parts[0]);
                int minutes = Integer.parseInt(parts[1]);
                int seconds = Integer.parseInt(parts[2]);
                return hours * 3600 + minutes * 60 + seconds;
            }
        } catch (NumberFormatException e) {
            return 0; // fallback
        }
        return 0;
    }



    private ChampionStyleEntity detectStyleFromItems(PlayerMatchDetailEntity detail) {

        if (detail.getItems() == null || detail.getItems().isEmpty()) {
            return null;
        }

        // itemType principal
        Map<Long, Integer> styleCount = new HashMap<>();
        for (PlayerMatchItemEntity item : detail.getItems()) {
            if (item.getItem() != null && item.getItem().getItemType() != null) {
                styleCount.merge(item.getItem().getItemType().getId(), 1, Integer::sum);
            }
        }


        if (styleCount.isEmpty()) {
            return null;
        }

        // pick most frecuent item
        return styleCount.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(entry -> itemTypeFromId(entry.getKey())) // ⚡️ método helper para traer el verdadero entity
                .orElse(null);
    }

    private ChampionStyleEntity itemTypeFromId(Long id) {
        ChampionStyleEntity style = new ChampionStyleEntity();
        style.setId(id);

        switch (id.intValue()) {
            case 1 -> style.setStyle("Fighter");
            case 2 -> style.setStyle("Marksman");
            case 3 -> style.setStyle("Mage");
            case 4 -> style.setStyle("Assassin");
            case 5 -> style.setStyle("Tank");
            case 6 -> style.setStyle("Support");
            default -> style.setStyle("Unknown");
        }

        return style;
    }

    private int getBaseDamageForStyle(ChampionStyleEntity style, int minutes) {
        if (style == null) return 5000; // fallback por si no tiene items

        // Valores base para 20 minutos
        int min, max;
        switch (style.getStyle()) {
            case "Assassin", "Mage", "Marksman" -> { min = 5000; max = 11000; }
            case "Fighter" -> { min = 3000; max = 7000; }
            case  "Tank" -> { min = 2000; max = 5000; }
            case "Support" -> { min = 500; max = 1500; }
            default -> { min = 3000; max = 7000; }
        }

        int base = ThreadLocalRandom.current().nextInt(min, max + 1);
        double factor = getScalingFactor(minutes);

        return (int) Math.round(base * factor);
    }

    private double getScalingFactor(int minutes) {
        if (minutes <= 20) return 1.0;

        if (minutes <= 30) {
            // +3% por minuto entre 20 y 30 → máx 1.3x
            return 1.0 + 0.03 * (minutes - 20);
        }
        if (minutes <= 40) {
            // +2% por minuto entre 30 y 40 → máx 1.5x
            return 1.3 + 0.02 * (minutes - 30);
        }
        if (minutes <= 50) {
            // +1.5% por minuto entre 40 y 50 → máx 1.65x
            return 1.5 + 0.015 * (minutes - 40);
        }
        if (minutes <= 60) {
            // +1.5% por minuto entre 50 y 60 → máx 1.8x
            return 1.65 + 0.015 * (minutes - 50);
        }
        // Hard cap en 1.8
        return 1.8;
    }

    private double getScaledBonus(int baseBonus, int minutes, boolean isAssist) {
        double factor;
        if (minutes <= 20) factor = 1.0;
        else factor = 1.0 + 0.011 * (minutes - 20); // +1% por minuto

        if (isAssist) {
            return baseBonus * factor * 0.5; // asistencias valen la mitad
        }
        return baseBonus * factor;
    }

}
