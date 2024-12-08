# 1. Base image
FROM node:18 AS build

# 2. Çalışma dizinini ayarla
WORKDIR /app

# 3. Proje dosyalarını kopyala
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

# 5. Nginx ile deploy et
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# 6. Nginx config (opsiyonel)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]