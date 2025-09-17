# 🛠️ Backend E-commerce con NestJS y Dev Containers

Este proyecto levanta un **backend en NestJS** dentro de un contenedor de desarrollo usando **VSCode** y **Docker Compose**.  
Gracias a **Dev Containers**, puedes trabajar en un entorno aislado pero listo para usar, con API, base de datos y caché configurados desde el inicio.

* * *
## 📚 Resumen rápido

1. Instala Docker y VSCode con Dev Containers.  
2. Clona este repo y ábrelo en VSCode.  
3. Haz **Rebuild and Reopen in Container**.  
4. Accede a:  
   - `http://localhost:3000` → API  
   - `http://localhost:3000/api` → Swagger Docs  
   - `localhost:5432` → DB  
   - `localhost:6379` → Redis  

   

<br><br>

# 📖 Documentación completa
<br>


## 🚀 Requisitos previos

Antes de comenzar, instala:

- [Visual Studio Code](https://code.visualstudio.com/)  
- Extensión **Remote - Containers** en VSCode  
👉 [Instalar aquí](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers)  
- [Docker Desktop](https://www.docker.com/get-started/)  

## 📦 Clonar e iniciar el proyecto

```
git clone https://github.com/ImCrisam/apiRest_nestjs_ecommerce
cd apiRest_nestjs_ecommerce
code .
```


Al abrirlo en VSCode, selecciona la opción:

- Rebuild and Reopen in Container → construye la infraestructura inicial.
- Reopen in Container → abre el proyecto en el contenedor existente.

El entorno incluye:

- NestJS API en puerto 3000
- Postgres en puerto 5432
- Redis en puerto 6379



---

```markdown
## 🔌 Puertos expuestos

Configurados en `.devcontainer/devcontainer.json` y `docker-compose.yml`:

- `localhost:3000` → API NestJS  
- `localhost:5432` → Base de datos Postgres  
- `localhost:6379` → Redis Cache  

```json
"forwardPorts": [
  3000,
  5432,
  6379
]
```

## 🛡️ Seguridad de archivos

Los cambios se guardan directamente en tu máquina.  
El contenedor solo monta el proyecto: no hay riesgo de perder avances.

