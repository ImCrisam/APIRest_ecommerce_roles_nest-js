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
