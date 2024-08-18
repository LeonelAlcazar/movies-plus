# Movies plus

Sistema basico de gestion de peliculas para Conexa

# Uso en modo desarrollo

Para el uso de desarrolladores se deben seguir los siguientes pasos

- Clonar el repositorio
- Instalar las dependencias usando `npm install`
- Configurar el archivo `.env`, usaremos el archivo `.env.development` como base copiando su contenido en el nuevo archivo `.env`
- Instanciamos una base de datos usando el `docker-compose.development.yml` ejecutando `docker compose -f docker-compose.development.yml up -d`
- Iniciamos el proyecto usando `npm run start:dev`
- El proyecto esta andando, podemos comprobarlo en `http://localhost:3000/docs`
- Las crendeciales de operador por defecto son email:administrador@gmail.com password:admin123!

# Uso en modo produccion

Para el uso en modo produccion o ejecutarlo con docker debemos seguir los siguientes pasos

- Modificar si es necesario algun valor en docker-compose.yml
- Ejecutar `docker compose up -d`
- El proyecto esta andando, podemos comprobarlo en `http://localhost:3000/docs`
- Las crendeciales de operador por defecto son email:administrador@gmail.com password:admin123!

# Arquitectura del proyecto

El proyecto esta constituido por 3 entidades basicas, los usuarios, los operadores y las peliculas

![clases](https://raw.githubusercontent.com/LeonelAlcazar/movies-plus/main/Classes.jpg)

Se eligio usar la arquitectura y modelo propio de nestjs para facilitar el desarrollo

Se utilizo una base de datos mysql ya que en un escenario real, los datos serian constantemente leidos y pocamente actualizados/agregados en comparacion con las lecturas

La documentacion se puede encontrar en el archivo `swagger.yml` o en la ruta `/docs`
