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

## CI/CD con GitHub Actions

El proyecto incluye una integración continua con **GitHub Actions**, que:

1. Ejecuta automáticamente los tests en cada `push` o `pull request` a la rama `main`.
2. Genera un **reporte HTML** con los resultados de los tests.
3. Sube el reporte como artefacto para su descarga y visualización.

### Ver el reporte HTML

Después de cada ejecución, podés descargar el reporte desde la pestaña **Actions** del repositorio:

1. Entrá a la ejecución más reciente en **Actions**.
2. Buscá al final la sección **Artifacts**.
3. Hacé clic en `playwright-report` para descargarlo y abrilo localmente con tu navegador.

*El archivo de configuración se encuentra en `.github/workflows/playwright.yml`.*


## Autor

- **Taiel Fernandez Jara** – QA Automation Engineer  