# Descripcion

# Ejecutar en dev

1. Clonar el repositorio
2. Instalar dependencias `npm install` para frontend y backend
3. correr las migraciones de Primas `npx prisma migrate dev` para backend
4. Correr el proyecto ``npm run dev `

# Ejecutar en docker

1. Para este dockerizador se expusieron los puertos 5432 db postgres, Node js en el 3000
   y 3001 para react fronent asegurese de tener esto puerto libres o algun servicio que lo utilice detenido.
2. Abrar a la terminal y navege hasta el repositorio clonado o desde su editor de texto en la terminal integrada use el siguiente comando `sudo docker-compose up --build`

# Buenas practicas utilizadas.

1. Uso de middleware para la verificacion de lo token generado con json web token
2. Dependencia para npm para sanemiento de las entradas enviada por los usuarios

   `express-validator` Express validator ofrece reglas para usarse en el middleware y hacer escape la entrada con metodo como trim y escape

   `Yup` Ofrece un reglas y tambien validaciones nivel esquematica y proporcionar un patron mapper que devuelve el objeto deseado y si pasa la validacion

3. Uso de patron de `MC` modelos y controlador controlador para manejo de las peticion y dandole un enfoque modular y modelo para darle asbtracion a la hora de realzar operaciones de crud

4. Uso de jsonwebtoken para la validacion de sesion

5. Uso de Prisma ORM facilita el acceso a la base de datos con un generador de consultas o query builder automáticamente generado y type-safe que se adapta a nuestro esquema de base de datos. Es decir que con un mismo schema se puede migrar entre distintas BBDD.
