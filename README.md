# Portfolio — Victor Hugo Morales Herrera

Portafolio personal de **Victor Hugo Morales Herrera**, Desarrollador Frontend Senior y Desarrollador de Videojuegos con más de 17 años de experiencia. Construido con **React 19**, **TypeScript** y **Vite**, con estética cyberpunk, fondo WebGL animado y soporte bilingüe (Español / Inglés).

- Sitio en vivo: <https://vmh.cl/>

---

## Contenido

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Internacionalización (i18n)](#internacionalización-i18n)
- [Contacto](#contacto)
- [SEO](#seo)
- [Despliegue](#despliegue)
- [Licencia](#licencia)

---

## Características

- **Single Page Application** con navegación por secciones (Hero, Stats, About, Experience, Projects, Skills, Education, Certifications, Blog, Contact).
- **Bilingüe (ES/EN)**: cambio de idioma sin recargar, con persistencia en `localStorage` y detección del idioma del navegador.
- **Fondo animado con WebGL**: shader de fragmentos con rejilla cian animada, ruido y seguimiento del cursor.
- **Layout responsivo**: navegación superior en escritorio y barra de navegación inferior fija (BottomNav) en móvil.
- **Blog bilingüe**: sección de posts con páginas individuales por ruta real (`/blog/slug`), contenido definido en JSON con bloques tipados (párrafo, titular, lista, código, cita) y tiempo de lectura.
- **Sección de contacto sin formulario**: solo datos de contacto (email con enlace `mailto:`, LinkedIn, GitHub) y aviso de disponibilidad, sin backend.
- **SEO optimizado**: meta tags Open Graph y Twitter, datos estructurados JSON-LD (Person, ProfilePage, WebSite, BlogPosting), `sitemap.xml` con URLs del blog, `robots.txt` y prerenderizado estático de cada post durante el build.
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
│   └── img/                      # Capturas de proyectos
├── scripts/
│   └── prerender-blog.mjs        # Genera dist/blog/<slug>/index.html y dist/sitemap.xml
└── src/
    ├── main.tsx                  # Punto de entrada de React
    ├── App.tsx                   # Envuelve <Site /> en <LanguageProvider />
    ├── i18n.ts                   # Tipos (Language, LocalizedString, LocalizedList)
    ├── LanguageContext.ts        # Contexto de idioma
    ├── LanguageProvider.tsx      # Proveedor de idioma (detecta y persiste)
    ├── data.ts                   # Acceso tipado al JSON general (proyectos, skills, etc.)
    ├── format.ts                 # Utilidades de formato (fechas del blog)
    ├── seo.ts                    # Head dinámico por post (meta, OG, JSON-LD BlogPosting)
    ├── data/
    │   ├── portfolio.json        # JSON general con toda la información del sitio (ES/EN)
    │   └── blog.json             # Posts del blog (ES/EN) con bloques tipados
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
    │   ├── Blog.tsx              # Sección del blog (carrusel de posts)
    │   ├── BlogPost.tsx          # Página individual de un post
    │   ├── Contact.tsx           # Datos de contacto (email, LinkedIn, GitHub, disponibilidad)
    │   ├── Footer.tsx            # Pie de página con redes
    │   ├── BottomNav.tsx         # Navegación inferior (móvil)
    │   ├── ShaderCanvas.tsx      # Fondo WebGL animado
    │   └── Icon.tsx              # Wrapper de Material Symbols
    ├── hooks/
    │   ├── useLanguage.ts        # Acceso tipado al contexto de idioma
    │   └── useRoute.ts          # Enrutado SPA del blog (/blog/slug) con History API
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
| `Contact.tsx`    | Tarjetas de datos de contacto (email, LinkedIn, GitHub y disponibilidad). |
| `Blog.tsx`       | Carrusel de tarjetas de posts con fecha, tags y excerpt.             |
| `BlogPost.tsx`   | Página individual del post (bloques tipados, ruta `/blog/slug` y SEO dinámico). |
| `BottomNav.tsx`  | Barra de navegación inferior fija para dispositivos móviles.           |

---

## Internacionalización (i18n)

La aplicación es bilingüe y el idioma se gestiona mediante **Context API**:

- **`src/data/portfolio.json`** y **`src/data/blog.json`**: fuentes de todo el contenido (el primero info general, el segundo los posts del blog). Cada dato traducible es un objeto `{ "en": "...", "es": "..." }`; si el texto es idéntico en ambos idiomas puede ser un string plano. Esto facilita editar un dato sin tocar dos diccionarios.
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

## Blog

El blog es una sección más de la página (`#blog`) con **páginas individuales por post** en rutas reales (`/blog/slug/`), sin `react-router`. La navegación interna usa **History API** (el enlace `<a>` conserva la URL para los crawlers y el click se intercepta para navegar sin recargar; los back links antiguos `#/blog/slug` siguen funcionando).

### SEO por post

- **Prerenderizado estático**: `scripts/prerender-blog.mjs` (se ejecuta al final de `npm run build`) genera `dist/blog/<slug>/index.html` por cada post con `title`, `description`, `canonical`, Open Graph, Twitter Card, `hreflang` y JSON-LD (`BlogPosting` + `BreadcrumbList`), además del contenido del post como HTML estático dentro de `#root` (visible sin JavaScript).
- **Head dinámico**: al navegar a un post en la SPA, `src/seo.ts` actualiza el head en vivo (incluye tags `article:*` y `BreadcrumbList`) y lo restaura al volver a la portada.
- **Sitemap** (`dist/sitemap.xml`): se regenera en el build incluyendo la portada y todos los posts con `hreflang` y `lastmod` (el de la portada se calcula desde el post más reciente).
- La URL canónica de cada post es `https://vmh.cl/blog/<slug>/`.

### Agregar un post

Cada post se define en `src/data/blog.json` dentro de `list`:

```json
{
  "slug": "mi-post",
  "date": "2026-08-29",
  "tags": ["React", "JavaScript"],
  "title": { "en": "My post", "es": "Mi post" },
  "excerpt": { "en": "Summary.", "es": "Resumen." },
  "content": {
    "en": [
      { "type": "paragraph", "text": "..." },
      { "type": "heading", "text": "..." },
      { "type": "list", "items": { "en": ["a", "b"], "es": ["a", "b"] } },
      { "type": "code", "text": "const x = 1" },
      { "type": "quote", "text": "..." }
    ],
    "es": []
  }
}
```

- Bloques disponibles de `content`: `paragraph`, `heading`, `list` (items bilingües), `code` (texto plano sin idiomizar) y `quote`.
- `date` usa formato ISO `AAAA-MM-DD`; la fecha se formatea según el idioma activo (`src/format.ts`).
- El carrusel en la página principal se ordena tal como aparece en `list`; mantén los posts más recientes arriba.
- Tras editar `blog.json`, `npm run build` regenera automáticamente las páginas estáticas y el sitemap.

---

## Contacto

La sección `#contact` no tiene formulario: muestra únicamente los datos de contacto (email, LinkedIn, GitHub) y un aviso de disponibilidad. El email es un enlace `mailto:` y las redes abren en una pestaña nueva.

Los datos viven en `src/data/portfolio.json` → `contact`:

| Clave              | Descripción                                             |
| ------------------ | ------------------------------------------------------- |
| `emailAddress`     | Dirección de email (se muestra y enlaza con `mailto:`). |
| `linkedin`         | `{ url, handle }` de LinkedIn.                          |
| `github`           | `{ url, handle }` de GitHub.                            |
| `availabilityText` | Texto de disponibilidad (bilingüe).                      |

Los textos traducibles (título, subtítulo, etiquetas y disponibilidad) usan el formato `{ "en": "...", "es": "..." }` del resto del sitio. Para cambiar el destino de los CTAs que apuntan a `#contact` (Hero, `404.html`), edita el enlace o el dato correspondiente.

> El sitio es 100% estático: no hay backend, PHP ni dependencias de servidor.

---

## SEO

`index.html` incluye:

- Meta tags de **Open Graph** y **Twitter Card** (título, descripción, imagen, URL).
- **Datos estructurados JSON-LD**: `Person`, `ProfilePage` y `WebSite` con el esquema `@context: schema.org`, incluyendo empleo, educación, habilidades y perfiles sociales.
- **Fallback `<noscript>`** (en español) con el contenido principal para indexación sin JavaScript.
- `hreflang` auto-referenciado para `es`, `en` y `x-default` (coherente con el sitemap).
- Canonical único (`https://vmh.cl/`) alineado con OG, JSON-LD y sitemap.
- Carga **no bloqueante** de las hojas de estilo de Google Fonts (mejora LCP / Core Web Vitals).
- `robots.txt` y `sitemap.xml` en `public/` para orientar a los motores de búsqueda.

---

## Despliegue

### Build de producción

```bash
npm run build
npm run preview   # revisar localmente el resultado
```

El comando `build` ejecuta `tsc -b && vite build` y genera la carpeta **`dist/`**, lista para servir con cualquier hosting estático (Vercel, Netlify, GitHub Pages, etc.). No requiere PHP ni ningún backend.

---

## Licencia

Código de uso personal. El contenido (texto, datos personales e imágenes) pertenece a Victor Hugo Morales Herrera. Para usos específicos, contacta a <contacto@vmh.cl>.
