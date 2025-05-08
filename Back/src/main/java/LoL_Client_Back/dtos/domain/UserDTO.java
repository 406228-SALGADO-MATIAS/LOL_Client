package LoL_Client_Back.dtos.domain;

import LoL_Client_Back.dtos.enums.ServerOptions;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String username;
    private String password;
    private String email;
    private String nickname;
}
