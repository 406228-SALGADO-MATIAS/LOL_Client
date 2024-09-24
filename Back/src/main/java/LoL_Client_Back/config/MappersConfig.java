package LoL_Client_Back.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.modelmapper.Condition;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Qualifier;

@Configuration
public class MappersConfig {
    @Bean
    public ModelMapper modelMapper() {return new ModelMapper();}
    @Bean("mergerMapper")
    public ModelMapper mergerMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setPropertyCondition((context) -> context.getSource() != null);
        return mapper;
    }
    @Bean
    public ObjectMapper objectMapper() {

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule (new JavaTimeModule());
        return  objectMapper;
    }

       /*
    @Bean("mergerMapper") MERGEMAPPER SEGUN EL PROFE (isNotNull error de  comp.)
    public ModelMapper mergerMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setPropertyCondition(Condition.isNotNull());
        return mapper;
    }
     */
}
