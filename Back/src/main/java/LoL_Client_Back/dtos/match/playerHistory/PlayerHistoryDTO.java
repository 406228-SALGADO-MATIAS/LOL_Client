package LoL_Client_Back.dtos.match.playerHistory;

import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import LoL_Client_Back.entities.reference.PlayerMatchItemEntity;
import lombok.Data;

import java.util.*;
import java.util.stream.Collectors;

@Data
public class PlayerHistoryDTO {

    private RoleRatiosDTO rolesPlayed;
    private StyleRatiosDTO stylesPlayed;
    private List<MostUsedChampionDTO> top3Champions;
    private List<PlayerMatchDTO> matches;

    public void buildPlayerHistoryDTO (List<PlayerMatchDetailEntity> details) {
        setMatchesFromDetails(details);
        buildRoleRatios();
        buildStyleRatios(details);
        buildTop3Champions(details);
    }


    public void buildRoleRatios() {
        RoleRatiosDTO roleRatios = new RoleRatiosDTO();

        if (this.matches == null || this.matches.isEmpty()) {
            this.rolesPlayed = roleRatios;
            return;
        }

        int total = this.matches.size();

        long topCount = this.matches.stream().filter(m -> "TOP".equals(m.getRole())).count();
        long jgCount = this.matches.stream().filter(m -> "JUNGLE".equals(m.getRole())).count();
        long midCount = this.matches.stream().filter(m -> "MID".equals(m.getRole())).count();
        long adcCount = this.matches.stream().filter(m -> "ADC".equals(m.getRole())).count();
        long supCount = this.matches.stream().filter(m -> "SUPPORT".equals(m.getRole())).count();

        roleRatios.setTopRatio(Math.round((topCount * 10000.0 / total)) / 100.0);
        roleRatios.setJgRatio(Math.round((jgCount * 10000.0 / total)) / 100.0);
        roleRatios.setMidRatio(Math.round((midCount * 10000.0 / total)) / 100.0);
        roleRatios.setAdcRatio(Math.round((adcCount * 10000.0 / total)) / 100.0);
        roleRatios.setSupportRatio(Math.round((supCount * 10000.0 / total)) / 100.0);

        this.rolesPlayed = roleRatios;
    }

    public void buildStyleRatios(List<PlayerMatchDetailEntity> details) {
        StyleRatiosDTO styleRatios = new StyleRatiosDTO();
        if (details == null || details.isEmpty()) {
            this.stylesPlayed = styleRatios;
            return;
        }

        int totalDetails = details.size();
        int fighter = 0, marksman = 0, mage = 0, assassin = 0, tank = 0, support = 0;

        for (PlayerMatchDetailEntity detail : details) {
            if (detail.getItems() == null || detail.getItems().isEmpty()) continue;


            Map<String, Integer> styleCount = new HashMap<>();
            for (PlayerMatchItemEntity pItem : detail.getItems()) {
                if (pItem.getItem().getItemType() != null) {
                    String style = pItem.getItem().getItemType().getStyle();
                    styleCount.put(style, styleCount.getOrDefault(style, 0) + 1);
                }
            }

            if (!styleCount.isEmpty()) {

                String predominantStyle = styleCount.entrySet().stream()
                        .max(Map.Entry.comparingByValue())
                        .get()
                        .getKey();

                switch (predominantStyle) {
                    case "Fighter" -> fighter++;
                    case "Marksman" -> marksman++;
                    case "Mage" -> mage++;
                    case "Assassin" -> assassin++;
                    case "Tank" -> tank++;
                    case "Support" -> support++;
                }
            }
        }

        styleRatios.setFighterRatio(Math.round(fighter * 10000.0 / totalDetails) / 100.0);
        styleRatios.setMarksmanRatio(Math.round(marksman * 10000.0 / totalDetails) / 100.0);
        styleRatios.setMageRatio(Math.round(mage * 10000.0 / totalDetails) / 100.0);
        styleRatios.setAssassinRatio(Math.round(assassin * 10000.0 / totalDetails) / 100.0);
        styleRatios.setTankRatio(Math.round(tank * 10000.0 / totalDetails) / 100.0);
        styleRatios.setSupportRatio(Math.round(support * 10000.0 / totalDetails) / 100.0);

        this.stylesPlayed = styleRatios;
    }


    public void buildTop3Champions(List<PlayerMatchDetailEntity> details) {
        int totalMatches = details.size();
        if (totalMatches == 0) {
            this.top3Champions = new ArrayList<>();
            return;
        }

        Map<ChampionEntity, Long> counts = details.stream()
                .collect(Collectors.groupingBy(PlayerMatchDetailEntity::getChampion, Collectors.counting()));

        this.top3Champions = counts.entrySet().stream()
                .map(entry -> {
                    MostUsedChampionDTO dto = new MostUsedChampionDTO();
                    dto.setName(entry.getKey().getName());
                    dto.setImageSquare(entry.getKey().getImageSquare());

                    double ratio = (entry.getValue() * 100.0) / totalMatches;
                    ratio = Math.round(ratio * 100.0) / 100.0; // → 2 decimales
                    dto.setUseRatio(ratio);
                    return dto;
                })
                .sorted(Comparator.comparing(MostUsedChampionDTO::getUseRatio).reversed())
                .limit(3)
                .collect(Collectors.toList());
    }


    public void setMatchesFromDetails(List<PlayerMatchDetailEntity> details) {
        List<PlayerMatchDTO> dtos = new ArrayList<>();

        for (PlayerMatchDetailEntity detail : details) {
            MatchEntity match = detail.getMatch();

            PlayerMatchDTO dto = new PlayerMatchDTO();
            dto.setIdMatch(match.getId());
            dto.setDuration(match.getDuration());
            dto.setDate(match.getDate());

            dto.setKills(detail.getKills() != null ? detail.getKills() : 0);
            dto.setDeaths(detail.getDeaths() != null ? detail.getDeaths() : 0);
            dto.setAssists(detail.getAssists() != null ? detail.getAssists() : 0);
            dto.setTotalGold(detail.getTotalGold() != null ? detail.getTotalGold() : 0);
            dto.setTotalFarm(detail.getCreaturesKilled() != null ? detail.getCreaturesKilled() : 0);

            if (!match.getRanked()) {
                dto.setMirrorChampions(true);
                if ("ARAM - Howling Abyss".equals(match.getMap().getMap())) {
                    dto.setMap("Howling Abyss");
                    dto.setMatchType("ARAM - Random Picks");
                } else {
                    dto.setMap("Summoners Rift");
                    dto.setMatchType("Normal - Classic 5v5");
                }
            } else {
                dto.setMirrorChampions(false);
                dto.setMap("Summoners Rift");
                dto.setMatchType("Ranked - Classic 5v5");
            }

            dto.setChampion(detail.getChampion().getName());
            dto.setSquareChampion(detail.getChampion().getImageSquare());
            if (detail.getRole() != null) {
                dto.setRole(detail.getRole().getRole());
            }

            String style = "Unknown";
            if (detail.getItems() != null && !detail.getItems().isEmpty()) {
                Map<String, Integer> styleCount = new HashMap<>();
                for (PlayerMatchItemEntity pItem : detail.getItems()) {
                    if (pItem.getItem().getItemType() != null) {
                        String s = pItem.getItem().getItemType().getStyle();
                        styleCount.put(s, styleCount.getOrDefault(s, 0) + 1);
                    }
                }

                if (!styleCount.isEmpty()) {
                    style = styleCount.entrySet().stream()
                            .max(Map.Entry.comparingByValue())
                            .get()
                            .getKey();
                }
            }
            dto.setStyle(style);
            dto.setWin(match.getWinnerTeam().equals(detail.getTeam()));

            // items
            List<PlayerMatchItemDTO> items = new ArrayList<>();
            for (PlayerMatchItemEntity item : detail.getItems()) {
                PlayerMatchItemDTO itemDTO = new PlayerMatchItemDTO();
                itemDTO.setId(item.getItem().getId());
                itemDTO.setItemName(item.getItem().getName());
                itemDTO.setImage(item.getItem().getImage());
                items.add(itemDTO);
            }
            dto.setItems(items);

            dtos.add(dto);
        }

        dtos.sort(Comparator.comparing(PlayerMatchDTO::getDate).reversed());

        this.matches = dtos;
    }
}
