package LoL_Client_Back.models.transaction;

import LoL_Client_Back.models.domain.User;
import lombok.Data;

@Data
public class UserLoot {
    private Long id;
    private Integer chests;
    private Integer masterChests;
    private Integer keys;
    private Integer keyFragments;
    private Integer orangeEssence;
    private User user;
}
