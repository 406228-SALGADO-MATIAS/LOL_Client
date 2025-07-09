package LoL_Client_Back.dtos.match;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayerMatchItemDTO {
    private Long id;
    private Long idMatchDetail;
    private Long idItem;
    private String itemName;
    @Lob
    private String imageUrlItem;
}
