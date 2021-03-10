# Software Korpodesco 

## Documentación y enlaces de configuración previos a la puesta en marcha de la aplicación

[Instalación de NodeJs en server linux](https://www.geeksforgeeks.org/installation-of-node-js-on-linux/)

[Instalación de Git en server linux](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-20-04-es)

[Instalación de PM en server linux](https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps)

## Entorno de desarrollo del backend

- Ubicarse en la carpeta BACKEND

- Ejecutar en la terminal de comandos el comando `npm install`

- Ejecutar en la terminal de comandos el comando `npm run dev`

> Este entorno está en el puerto **8083**

## Entorno de desarrollo del FRONTEND

- Ubicarse en la carpeta FRONTEND

- Ejecutar en la terminal de comandos el comando `npm install`

- Ejecutar en la terminal de comandos el comando `npm run start`

> Este entorno está en el puerto **3000**

## Script bash de configuración del entorno de producción

```
#!/bin/bash
sudo apt-get update
cd /home/emejia6071/korpodesco/BACKEND
sudo pm2 restart index.js --name "backend-korpodesco"
cd ..
cd /home/emejia6071/korpodesco/FRONTEND
sudo pm2 restart ecosystem.config.js
```
