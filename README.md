# API de reservas de canchas · Evaluación P1

Autor: Jonathan Guayta

## Levantar el proyecto

```bash
cp .env-example .env        # PORT=3081, JWT_SECRET propio
npm install
docker compose up -d
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
npm run dev
```

Credenciales del seed:

| Rol | Email | Contraseña |
|---|---|---|
| ADMIN | paulo.galarza@example.com | admin123 |
| USER | jmguayta1@espe.edu.ec | user123 |

## Endpoints

| Método | Ruta | Rol | Respuestas |
|---|---|---|---|
| GET | / | — | 200 Hello World |
| POST | /api/auth/register | — | 201, 400 |
| POST | /api/auth/login | — | 200 `{ token }`, 400 |
| GET | /api/auth/protected-route | token | 200, 401, 403 |
| POST | /api/admin/schedules | ADMIN | 201, 400, 401, 403 |
| GET | /api/admin/bookings | ADMIN | 200, 401, 403 |
| POST | /api/bookings | token | 201, 400 (horario ocupado), 401 |
| GET | /api/bookings/:id | dueño o ADMIN | 200, 401, 403, 404 |
| PUT | /api/bookings/:id | dueño o ADMIN | 200, 400, 401, 403, 404 |
| DELETE | /api/bookings/:id | dueño o ADMIN | 204, 401, 403, 404 |
| GET | /api/users/:id/bookings | dueño o ADMIN | 200, 401, 403 |

## Postman

Importar `postman/EVAL_P1_Guayta.postman_collection.json` y
`postman/EVAL_P1_local.postman_environment.json`, y ejecutar la colección completa.

## Despliegue

https://<tu-servicio>.onrender.com