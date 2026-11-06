# Barbería: turnos en 3 toques

Web para barberías y estéticas: el cliente elige servicio, barbero y horario en 3 toques, y un club de suscripción mensual le da al negocio un ingreso fijo.

**Probala en vivo:** https://barberia-demo-ydk.pages.dev

## Qué tiene

- Turnero
- Club mensual
- Turnos por WhatsApp

## Tecnologías

- HTML, CSS y JavaScript propios, sin plantillas ni frameworks
- Cloudflare Pages (servida desde la red de Cloudflare, con HTTPS)
- Cloudflare Workers y base de datos D1 (SQLite) para la parte del servidor
- Pensada primero para el celular y probada con pruebas automáticas (Playwright)

## Qué hay en este repositorio

La parte que ve el cliente, en `public/`. La lógica del servidor queda en un repositorio privado.

---

Hecho por Julian, de **Yardak**: webs, tiendas, apps y sistemas para negocios de Paraná, Entre Ríos.
https://yardak.pages.dev
