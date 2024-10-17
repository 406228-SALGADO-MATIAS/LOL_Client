package LoL_Client_Back.models.domain;


import LoL_Client_Back.models.reference.Role;
import LoL_Client_Back.models.reference.Team;
import lombok.Data;

@Data
public class PlayerMatchDetail {
    private Long id;
    private Integer kills;
    private Integer deaths;
    private Integer assists;
    private Integer totalGold;
    private Integer totalDamage;
    private Integer creaturesKilled;
    private Match match;
    private User user;
    private Team team;
    private Champion champion;
    private Role role;

}
