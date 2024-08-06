
#Imagen base oficial
FROM node:16.20-alpine

RUN rm -rf /var/cache/apk/* 

#Establezco el directorio
WORKDIR /backend-test

#Copio los package para las dependencias
COPY package*.json ./

#Corro e instalo las dependencias
RUN npm install

#Copio todo el proyecto
COPY . .

#Hago build de la app
RUN npm run build

#Expongo el puerto
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["npm","start"]