<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).


# API REST para E-commerce de Autopartes

Este proyecto implementa una API REST utilizando **NestJS** para gestionar un e-commerce especializado en autopartes. La aplicación incluye autenticación con JWT, gestión de usuarios y roles, pagos con PayPal, caché con Redis y documentación automática con Swagger. Toda la infraestructura está orquestada con Docker Compose.

## Modelos de Base de Datos

Base de datos relacional con las siguientes entidades:

### 1. User (Usuario)
- **id**: Identificador único (UUID/autoincremental).  
- **firstName**: Nombre.  
- **lastName**: Apellido.  
- **email**: Correo electrónico (único).  
- **password**: Contraseña hasheada.  
- **role**: `'cliente'` o `'administrador'`.  
- **createdAt**: Fecha de creación.  
- **updatedAt**: Fecha de actualización.  

### 2. Product (Producto)
- **id**: Identificador único.  
- **name**: Nombre del producto.  
- **description**: Descripción detallada.  
- **price**: Precio (decimal).  
- **stock**: Cantidad disponible.  
- **sku**: Código único de producto.  
- **imageUrl**: URL de la imagen.  
- **createdAt**: Fecha de creación.  
- **updatedAt**: Fecha de actualización.  

### 3. Order (Pedido)
- **id**: Identificador único.  
- **userId**: Relación con `User`.  
- **totalAmount**: Monto total (decimal).  
- **status**: `'creado' | 'pagado' | 'enviado' | 'cancelado'`.  
- **paymentId**: ID de transacción de PayPal.  
- **createdAt**: Fecha de creación.  

### 4. OrderItem (Detalle de Pedido)
- **id**: Identificador único.  
- **orderId**: Relación con `Order`.  
- **productId**: Relación con `Product`.  
- **quantity**: Cantidad.  
- **price**: Precio unitario al momento de la compra.  

---

## Autenticación y Roles

La autenticación se realiza con **JWT**.

### Flujo de Autenticación
1. **Registro** (`POST /auth/register`): nuevo usuario con rol `cliente` por defecto.  
2. **Login** (`POST /auth/login`): validación de credenciales y generación de token JWT.  
3. **Acceso**: el cliente envía el token en la cabecera `Authorization: Bearer <token>` en rutas protegidas.  

### Roles y Permisos
- **Cliente**:
  - Ver su perfil.  
  - Ver productos.  
  - Crear y consultar sus órdenes.  
  - Realizar pagos.  

- **Administrador**:
  - CRUD completo de productos.  
  - Ver todos los usuarios.  
  - Gestionar todas las órdenes.  
  - Actualizar estados de pedidos.  

---

## Pagos con PayPal

Flujo de integración con la API de PayPal:

1. **Crear Orden de Pago** (`POST /payment/create-order`)  
   - El frontend envía productos y cantidades.  
   - El backend calcula el total y solicita una orden a PayPal.  
   - PayPal devuelve un `orderID`, que se reenvía al frontend.  

2. **Capturar Pago** (`POST /payment/capture-order`)  
   - El frontend envía el `orderID`.  
   - El backend captura el pago en PayPal.  
   - Si es exitoso:  
     - Se actualiza el estado del pedido a `'pagado'`.  
     - Se descuenta el stock de los productos.
     - 
---

## Caché con Redis

El sistema usa **Redis** para mejorar el rendimiento en endpoints de alta lectura.

### Endpoints Cacheados
- `GET /products` → Lista de productos.  
- `GET /products/:id` → Detalle de un producto.  

### Estrategia de Invalidación
- Al crear, actualizar o eliminar un producto:  
  - Se elimina `products:all`.  
  - Se elimina `product:<id>` si aplica.  

---
