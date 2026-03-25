# Josue Chaves — Portfolio

A VS Code-themed interactive portfolio built with React 19 and Vite 8. The UI replicates a code editor environment with a file explorer, tab bar, command palette, terminal, and an AI copilot assistant.

## Features

- **VS Code UI** — Activity bar, explorer, tab bar, breadcrumb, status bar, and menu bar
- **Command Palette** — Open with `Ctrl+P` to navigate sections, switch themes, or access the copilot
- **AI Copilot** — Chat assistant powered by OpenRouter with portfolio context
- **Terminal** — Interactive fake terminal (`Ctrl+\``) with commands: `help`, `ls`, `cat`, `whoami`, `git log`, and more
- **Bilingual** — Full EN / ES support via a custom i18n system
- **Themes** — Multiple editor color themes switchable from the status bar or command palette
- **Sections** — Home, About, Projects, Skills, Experience, Contact, README, Resume

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build | Vite 8 (Oxc compiler) |
| Styling | CSS Modules + CSS custom properties |
| Icons | Lucide React |
| Analytics | Vercel Analytics |
| AI Backend | OpenRouter API (via Express serverless handler) |
| Linting | ESLint 9 |
| Quality | SonarQube |

## Getting Started

### Prerequisites

- Node.js 18+
- An [OpenRouter](https://openrouter.ai) API key for the copilot feature

### Installation

```bash
git clone https://github.com/JosueChaves01/Portfolio.git
cd Portfolio
npm install
```

### Environment variables

Create a `.env.local` file at the root:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

### Development

```bash
npm run dev
```

Starts both the Vite dev server and the Express API server concurrently. The app is available at `http://localhost:5173`.

### Build

```bash
npm run build
```

Output goes to `/dist`.

### Lint

```bash
npm run lint
```

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+P` | Open command palette |
| `Ctrl+\`` | Toggle terminal |
| `Ctrl+Shift+C` | Open copilot |
| `Ctrl+B` | Toggle sidebar |
| `Esc` | Close active overlay |

## Project Structure

```
src/
├── app/            # Root app component
├── features/       # UI features (explorer, tabBar, terminal, copilot, sections…)
├── shared/         # Shared hooks, utilities, constants, icons
├── store/          # React context providers (Theme, Language, Tabs, Panel, Overlay)
└── styles/         # Global CSS (reset, tokens, base)

api/
├── copilot.js      # Serverless endpoint handler
└── lib/            # Prompt builder, off-topic filter, portfolio context
```

## Deployment

The project is ready to deploy on **Vercel**:

1. Push to GitHub
2. Import the repo on Vercel
3. Add `OPENROUTER_API_KEY` as an environment variable
4. Deploy — Vite handles the static build and `/api/copilot` runs as a serverless function

## License

MIT
