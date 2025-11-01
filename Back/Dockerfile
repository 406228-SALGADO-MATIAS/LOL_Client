# Stage 1: Build
# Usamos una imagen con JDK 17 para compilar el proyecto
FROM eclipse-temurin:17-jdk AS builder

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos todos los archivos del proyecto al contenedor
COPY . .

# Instalamos Maven y buildamos el proyecto
# -DskipTests saltea los tests para que buildée más rápido
RUN apt-get update && apt-get install -y maven \
    && mvn clean package -DskipTests

# Stage 2: Run
# Usamos ahora una imagen más liviana solo con JRE para ejecutar la aplicación
FROM eclipse-temurin:17-jre

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el JAR generado en el stage anterior
COPY --from=builder /app/target/*.jar app.jar

# Exponemos el puerto donde Spring Boot corre
EXPOSE 8080

# Comando para ejecutar el JAR cuando arranca el contenedor
ENTRYPOINT ["java", "-jar", "app.jar"]
