# Etapa de construcción
FROM node:20-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build --prod

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa de build
COPY --from=build /app/dist/universidad-frontend /usr/share/nginx/html

# Configuración para Angular Router
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html/browser; \
    index index.html; \
    location / { \
        try_files \$uri \$uri/ /index.html; \
    } \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Exponer el puerto
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]