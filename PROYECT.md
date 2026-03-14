# 📋 Documento Final de Especificación de Requerimientos de Software (SRS)
## Portfolio Interactivo con Interfaz IDE — v2.0 Final

---

## 1. Descripción General del Proyecto

| Campo | Detalle |
|-------|---------|
| **Nombre** | Portfolio Profesional Interactivo con Interfaz IDE (VS Code-like) |
| **Versión** | 2.0 — Final Consolidada |
| **Stack** | React + Vite + Tailwind CSS (Portfolio v3.0) |
| **Plataforma** | Web - Single Page Application (SPA) |
| **Hosting** | Vercel |

**Objetivo:** Desarrollar un sitio web de portfolio profesional que simule fielmente un entorno de desarrollo integrado (IDE) tipo Visual Studio Code, incluyendo un sistema de navegación por pestañas, terminal interactiva, panel de Copilot AI, selector de temas, Command Palette y múltiples paneles funcionales.

---

## 2. Arquitectura General de la Interfaz

La interfaz se divide en **6 zonas principales** que deben estar siempre visibles:

```
┌──────────────────────────────────────────────────────────┐
│  TITLE BAR (Barra de título con controles de ventana)    │
├──────────────────────────────────────────────────────────┤
│  MENU BAR (File, Edit, View, Go, Run, Terminal, Help,    │
│            Copilot)                                       │
├────┬─────────────────────────────────────┬───────────────┤
│ A  │  TAB BAR (pestañas abiertas)        │               │
│ C  ├─────────────────────────────────────┤   COPILOT     │
│ T  │  BREADCRUMB (ruta de archivo)       │   PANEL       │
│ I  ├─────────────────────────────────────┤   (Lateral    │
│ V  │                                     │    derecho,   │
│ I  │  EDITOR AREA (contenido principal)  │    toggle)    │
│ T  │                                     │               │
│ Y  │                                     │               │
│    ├─────────────────────────────────────┤               │
│ B  │  TERMINAL PANEL (inferior)          │               │
│ A  │                                     │               │
│ R  │                                     │               │
├────┴─────────────────────────────────────┴───────────────┤
│  STATUS BAR (barra de estado inferior)                    │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Requerimientos Funcionales

---

### RF-01: Title Bar (Barra de Título)

Barra superior que simula la barra de título de una ventana de aplicación de escritorio.

**Elementos:**
- Tres botones de control de ventana (estilo macOS): Cerrar (rojo), Minimizar (amarillo), Pantalla completa (verde)
- Icono de búsqueda (🔍)
- Título dinámico: `{usuario} : portfolio`
- Badge de atajo: `Ctrl P` (para abrir el Command Palette)

**Comportamiento:**
- Botón Fullscreen: Activa/desactiva modo pantalla completa (F11)
- Clic en título o `Ctrl+P`: Abre el Command Palette (ver RF-10)

---

### RF-02: Menu Bar (Barra de Menú)

Barra de menú superior con opciones funcionales simuladas.

**Elementos — 8 botones de menú en orden:**

| Botón | Tipo |
|-------|------|
| File | Funcional o decorativo |
| Edit | Funcional o decorativo |
| View | Funcional o decorativo |
| Go | Funcional o decorativo |
| Run | Funcional o decorativo |
| Terminal | Funcional o decorativo |
| Help | Funcional o decorativo |
| **Copilot** | Abre/cierra el panel de Copilot AI (ver RF-11) |

---

### RF-03: Activity Bar (Barra Lateral de Iconos)

Barra vertical de iconos en el extremo izquierdo para acceder a los diferentes paneles.

**Iconos (de arriba a abajo):**
- 📁 **Explorer** — Abre/cierra el panel de archivos del proyecto (RF-04)
- 🔍 **Search** — Abre el Command Palette (RF-10)
- ⑂ **Source Control** — Abre el panel de control de versiones (RF-09)
- 📄↓ **Download Resume** — Descarga el PDF del resume
- ✨ **Copilot Chat** — Abre el panel de Copilot AI (RF-11)

**Iconos inferiores:**
- ⚙️ **Settings** — Abre el panel de configuración (RF-12)

**Comportamiento:**
- El icono activo tiene un indicador visual (borde izquierdo resaltado o fondo diferente)
- Clic en el mismo icono activo cierra el panel correspondiente

---

### RF-04: Explorer Panel (Panel de Archivos)

Panel lateral que muestra la estructura de archivos simulada del proyecto.

**Estructura del árbol:**
```
PORTFOLIO
├── home.tsx        (icono: ⚛️ React/TSX)
├── about.html      (icono: 🟧 HTML)
├── projects.js     (icono: 🟨 JS)
├── skills.json     (icono: { } JSON)
├── experience.ts   (icono: 🟦 TS)
├── contact.css     (icono: 🟪 CSS)
├── README.md       (icono: 📝 Markdown)
└── Aahana_Bobade_Resume.pdf (icono: 📄 PDF, color rojo)
```

**Comportamiento:**
- Clic en archivo: Abre la pestaña correspondiente en el editor (o la enfoca si ya está abierta)
- El archivo activo se resalta con un fondo diferente
- El título "PORTFOLIO" aparece en la parte superior como nombre de carpeta raíz
- Badge de Git junto a la rama: `↑1 ✦3` (indicadores de commits y cambios)

---

### RF-05: Tab Bar (Barra de Pestañas)

Barra de pestañas en la parte superior del área de contenido para navegar entre secciones.

**Características:**
- Cada pestaña muestra: Icono de tipo de archivo + Nombre del archivo + Botón cerrar (✕)
- Pestañas disponibles: `home.tsx`, `projects.js`, `experience.ts`, `contact.css`, `README.md`, `about.html`, `skills.json`
- La pestaña activa tiene un fondo diferenciado
- Las pestañas son reordenables y cerrables
- Múltiples pestañas pueden estar abiertas simultáneamente
- Las pestañas pueden abrirse desde: Explorer, Terminal (`cat`/`open`), Command Palette, o botones de navegación internos

---

### RF-06: Breadcrumb (Ruta de Navegación)

Barra debajo de las pestañas que muestra la ruta del archivo activo.

**Rutas por archivo:**

| Archivo | Ruta |
|---------|------|
| `home.tsx` | `aahana-bobade > src > home.tsx` |
| `about.html` | `aahana-bobade > src > about.html` |
| `projects.js` | `aahana-bobade > src > projects.js` |
| `experience.ts` | `aahana-bobade > src > experience.ts` |
| `contact.css` | `aahana-bobade > src > contact.css` |
| `skills.json` | `aahana-bobade > data > skills.json` |
| `README.md` | `aahana-bobade > README.md` |

**Comportamiento:** Los segmentos del breadcrumb son clickeables para navegar.

---

### RF-07: Secciones de Contenido del Editor

Cada archivo abierto en una pestaña muestra su contenido en el área principal del editor. Todas las secciones comparten un patrón de diseño: un comentario de código como encabezado decorativo seguido del contenido.

---

#### RF-07A: Home (`home.tsx`)

**Encabezado:** `// hello world !! Welcome to my portfolio`

**Componentes (de arriba a abajo):**

1. **Nombre grande en dos líneas:**
   - `"Aahana"` — Color blanco/claro, fuente serif bold decorativa
   - `"Bobade"` — Color rosa/magenta (#FF00FF), misma fuente

2. **Role Badges (4 badges en fila):**
   - 🟢 Backend Engineer
   - 🔵 AI / ML Dev
   - 🟣 Data Scientist
   - 🔴 @ EduVanceAI
   - Cada badge tiene un punto de color (dot) a la izquierda indicando estado

3. **Typewriter Text (texto rotativo animado):**
   - Efecto de máquina de escribir con cursor parpadeante (`|`)
   - Frases que rotan:
     - `"Building intelligent backend systems 🚀"`
     - `"Passionate about AI & Data Science 💜"`
     - `"Always learning, always shipping ✨"`
     - `"Exploring LLMs & RAG pipelines 🤖"`
     - `"Turning data into decisions 🧠"`

4. **Párrafo de presentación:**
   > "I live at the crossroads of backend engineering, AI/ML, and data science. I build systems that are genuinely intelligent and scalable."
   - Palabras clave en negrita y color de acento

5. **Botones de acción (3 botones en fila):**
   - 📁 **Projects** — Botón primario (fondo de color de acento, texto blanco). Navega a `projects.js`
   - 👤 **About Me** — Botón secundario (borde, fondo transparente). Navega a `about.html`
   - ✉ **Contact** — Botón secundario. Navega a `contact.css`

6. **Stats Cards (4 estadísticas en fila, dentro de un card):**
   | Número | Label |
   |--------|-------|
   | 3+ | YEARS |
   | 10+ | PROJECTS |
   | ∞ | CURIOSITY |
   | ↑ | ALWAYS LEARNING |
   - Tipografía grande bold para los números, subtítulo en mayúsculas smaller

7. **Social Links Bar (8 botones de redes sociales en fila):**
   | Plataforma | URL |
   |------------|-----|
   | GitHub | https://github.com/aahanabobade |
   | LinkedIn | https://www.linkedin.com/in/aahana-bobade |
   | Medium | https://medium.com/@aahanabobade |
   | Tableau | https://public.tableau.com/app/profile/aahana.bobade/vizzes |
   | LeetCode | https://leetcode.com/u/aahanabobade/ |
   | Instagram | https://www.instagram.com/aahanabobade1 |
   | Email | mailto:aahanabobade@gmail.com |
   | YouTube | https://www.youtube.com/@aahanabobade |
   - Cada botón tiene: icono de la plataforma + nombre

---

#### RF-07B: About (`about.html`)

**Encabezado:** `<!-- about.html - Aahana Bobade -->` (con flecha →)

**Componentes:**
- **Heading:** "About Me" (fuente serif bold decorativa grande)
- **Subtítulo:** `// who I am · what I do · where I build`
- **Cursor animado:** Un bloque cuadrado parpadeante (tipo terminal) en la esquina superior derecha

- **Bio Card (tarjeta con borde):**
  - Párrafo biográfico con palabras clave en negrita y color de acento: *Aahana Bobade*, *backend engineering*, *AI/ML*, *data science*, *intelligent and scalable*, *Junior Software Developer at EduVanceAI*

- **CURRENT FOCUS (grid de 2 columnas, 6 items):**
  - Título: "CURRENT FOCUS" en mayúsculas con color de acento
  - 🛠️ Building scalable backend systems & AI integrations at EduVanceAI
  - 🤖 Deep interest in NLP, LLMs & ML pipelines
  - 🔬 Currently exploring RAG, MLOps & Vector Databases
  - 💬 Talk to me about Python, APIs, Data Science
  - ⚡ Making data stories non-data people actually get
  - ✨ Always learning, always shipping

- **EDUCATION (sección con tarjetas):**
  - Título: "EDUCATION" en mayúsculas con color de acento

  **Tarjeta 1:**
  - 🎓 SIES Graduate School of Technology — University of Mumbai
  - Bachelor of Engineering in Computer Engineering
  - Minors: Artificial Intelligence & Machine Learning (AI/ML)
  - GPA: **9.28**
  - Período: `2021 – 2025`

  **Tarjeta 2:**
  - 🏫 New Horizon Public School, Airoli
  - Higher Secondary Education
  - Class 12th: 89.6% | Class 10th: 91.8%
  - Período: `2007 – 2021`

---

#### RF-07C: Projects (`projects.js`)

**Encabezado:** `// projects.js : things I've built & shipped`

**Componentes:**
- **Heading:** "Projects" (fuente serif bold decorativa grande)
- **Subtítulo estilo código:** `const projects = [ ...shipped, ...building ]`

**Grid de Proyectos (2 columnas, 7 proyectos).**
Cada tarjeta contiene:
- Icono/Emoji representativo (esquina superior izquierda)
- Categoría en mayúsculas
- Botones de enlace (esquina superior derecha):
  - `GitHub ↗` — Link al repositorio (siempre presente)
  - `Live ↗` — Link a demo en vivo (solo si aplica, con estilo resaltado)
- Título del proyecto en fuente serif bold
- Descripción (2-3 líneas)
- Tags de tecnologías (pills/badges en la parte inferior)

| # | Proyecto | Categoría | GitHub | Live | Tags |
|---|----------|-----------|--------|------|------|
| 1 | Safe Yatra – Women's Safety App | MOBILE · AI · SAFETY TECH | [repo](https://github.com/aahanabobade/Women-safety-app) | — | TensorFlow.js, Python, React Native, NLP, Voice AI |
| 2 | OrgMind - Company Intelligence Assistant | AI · GRAPHRAG · FULL STACK | [repo](https://github.com/aahanabobade/OrgMind) | [live](https://orgmind.vercel.app/) | Neo4j, Pinecone, GPT-4o, FastAPI, React, LangChain, GraphRAG |
| 3 | Gita-GPT | FULL STACK · NLP · GENAI | [repo](https://github.com/aahanabobade/gita-gpt) | — | TypeScript, Hume AI, LangChain, NLP, Next.js |
| 4 | Smart Resource Tracker | BACKEND · API · ML | [repo](https://github.com/aahanabobade/smart-resource-tracker) | — | FastAPI, React, JavaScript, Python, LRU Cache |
| 5 | Dockerized ML Prediction API | MLOPS · DOCKER · API | [repo](https://github.com/aahanabobade/Dockerized-ML-Prediction-API) | — | Docker, FastAPI, Python, MLOps, scikit-learn |
| 6 | AI Code Review Bot | TYPESCRIPT · DEVTOOLS · AI | [repo](https://github.com/aahanabobade/ai-code-review-bot) | — | TypeScript, AI, DevTools, Automation |
| 7 | API Health Monitor | MONITORING · HTML · DEVOPS | [repo](https://github.com/aahanabobade/api-health-monitor) | — | HTML, JavaScript, DevOps, Monitoring |

---

#### RF-07D: Skills (`skills.json`)

**Encabezado:** `// skills.json — tech stack & tools I actually use`

**Componentes:**
- **Heading:** "Skills" (fuente serif bold decorativa grande)
- **Subtítulo:** `{ "status": "always_learning", "passion": "immeasurable" }`

**Dashboard de Skills (grid de 2 columnas con barras de progreso):**

Cada skill se muestra como:
```
Nombre_Skill  ████████████████░░░░  XX%
```
Barra de progreso horizontal con color por categoría y porcentaje alineado a la derecha.

| Categoría | Skill | % |
|-----------|-------|---|
| **LANGUAGES** | Python | 92% |
| | Java | 72% |
| | JavaScript | 78% |
| | TypeScript | 74% |
| | SQL | 88% |
| **GENERATIVE AI & LLM ENGINEERING** | LangChain | 82% |
| | LangGraph | 78% |
| | RAG Pipelines | 85% |
| | Prompt Engineering | 90% |
| | Agentic Workflows | 80% |
| | Hugging Face Transformers | 83% |
| **AI · ML · DATA SCIENCE** | PyTorch | 85% |
| | TensorFlow | 80% |
| | scikit-learn | 90% |
| | Pandas | 88% |
| | NumPy | 86% |
| | spaCy | 80% |
| | NLTK | 75% |
| **BACKEND & APIS** | FastAPI | 90% |
| | Flask | 82% |
| | Django | 76% |
| **DATABASES** | PostgreSQL | 85% |
| | Redis | 72% |
| | Neo4j | 80% |
| **VECTOR DATABASES** | FAISS | 82% |
| | Pinecone | 78% |
| **DEVOPS & TOOLS** | Docker | 80% |
| | Git | 90% |
| | Linux | 88% |
| | AWS | 74% |
| | GitHub Actions | 80% |
| | Jupyter | 85% |
| **FRONTEND** | React | 80% |
| | Next.js | 72% |
| | TailwindCSS | 85% |
| | Responsive Design | 88% |
| **DESIGN** | Figma | 78% |
| | UX Prototyping | 75% |
| **DATA ANALYTICS** | Tableau | 72% |
| | Power BI | 74% |

**Also Familiar With (sección de tags):**
`Pandas` `NumPy` `Matplotlib` `spaCy` `NLTK` `Jupyter` `RAG` `FAISS` `Pinecone` `LangGraph` `OpenAI API` `Tableau` `Power BI` `Figma` `JIRA` `MLOps` `LLM Fine-tuning` `Vector DBs`

---

#### RF-07E: Experience (`experience.ts`)

**Encabezado:** `// experience.ts - professional journey`

**Componentes:**
- **Heading:** "Experience" (fuente serif bold decorativa grande)
- **Subtítulo:** `interface Career extends Timeline {}`

**Timeline vertical (3 entradas).**
Cada entrada tiene: indicador circular, período, título (serif bold), empresa con `@` prefijo (color acento), descripción, y tags de tecnologías.

**● Entrada 1 — Actual:**
- **Período:** 2025 - Present
- **Título:** Junior Software Developer
- **Empresa:** @ EduVanceAI
- **Descripción:** Building intelligent backend systems and AI integrations for an EdTech platform. ML-powered personalization, RAG pipelines, and scalable APIs serving thousands of learners daily.
- **Tags:** `FastAPI` `Python` `Django` `PostgreSQL` `Docker` `AWS` `GenAI` `React`

**○ Entrada 2:**
- **Período:** Jun 2023 - Aug 2023
- **Título:** User Experience Designer
- **Empresa:** @ Zepto Digital Labs
- **Descripción:** Designed UI for a simulation platform and improved user experience through design thinking principles. Delivered research-backed interface improvements that enhanced usability.
- **Tags:** `Figma` `UX Research` `Design Thinking` `Prototyping`

**○ Entrada 3:**
- **Período:** Jun 2023 - Jul 2023
- **Título:** Back End Intern
- **Empresa:** @ Laser Technologies Pvt Ltd
- **Descripción:** Managed and maintained backend systems and databases to support enterprise-level web applications. Ensured uptime, performance, and data integrity across production systems.
- **Tags:** `Backend` `Databases` `SQL` `Web Applications`

---

#### RF-07F: Contact (`contact.css`)

**Encabezado:** `/* contact.css – let's build something */`

**Componentes:**
- **Heading:** "Contact" (fuente serif bold decorativa grande)
- **Subtítulo:** `// open to work, collabs & good conversations`

**Layout de 2 columnas:**

**Columna Izquierda — "FIND ME ON":**
8 tarjetas de red social, cada una con: icono (izq), nombre en mayúsculas bold (color acento), URL debajo, y ícono `↗` (der). Clickeable (abre en nueva pestaña).

| Plataforma | Enlace |
|------------|--------|
| EMAIL | aahanabobade@gmail.com |
| LINKEDIN | linkedin.com/in/aahana-bobade |
| GITHUB | github.com/aahanabobade |
| MEDIUM | medium.com/@aahanabobade |
| TABLEAU | Tableau Public Vizzes |
| LEETCODE | leetcode.com/aahanabobade |
| YOUTUBE | youtube.com/@aahanabobade |
| INSTAGRAM | instagram.com/aahanabobade1 |

**Columna Derecha — "SEND A MESSAGE":**
Formulario funcional integrado con **Formspree**.

Campos (estilo comentario CSS como labels):
- `// YOUR_NAME *` — input texto, requerido, placeholder: `"string"`
- `// YOUR_EMAIL *` — input email, requerido, placeholder: `"string"`
- `// SUBJECT` — input texto, opcional, placeholder: `"string"`
- `// MESSAGE *` — textarea, requerido, placeholder: `"your message"`

- **Botón submit:** `→ send_message()` (fondo color acento, texto blanco)
- **Nota pie:** `// Powered by Formspree (lands directly in my inbox) :p`

---

#### RF-07G: README (`README.md`)

Estructura tipo README de GitHub con formato Markdown renderizado.

**Contenido:**
- **Heading:** "Aahana Bobade"
- **Subtítulo:** "Junior Software Developer @ EduVanceAI · India 🇮🇳"
- **Role tags:** 🔵 Python · 🔷 TypeScript · ⚡ FastAPI · 🧠 LangChain · 🐍 PyTorch
- Sección **💜 About** con biografía y bullet points
- Sección **Stack** con categorías y tags
- Sección **Connect** con links de contacto
- **Footer:** "Made with 🤍 by Aahana · 2026"

---

### RF-08: Terminal Simulada

Panel inferior que simula una terminal de comandos bash/shell.

**Componentes de la UI:**
- Tab bar: 3 pestañas (`TERMINAL`, `PROBLEMS`, `OUTPUT`) + botón cerrar (✕)
- Área de output: historial de comandos y sus resultados
- Línea de input: Prompt `aahana@portfolio:~$` seguido del campo de texto
- Mensaje de bienvenida: `"Welcome! Type 'help' to see available commands."`

**Comandos soportados:**

| Comando | Respuesta |
|---------|-----------|
| `help` | Lista de todos los comandos disponibles con descripciones |
| `ls` | `home.tsx about.html projects.js skills.json experience.ts contact.css README.md Aahana_Bobade_Resume.pdf` |
| `pwd` | Directorio de trabajo actual |
| `cd <dir>` | Cambiar de directorio (`cd ..` para subir) |
| `cat <file>` | Abre el archivo en el editor: `"Opening {file} in editor..."` |
| `open <file>` | Alias de `cat` — mismo comportamiento |
| `whoami` | Muestra: nombre, título, empresa, roles, ubicación, email |
| `echo <text>` | Imprime el texto proporcionado |
| `date` | Muestra fecha y hora actual |
| `git log` | Commits simulados con hashes cortos (ej: `a3f1c2e`, `b7d4a1f`) y mensajes descriptivos |
| `python --version` | Muestra versión de Python |
| `python` | `"Python interactive mode not available here."` |
| `clear` | Limpia toda la salida de la terminal |

**Comportamiento:**
- Historial de comandos navegable con flechas `↑`/`↓`
- Los comandos `cat`/`open` interactúan con el editor: abren la pestaña correspondiente
- Comandos no reconocidos muestran un mensaje de error
- El terminal se puede ocultar/mostrar con `` Ctrl+` ``
- Se puede cerrar con el botón ✕

---

### RF-09: Panel de Source Control

Panel lateral que se abre al hacer clic en el icono de Source Control en la Activity Bar.

**Contenido:**
- Título: "SOURCE CONTROL"
- Rama activa: `⎇ main`
- Estado: `"↑ 1 commit ahead"`
- Estadísticas:
  - 3 Modified
  - 1 Added
  - 0 Deleted
- Link: `"View on GitHub ↗"` — abre el repositorio de GitHub en nueva pestaña

---

### RF-10: Command Palette (Paleta de Comandos)

Modal overlay que se abre con `Ctrl+P` o al hacer clic en Search.

**Componentes:**
- Input de búsqueda: `> Go to file or run command...` + botón `Esc` para cerrar

- **Sección COMMANDS:**
  - `"Open Aahana's Copilot"` — `Ctrl+Shift+C`

- **Sección FILES:**
  - Lista de todos los archivos con icono, nombre y directorio (`src/`, `data/`, `./`)
  - Archivos: `home.tsx`, `about.html`, `projects.js`, `skills.json`, `experience.ts`, `contact.css`, `README.md`

**Comportamiento:**
- Filtrado en tiempo real al escribir
- Navegación con teclado: `↑`/`↓` para navegar, `↵` para abrir, `Esc` para cerrar
- Tip al fondo: `Tip: type "copilot" to open AI chat`
- Al seleccionar un archivo, se abre su pestaña
- Al seleccionar un comando, se ejecuta la acción

---

### RF-11: Panel de Copilot AI (Asistente Inteligente)

Panel lateral derecho que funciona como un chatbot AI integrado.

**Componentes:**
- Header: Icono + `"Aahana's AI Assistant"` + botones ✏️ y ✕
- Workspace indicator: `"● portfolio · aahana-bobade"`
- Avatar: Icono circular con emoji 😊
- Título de bienvenida: `"Hi! I'm Aahana's Copilot 👋"`
- Descripción: `"Ask me anything about her projects, skills, experience, or achievements."`

**6 botones de preguntas predefinidas (grid de 2 columnas):**
- ✦ Tell me about Aahana?
- ✦ What projects has Aahana built?
- ✦ Tell me about her work experience
- ✦ What's her tech stack?
- ✦ How can I contact Aahana?
- ✦ How can I support Aahana?

**Input de chat:**
- Placeholder: `"Ask about Aahana's projects, experience, skills..."` + botón enviar (▶)
- Contador: `"2 msgs left"`
- Disclaimer: `"AI can make mistakes · Contact Aahana directly for important info"`

**Comportamiento:**
- Se abre/cierra con `Ctrl+Shift+C` o desde Activity Bar o Settings
- Las preguntas predefinidas se envían como mensaje al hacer clic
- Las respuestas se generan basadas en la información del portfolio
- Límite de mensajes por sesión (configurable)
- Botón de toggle en el sidebar inferior izquierdo: `"Aahana's Copilot | AI"` con indicador `"open ✓"`

---

### RF-12: Panel de Settings (Configuración)

Panel lateral que se abre al hacer clic en el icono de engranaje ⚙️.

**Sección: 🎨 COLOR THEME**

6 temas seleccionables con indicador de color circular:

| Tema | Descripción |
|------|-------------|
| 💜 Aahana Dark | Por defecto ✓ |
| 🩷 Rosé Pine | |
| 🔵 Tokyo Night | |
| 🟣 Catppuccin | |
| 🔵 Nord | |
| 🟡 Gruvbox | |

Al seleccionar un tema, toda la interfaz cambia su paleta en tiempo real.

**Sección: ⚡ QUICK ACTIONS**

| Acción | Atajo |
|--------|-------|
| 📋 Command Palette | `Ctrl+P` |
| 🖥️ Toggle Terminal | `` Ctrl+` `` |
| 💬 Copilot Chat | — |
| 📄 Download Resume | — |
| ⛶ Toggle Fullscreen | `F11` |

**Sección: ⌨️ KEYBOARD SHORTCUTS**

| Atajo | Acción |
|-------|--------|
| `Ctrl P` | Go to file (command palette) |
| `` Ctrl ` `` | Toggle terminal |
| `Ctrl B` | Toggle sidebar |
| `Esc` | Close overlay |
| `↑` / `↓` | Terminal history |

**Footer del panel:**
- `"Portfolio v3.0 · React + Vite + Tailwind"`
- `"Made with 💜 by Aahana Bobade"`

---

### RF-13: Status Bar (Barra de Estado)

Barra horizontal en la parte inferior de toda la interfaz.

**Elementos (de izquierda a derecha):**

| Elemento | Detalle |
|----------|---------|
| Errores/warnings | `⚠ 0  ⊗ 0` |
| Rama de Git | `⎇ main` |
| Nombre del proyecto | `🔄 Aahana's Portfolio` |
| Copilot | Badge `"Copilot"` |
| Tipo de archivo (dinámico) | Cambia según pestaña activa |
| Encoding | `UTF-8` |
| Formatter | `Prettier` |
| Tema activo | `"💜 Aahana Dark"` (o tema seleccionado) con `▲` |
| Hora actual | Formato `HH:MM` (actualización en tiempo real) |

**Tipos de archivo por pestaña:**

| Pestaña | Tipo |
|---------|------|
| `home.tsx` | TypeScript React |
| `projects.js` | JavaScript |
| `experience.ts` | TypeScript |
| `contact.css` | CSS |
| `skills.json` | JSON |
| `README.md` | Markdown |
| `about.html` | HTML |

---

### RF-14: Descarga de Resume

Funcionalidad de descarga del PDF del curriculum vitae.

**Acceso desde múltiples puntos:**
- Botón en Activity Bar (icono de descarga)
- Archivo en Explorer: `"Aahana_Bobade_Resume.pdf"`
- Settings → Quick Actions → Download Resume

**Comportamiento:**
- Descarga el archivo: `Aahana_Bobade_Resume.pdf`
- El botón en el Explorer muestra: `PDF Aahana_Bobade_Resume.pdf ↓`

---

### RF-15: Keyboard Shortcuts (Atajos de Teclado)

Sistema de atajos de teclado para navegación rápida.

| Atajo | Acción |
|-------|--------|
| `Ctrl+P` | Abrir Command Palette |
| `Ctrl+Shift+C` | Abrir/cerrar Copilot AI |
| `` Ctrl+` `` | Toggle Terminal |
| `Ctrl+B` | Toggle Sidebar |
| `F11` | Toggle Fullscreen |
| `Esc` | Cerrar overlay/modal activo |
| `↑` / `↓` | Navegar historial de terminal |

---

## 4. Requerimientos No Funcionales

---

### RNF-01: Sistema de Temas (Theming)

La aplicación debe soportar 6 temas de color que afectan toda la interfaz.

**Temas requeridos con sus paletas aproximadas:**

| Tema | Paleta |
|------|--------|
| **Aahana Dark** (default) | Fondo oscuro, acentos magenta/púrpura |
| **Rosé Pine** | Fondo oscuro cálido, acentos rosa/dorado |
| **Tokyo Night** | Fondo azul oscuro, acentos azul/cyan |
| **Catppuccin** | Fondo oscuro suave, acentos pastel |
| **Nord** | Fondo azul-gris, acentos azul frost |
| **Gruvbox** | Fondo marrón oscuro, acentos naranja/amarillo cálido |

**Implementación:**
- Cambio de tema en tiempo real sin recargar la página
- Persistencia de la selección de tema (`localStorage`)
- Todos los componentes responden al cambio de tema
- La barra de estado muestra el tema activo
- CSS Variables o Tailwind CSS theme configuration

---

### RNF-02: Tipografía

**Fuentes requeridas:**
- **Principal:** Figtree VF (Variable Font, weights 100-1000)
- **Decorativa (headings):** Fuente serif cursiva/decorativa para títulos de sección (About Me, Projects, Experience, Contact, Skills)
- **Monoespaciada:** Para la terminal, comentarios de código, y elementos de código (Monaco, Menlo, Consolas, o similar)

---

### RNF-03: Animaciones y Transiciones

**Animaciones requeridas:**
- Typewriter effect con cursor parpadeante en Home
- Cursor de bloque parpadeante en About
- Sidebar pulse animation (`@keyframes sidebar-pulse`: opacity y scale)
- Transiciones suaves al cambiar de pestaña
- Transiciones suaves al cambiar de tema (colores)
- Hover effects en: botones, tarjetas de proyecto, tarjetas de contacto, tags, links de navegación
- Transiciones de apertura/cierre de paneles laterales (Copilot, Settings, Source Control)
- Barras de progreso en Skills (animación de llenado al entrar en viewport)

---

### RNF-04: Responsividad

**Breakpoints requeridos:**

| Breakpoint | Rango | Comportamiento |
|------------|-------|----------------|
| Desktop | ≥ 1024px | Layout completo con sidebar + editor + copilot |
| Tablet | 768px - 1023px | Sidebar colapsable, terminal ajustable |
| Mobile | < 768px | Sidebar oculta, navegación alternativa, terminal colapsada |

**Adaptaciones en mobile:**
- Activity Bar se convierte en menú hamburguesa o bottom navigation
- Paneles laterales se abren como overlays full-width
- Grid de projects pasa a 1 columna
