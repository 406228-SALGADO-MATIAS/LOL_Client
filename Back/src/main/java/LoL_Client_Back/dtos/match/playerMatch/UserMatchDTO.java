package LoL_Client_Back.dtos.match.playerMatch;

import LoL_Client_Back.dtos.match.playerHistory.PlayerMatchItemDTO;
import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserMatchDTO {

    private Long matchId;
    private boolean win;
    private String map;
    private String gameType;
    private String duration;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime date;
    private String server;

    private TeamDTO blueTeam;
    private TeamDTO redTeam;

    public void buildUserMatchDto(MatchEntity match, Long userId) {
        this.matchId = match.getId();
        this.date = match.getDate();
        this.duration = match.getDuration();
        this.map = match.getMap() != null ? match.getMap().getMap() : null;
        this.server = match.getServerRegion() != null ? match.getServerRegion().getServer() : null;
        if (map.equals("ARAM - Howling Abyss"))
            this.gameType = "Random Picks";
        else
            this.gameType = match.getRanked() != null && match.getRanked() ? "Ranked" : "Normal";

        // Separar jugadores por equipo
        List<PlayerMatchDetailEntity> bluePlayers = match.getPlayerDetails().stream()
                .filter(p -> p.getTeam() != null && "blue".equalsIgnoreCase(p.getTeam().getTeamColor()))
                .toList();

        List<PlayerMatchDetailEntity> redPlayers = match.getPlayerDetails().stream()
                .filter(p -> p.getTeam() != null && "red".equalsIgnoreCase(p.getTeam().getTeamColor()))
                .toList();

        // Construir TeamDTO
        this.blueTeam = buildTeamDto(bluePlayers);
        this.redTeam = buildTeamDto(redPlayers);

        // Determinar si el usuario ganó
        this.win = match.getWinnerTeam() != null && match.getPlayerDetails().stream()
                .anyMatch(p -> p.getUser() != null && p.getUser().getId().equals(userId)
                        && p.getTeam() != null
                        && p.getTeam().getId().equals(match.getWinnerTeam().getId()));
    }

    private TeamDTO buildTeamDto(List<PlayerMatchDetailEntity> players) {
        TeamDTO teamDto = new TeamDTO();
        teamDto.setMembers(players.stream().map(this::buildPlayerDto).toList());

        teamDto.setKills(players.stream().mapToInt(PlayerMatchDetailEntity::getKills).sum());
        teamDto.setDeaths(players.stream().mapToInt(PlayerMatchDetailEntity::getDeaths).sum());
        teamDto.setAssists(players.stream().mapToInt(PlayerMatchDetailEntity::getAssists).sum());
        teamDto.setTotalGold(players.stream().mapToInt(PlayerMatchDetailEntity::getTotalGold).sum());
        teamDto.setTotalDamage(players.stream().mapToInt(PlayerMatchDetailEntity::getTotalDamage).sum());
        teamDto.setTotalFarm(players.stream().mapToInt(PlayerMatchDetailEntity::getCreaturesKilled).sum());

        return teamDto;
    }

    private PlayerDTO buildPlayerDto(PlayerMatchDetailEntity player) {
        PlayerDTO dto = new PlayerDTO();
        dto.setUserId(player.getUser() != null ? player.getUser().getId() : null);
        dto.setNickName(player.getUser() != null ? player.getUser().getNickname() : null);
        dto.setChampion(player.getChampion() != null ? player.getChampion().getName() : null);
        dto.setSquareChampion(player.getChampion() != null ? player.getChampion().getImageSquare() : null);
        if (player.getRole() != null) {
            dto.setRole(player.getRole().getRole());
            dto.setRoleImg(player.getRole().getRoleImg());
        }
        dto.setKills(player.getKills());
        dto.setDeaths(player.getDeaths());
        dto.setAssists(player.getAssists());
        dto.setTotalGold(player.getTotalGold());
        dto.setTotalDamage(player.getTotalDamage());
        dto.setTotalFarm(player.getCreaturesKilled());

        // Items
        dto.setItems(player.getItems().stream().map(item -> {
            PlayerMatchItemDTO itemDto = new PlayerMatchItemDTO();
            itemDto.setItemName(item.getItem() != null ? item.getItem().getName() : null);
            itemDto.setImage(item.getItem() != null ? item.getItem().getImage() : null);
            itemDto.setId(item.getItem() != null ? item.getItem().getId() : null);
            return itemDto;
        }).toList());

        return dto;
    }

}
