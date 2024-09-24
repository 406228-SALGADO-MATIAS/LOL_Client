package LoL_Client_Back.models;

// Importaciones necesarias
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

// Anotaciones de Lombok para generar automáticamente el constructor con todos los argumentos,
// el constructor sin argumentos, y los métodos getters y setters.
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dummy {
    private Long id;
    private String dummy;
}
