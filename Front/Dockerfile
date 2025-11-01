# Dockerfile
FROM nginx:alpine

# Copiamos todos los archivos del front al directorio de Nginx
COPY . /usr/share/nginx/html

# Copiamos configuración custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
