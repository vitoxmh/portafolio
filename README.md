# Portfolio — Victor Hugo Morales Herrera

Portafolio personal de **Victor Hugo Morales Herrera**, Desarrollador Frontend Senior y Desarrollador de Videojuegos con más de 17 años de experiencia. Construido con **React 19**, **TypeScript** y **Vite**, con estética cyberpunk, fondo WebGL animado y soporte bilingüe (Español / Inglés).

- Sitio en vivo: <https://victorh-morales.dev/>

---

## Contenido

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Internacionalización (i18n)](#internacionalización-i18n)
- [Formulario de contacto (PHP + PHPMailer)](#formulario-de-contacto-php--phpmailer)
- [SEO](#seo)
- [Despliegue](#despliegue)
- [Licencia](#licencia)

---

## Características

- **Single Page Application** con navegación por secciones (Hero, Stats, About, Experience, Projects, Skills, Education, Certifications, Contact).
- **Bilingüe (ES/EN)**: cambio de idioma sin recargar, con persistencia en `localStorage` y detección del idioma del navegador.
- **Fondo animado con WebGL**: shader de fragmentos con rejilla cian animada, ruido y seguimiento del cursor.
- **Layout responsivo**: navegación superior en escritorio y barra de navegación inferior fija (BottomNav) en móvil.
- **Formulario de contacto funcional**: validación en cliente y envío a un endpoint PHP con PHPMailer vía SMTP.
- **SEO optimizado**: meta tags Open Graph y Twitter, datos estructurados JSON-LD (Person, ProfilePage, WebSite), `sitemap.xml` y `robots.txt`.
- **Iconos Material Symbols** (Google Fonts) y tipografías Hanken Grotesk, Inter y JetBrains Mono.
- **Diseño BEM** con SCSS modular por sección.

---

## Tecnologías

| Categoría        | Tecnologías                                                        |
| ---------------- | ------------------------------------------------------------------ |
| Frontend         | React 19, React DOM 19                                             |
| Lenguaje         | TypeScript (~6.0)                                                  |
| Build            | Vite 8, @vitejs/plugin-react                                       |
| Estilos          | Sass (SCSS), arquitectura BEM                                      |
| Linting          | oxlint                                                             |
| Contacto         | PHP 8, PHPMailer (vendored en `public/vendor`)                     |
| Otros            | WebGL (canvas 2D), JSON-LD, Material Symbols, Git                  |

---

## Requisitos

- **Node.js** ≥ 20.19 (recomendado) para Vite 8.
- **npm** (incluido con Node.js).
- *(Opcional)* **PHP** ≥ 8.0 con extensiones `mbstring` y `openssl` si se desea probar el envío de mensajes del formulario de contacto.

---

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

Vite mostrará la URL local (por defecto `http://localhost:5173/`).

---

## Scripts disponibles

| Comando           | Descripción                                                            |
| ----------------- | --------------------------------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo con HMR.                             |
| `npm run build`   | Compila TypeScript (`tsc -b`) y genera el bundle de producción en `dist/`. |
| `npm run preview` | Sirve localmente el bundle de producción generado por `build`.        |
| `npm run lint`    | Ejecuta oxlint sobre el código fuente.                                |

---

## Estructura del proyecto

```
portfolio/
├── index.html                    # HTML raíz con SEO y JSON-LD
├── package.json
├── vite.config.ts
├── tsconfig.json                 # Configuración base (references)
├── tsconfig.app.json             # TS para código de aplicación
├── tsconfig.node.json            # TS para configuración de Vite
├── .oxlintrc.json                # Reglas de oxlint
├── .gitignore
├── public/                       # Recursos estáticos (se copian a dist/)
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── send_contact.php          # Endpoint del formulario (PHP + PHPMailer)
│   ├── vendor/phpmailer/         # PHPMailer (Exception, PHPMailer, SMTP)
│   └── img/                      # Capturas de proyectos
└── src/
    ├── main.tsx                  # Punto de entrada de React
    ├── App.tsx                   # Envuelve <Site /> en <LanguageProvider />
    ├── i18n.ts                   # Tipos (Language, LocalizedString, LocalizedList)
    ├── LanguageContext.ts        # Contexto de idioma
    ├── LanguageProvider.tsx      # Proveedor de idioma (detecta y persiste)
    ├── data.ts                   # Acceso tipado al JSON general (proyectos, skills, etc.)
    ├── data/
    │   └── portfolio.json        # JSON general con toda la información del sitio (ES/EN)
    ├── components/
    │   ├── Site.tsx              # Composición principal de secciones
    │   ├── Header.tsx            # Navegación superior + selector de idioma
    │   ├── Hero.tsx              # Portada (título, CTA, scroll)
    │   ├── Stats.tsx             # Contadores (años, proyectos)
    │   ├── About.tsx             # Sobre mí
    │   ├── Experience.tsx        # Línea de tiempo laboral
    │   ├── Projects.tsx          # Grid/slider de proyectos personales
    │   ├── Skills.tsx            # Stack tecnológico
    │   ├── Education.tsx         # Educación
    │   ├── Certifications.tsx    # Cursos y certificaciones
    │   ├── Contact.tsx           # Formulario de contacto + datos
    │   ├── Footer.tsx            # Pie de página con redes
    │   ├── BottomNav.tsx         # Navegación inferior (móvil)
    │   ├── ShaderCanvas.tsx      # Fondo WebGL animado
    │   └── Icon.tsx              # Wrapper de Material Symbols
    ├── hooks/
    │   ├── useLanguage.ts        # Acceso tipado al contexto de idioma
    │   └── useContactForm.ts     # Estado, validación y envío del formulario
    └── styles/                   # SCSS modular (main.scss @use de partials)
        ├── main.scss             # Entrada que importa todos los partials
        ├── _tokens.scss          # Variables (colores, fuentes, espacios)
        ├── _mixins.scss          # Mixins utilitarios
        ├── _base.scss            # Reset y estilos base
        └── _*.scss               # Estilos por sección (BEM)
```

### Componentes principales

| Componente       | Responsabilidad                                                        |
| ---------------- | ---------------------------------------------------------------------- |
| `Site.tsx`       | Orquesta el orden de secciones de la página.                           |
| `Header.tsx`     | Marca, navegación por anclas y botón de cambio de idioma (ES/EN).      |
| `Hero.tsx`       | Portada con título animado, badges y botones de acción.                |
| `ShaderCanvas.tsx` | Canvas WebGL que renderiza un shader de fragmentos en el fondo.      |
| `Projects.tsx`   | Tarjetas clicables con imágenes, etiquetas y enlaces externos.         |
| `Contact.tsx`    | Formulario controlado con estados (idle/submitting/success/error).     |
| `BottomNav.tsx`  | Barra de navegación inferior fija para dispositivos móviles.           |

---

## Internacionalización (i18n)

La aplicación es bilingüe y el idioma se gestiona mediante **Context API**:

- **`src/data/portfolio.json`**: fuente única de todo el contenido. Cada dato traducible es un objeto `{ "en": "...", "es": "..." }`; si el texto es idéntico en ambos idiomas puede ser un string plano. Esto facilita editar un dato sin tocar dos diccionarios.
- **`src/i18n.ts`**: define solo los tipos `Language` (`'es' | 'en'`), `LocalizedString` (`string | { en, es }`) y `LocalizedList` (`{ en: string[]; es: string[] }`).
- **`src/LanguageProvider.tsx`**: detecta el idioma inicial (guardado en `localStorage` con la clave `portfolio-language`, o el idioma del navegador si no hay valor guardado) y lo persiste en cada cambio. También actualiza `document.documentElement.lang`.
- **Hooks disponibles**:
  - `useLanguage()` → expone `{ language, setLanguage, t, tList }`.
  - `t(value)` → recibe un `LocalizedString` y devuelve la cadena en el idioma activo (un string plano se devuelve tal cual).
  - `tList(value)` → recibe un `LocalizedList` y devuelve el array del idioma activo (para listas como descripciones de empleo).

Ejemplo de uso:

```tsx
const { t, tList } = useLanguage()
t(ABOUT.title)                  // "About" / "Sobre mí"
tList(EXPERIENCE.jobs[0].desc)  // array de strings
```

> Los componentes acceden a los datos con `t(data.xxxx)`; las claves de traducción (`TranslationKey`) ya no existen.

---

## Formulario de contacto (PHP + PHPMailer)

El formulario se envía por `POST` con `fetch` a `/send_contact.php` (JSON). El script valida los campos, sanitiza encabezados (previene header injection) y envía el correo mediante **PHPMailer** sobre **SMTP**.

### Configuración

Las constantes están al inicio de `public/send_contact.php`:

| Constante              | Descripción                                             |
| ---------------------- | ------------------------------------------------------- |
| `CONTACT_TO_EMAIL`     | Destinatario de los mensajes.                           |
| `CONTACT_FROM_EMAIL`   | Dirección de "From".                                    |
| `CONTACT_FROM_NAME`    | Nombre mostrado en "From".                              |
| `SMTP_HOST`            | Servidor SMTP (ej. `smtp.gmail.com`).                   |
| `SMTP_PORT`            | Puerto (465 para SSL, 587 para TLS).                    |
| `SMTP_USER`            | Usuario SMTP (vacío desactiva autenticación).           |
| `SMTP_PASS`            | Contraseña / contraseña de aplicación (vacío desactiva auth). |
| `SMTP_SECURE`          | `'ssl'` \| `'tls'` \| `''`.                             |
| `SMTP_DEBUG`           | `0` off, `1` cliente, `2` cliente + servidor.           |
| `RECAPTCHA_SECRET_KEY` | Secret key de Google reCAPTCHA v2 (solo servidor). Vacía = verificación deshabilitada. |
| `RECAPTCHA_SITE_KEY`   | Site key pública de reCAPTCHA v2 (para el widget del frontend). |

> **Importante**: en producción reemplaza las credenciales de ejemplo y usa variables de entorno o un mecanismo seguro de configuración; nunca expongas contraseñas en el repositorio.

### Google reCAPTCHA v2 (checkbox)

1. Crea un sitio en <https://www.google.com/recaptcha/admin> y elige **reCAPTCHA v2 → Casilla "No soy un robot"**.
2. Define `RECAPTCHA_SECRET_KEY` en `config.secret.php` (o como variable de entorno `RECAPTCHA_SECRET_KEY`). La verificación solo se activa si la secret key está configurada.
3. Define la **site key** en el frontend: `src/config.ts` (`VITE_RECAPTCHA_SITE_KEY` en el build, o reemplaza el valor por defecto). La site key es pública y viaja en el bundle.
4. El widget se renderiza automáticamente en el formulario y el token se envía al servidor como `g-recaptcha-response`. El PHP lo valida contra `https://www.google.com/recaptcha/api/siteverify` antes de enviar el correo.
5. Requisito del servidor: extensión `curl` **o** `openssl` (para la llamada HTTPS a Google).

### Validación

- **Cliente** (`src/hooks/useContactForm.ts`): nombre requerido (≤ 100), email requerido y con formato válido (≤ 254), asunto opcional (≤ 150), mensaje requerido (≤ 5000). Mensajes de error traducidos.
- **Servidor** (`public/send_contact.php`): revalida los mismos límites, valida el email con `FILTER_VALIDATE_EMAIL`, elimina CR/LF de campos usados en cabeceras y, si `RECAPTCHA_SECRET_KEY` está definida, verifica el token de reCAPTCHA contra Google.

### Respuestas

- `200` → `{"success": true}`
- `400` → payload inválido o errores de validación.
- `405` → método HTTP no permitido.
- `500` → extensiones faltantes (`mbstring`, `openssl`) o fallo de envío.

### Requisitos del servidor

- PHP ≥ 8.0 con extensiones `mbstring` y `openssl`.
- PHPMailer incluido en `public/vendor/phpmailer/` (se copia automáticamente a `dist/` en el build).

---

## SEO

`index.html` incluye:

- Meta tags de **Open Graph** y **Twitter Card** (título, descripción, imagen, URL).
- **Datos estructurados JSON-LD**: `Person`, `ProfilePage` y `WebSite` con el esquema `@context: schema.org`, incluyendo empleo, educación, habilidades y perfiles sociales.
- **Fallback `<noscript>`** con el contenido principal para indexación sin JavaScript.
- `hreflang` para `es`, `en` y `x-default`.
- `robots.txt` y `sitemap.xml` en `public/` para orientar a los motores de búsqueda.

---

## Despliegue

### Build de producción

```bash
npm run build
npm run preview   # revisar localmente el resultado
```

El comando `build` ejecuta `tsc -b && vite build` y genera la carpeta **`dist/`**, lista para servir con cualquier hosting estático (Vercel, Netlify, GitHub Pages, etc.).

### Backend PHP

Para que el formulario de contacto funcione en producción, el hosting debe **ejecutar PHP** y servir también los archivos de `dist/`:

- `dist/send_contact.php`
- `dist/vendor/phpmailer/`

Configura las constantes SMTP del archivo según tu proveedor de correo antes de desplegar.

---

## Licencia

Código de uso personal. El contenido (texto, datos personales e imágenes) pertenece a Victor Hugo Morales Herrera. Para usos específicos, contacta a <contacto@vmh.cl>.
