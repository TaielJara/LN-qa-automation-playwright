# Desafío QA Automation - La Nación

Este proyecto automatiza pruebas end-to-end con **Playwright** en el sitio web de La Nación, utilizando el patrón de diseño **Page Object Model (POM)**.

## Estructura del proyecto

```
📁 pages
├── ui
│   ├── home.page.ts           # Página principal de La Nación
│   └── article.page.ts        # Página de un artículo específico
└── services
    └── network.service.ts     # Validación de respuestas HTTP de red

📁 tests
├── home.spec.ts               # Pruebas para la home
└── article.spec.ts            # Pruebas para el artículo

📁 data
└── *.json                     # Archivos JSON con datos estáticos para validaciones

.eslint.config.js              # Configuración de ESLint
.playwright.config.ts          # Configuración de Playwright
```

## Herramientas y tecnologías

- Playwright con TypeScript
- Page Object Model (POM)
- JSON para pruebas basadas en datos
- ESLint para análisis estático del código
- GitHub Actions para CI/CD

## Casos de prueba cubiertos

### Home

- Validación del header (logo, botones, accesos y cotizaciones)
- Validación del footer
- Validación del artículo principal (imagen y título)
- Validación de respuestas de red (códigos de estado entre **200 y 399**)

### Artículo

- Validación del header y footer
- Validación del título de la nota
- Validación del contenido de párrafos específicos
- Validación de respuestas de red (códigos de estado entre **200 y 399**)

## Cómo ejecutar los tests

1. Cloná el repositorio
2. Instalá las dependencias:

```bash
npm install
```

3. Corré los tests:

```bash
npx playwright test
```

4. Para ver el reporte HTML:

```bash
npx playwright show-report
```

## Validación de código con ESLint

Para ejecutar el análisis estático de código con ESLint:

```bash
npm run lint
```

> Se utiliza una configuración moderna (flat config) compatible con TypeScript y las reglas recomendadas por ESLint.

## CI/CD con GitHub Actions

Este proyecto incluye una pipeline automatizada que:

- Ejecuta **ESLint** y los **tests de Playwright** ante cada `push` o `pull request` a la rama `main`.
- Genera un **reporte HTML** con los resultados.
- Sube el reporte como artefacto para su descarga.

### Ver el reporte HTML

1. Ingresá a la sección **Actions** del repositorio.
2. Seleccioná la última ejecución.
3. En la sección **Artifacts**, descargá `playwright-report` y abrilo localmente.

> La configuración se encuentra en `.github/workflows/playwright.yml`.

### Captura de evidencia en fallos

Playwright está configurado para capturar automáticamente:

1. Screenshots del error.
2. Videos de la ejecución.

>Estas evidencias se incluyen en el reporte HTML descargable desde GitHub Actions.

La configuración está en playwright.config.ts:

use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
}

## Autor

**Taiel Fernandez Jara**  
QA Automation