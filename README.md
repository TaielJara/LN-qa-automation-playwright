# Desafío QA Automation - La Nación 

Este proyecto automatiza pruebas end-to-end con **Playwright** en el sitio web de La Nación, utilizando el patrón de diseño **Page Object Model (POM)**.

## Estructura del proyecto

```
📁 pages
🔼── ui
│   🔼── home.page.ts          # Página principal de La Nación
│   🔼── article.page.ts       # Página de un artículo específico
🔼── services
    🔼── network.service.ts    # Valida que los requests devuelvan status válidos

📁 tests
🔼── home.spec.ts              # Pruebas para la home
🔼── article.spec.ts           # Pruebas para el artículo

📁 data
🔼── *.json                    # Archivos JSON con contenido estático para validaciones

```

## Herramientas y tecnologías

- [Playwright](https://playwright.dev/) con TypeScript
- Page Object Model (POM)
- JSON para data-driven testing

## Casos de prueba cubiertos

### Home

- Validación del header (logo, botones, accesos y cotizaciones).
- Validación del footer.
- Validación del artículo principal (imagen y título).
- Validación de respuestas de red (`status` entre **200 y 399**).

### Artículo

- Validación del header y footer.
- Validación del título de la nota.
- Validación del contenido de los párrafos clave.
- Validación de respuestas de red (`status` entre **200 y 399**).

## Cómo ejecutar los tests

1. Cloná el repositorio
2. Instalá dependencias:

```bash
npm install
```

3. Corré los tests:

```bash
npx playwright test
```

> Tip: Para abrir el reporte HTML:
>
```bash
npx playwright show-report
```

## Notas

- Antes de cada test se cierran ventanas emergentes (ads y modales).
- Las URLs están hardcodeadas según el alcance del challenge.

---

## Autor

- **Taiel Fernandez Jara** – QA Automation Engineer  