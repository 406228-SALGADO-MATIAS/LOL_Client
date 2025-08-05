package LoL_Client_Back.dtos.user;

import LoL_Client_Back.dtos.enums.ServerOption;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequestDTO {
    private ServerOption server;
    private String username;
    private String password;
}
