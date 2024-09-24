package LoL_Client_Back.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.core.jackson.ModelResolver;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfig {

    @Value("${app.url}")
    private String url;

    @Value("${app.dev-name}")
    private String devName;

    @Value("${app.dev-email}")
    private String devEmail;

    @Bean
    public OpenAPI openApi(
            @Value("${app.name}") String appName,
            @Value("${app.desc}") String appDescription,
            @Value("${app.version}") String appVersion) {

        Contact contact = new Contact()
                .name(devName)
                .email(devEmail)
                .url(url);

        Info info = new Info()
                .title(appName)
                .version(appVersion)
                .description(appDescription)
                .contact(contact);

        return new OpenAPI()
                .info(info);
    }

    @Bean
    public ModelResolver modelResolver (ObjectMapper objectMapper) { return new ModelResolver (objectMapper); }
}
