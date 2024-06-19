
# Aplicación basada en Node y TS:

Descripción de la aplicación: ***_Gestor de tareas de equipos de trabajo_***.\
``Desarrollado por``: [Juan Sebastian Medina Toro](https://www.linkedin.com/in/juan-sebastian-medina-toro-887491249/).

Esta aplicación viene con las preconfiguraciones necesarias para el modelo de trabajo requerido. La aplicación se encuentra desarrollada en NodeJS usando TypeScript y como base de datos estamos usando ``MySQL`` con una imagen de Docker para el manejo de contenedores. Para el manejo de las sentencias SQL en el sistema, usaremos el ``ORM de Prisma`` y su estructura de configuración de modelos para las tablas de la BD. Este proyecto se estará trabajando con ``Arquitectura Limpia``. 

Para comenzar a trabajar, por favor siga los siguientes pasos para las instalaciones necesarias así como configuraciones:

## Inicialización e Instalación:
1. Clonar proyecto.
2. Clonar el archivo .env.template a .env y configurar las variables de entorno
   1. ``Nota 1:``Algunas variables de entorno se dejarán dispuestas para las pruebas.
   2. ``Nota 2:``Las variables de entorno que no se dispondrán será por temas de seguridad (Especialmente las del correo)
   3. ``Nota 3:``Si requiere las variables de entorno, debe ponerse en contacto con del desarrollador del sistema.
   4. ``Nota 4:``Revisar las definiciones estáticas de nombramiento
3. Clonar **.env.template a .env** y configurar las variables de entorno
4. Ejecutar para instalar las dependencias de Node:
   ```
   npm install
   ```
5. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar para levantar los servicios deseados:
   ```
   docker-compose up -d
   ```
- Configuración de la imagen de Docker. *Debemos realizar una configuración especial para la asignación de permisos al usuario que vamos a usar para las migraciones tratandose de una BD MySQL*, en las variables de entorno, tenemos definida a ``DB_MYSQL_USER``, este usuario debemos aplicarle los permisos para la generación de migraciones con PrismaORM, debe seguir los siguientes pasos ``después de haber levantado la imagen``:

- Luego de ubicar el ID de la imagen usando el comando de docker ``docker container ls`` para listar los contenedores, ejecutamos el comando:
   ```bash
   $ docker exec -it <mysql-container-id> mysql -u root -p
   'Y remplace el <mysql-container-id> por el ID del contenedor que se creo'.
   'Puede verificar el id del contenedor con el comando: docker container ls'
   ```

- Luego ejecutamos con base a las credenciales, nos pide la contraseña, la ``contraseña es el valor que le dimos a nuestra variable de entorno MYSQL_ROOT_PASSWORD`` cuando creamos las configuraciones del archivo *docker-compose.yml*.

- Configuración: Ejecutamos el comando:
   ```bash
   $ GRANT ALL PRIVILEGES ON *.* TO 'your_database_user'@'%' WITH GRANT OPTION;
   'Y remplazamos el 'your_database_user' por el usuario que le queremos asignar los permisos, la variable de entorno DB_MYSQL_USER'. 
   OJO => Debemos incluir el punto y coma (;) en la ejecución del comando.
   ```

- Aplicamos los privilegios con el comando
   ```bash
   $ FLUSH PRIVILEGES;
   'OJO => Debemos incluir el punto y coma (;) en la ejecución del comando.'
   Al todo quedar OK, podemos salir con el comando exit
   ```
6. Ejecutamos las migraciones usando el comando de Prisma:
   ```bash
   $ npx prisma generate
   ```
7. Ejecutar para levantar el proyecto en modo desarrollo:
   ```bash
   $ npm run dev
   ```

## CREACIÓN Y EJECUCIÓN DE MIGRACIONES USANDO PRISMA ##
- Creación y ejecución de migraciones para la base de datos:
  - Para crear una migración debemos usar:
    **NOTA 1:** Se recomienda ejecutar como Administrador.
    **NOTA 2:** Cambie el DEFINA-NOMBRE-MIGRACION por el nombre que desea dar a la migración.
    ```
    npx prisma migrate dev --name DEFINA-NOMBRE-MIGRACION
    ```
  - Para ejecutar una migración usamos:
    **NOTA:** Se recomienda ejecutar como Administrador.
    ```
    npx prisma generate
    ```

## Definición básica de lógica de negocio:
- Implementación
  