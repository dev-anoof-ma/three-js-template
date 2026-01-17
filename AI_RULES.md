# AI Development Rules for `threejs-template`

This document defines the technology stack and specific architecture for this high-performance 3D web application. Following these rules ensures consistency, optimal 3D performance, and a premium aesthetic.

## Tech Stack Overview

The application is built using the following core technologies:

- **3D Engine**: Three.js (industry standard WebGL library)
- **Language**: TypeScript (with strict typing)
- **Build Tool**: Vite (fast ESM-based bundling)
- **UI Overlay**: Tailwind CSS (for 2D UI layers on top of the 3D canvas)
- **Architecture**: Class-based Object Oriented setup in `main.ts`

## Project Structure

```text
threejs-template/
├── src/                    # Future proofing: place new TS components here
├── public/                 # 3D assets (.glb, .gltf), textures, and environment maps
├── styles/
│   └── style.css           # Tailwind directives and global canvas positioning
├── index.html              # Main entry point with the WebGL canvas
├── main.ts                 # Core 3D Application Class and loop
└── tsconfig.json           # TypeScript configuration
```

## Library & 3D Usage Guidelines

### 1. Three.js Code Architecture
- **Class-Based**: Maintain the `ThreeJSTemplate` class structure. Logic should be modularized into private methods: `initScene`, `initCamera`, `initLights`, `loadAssets`, `animate`.
- **The Loop**: Always use `window.requestAnimationFrame` within the `animate` method.
- **Delta Time**: Use `THREE.Clock` to calculate `delta` or `elapsedTime` for smooth animations across different frame rates.
- **Resizing**: Always handle the `resize` event to update camera aspect ratio and renderer size.

### 2. Assets & Loading
- **Format**: Prioritize `.glb` or `.gltf` for 3D models.
- **Location**: Store all static assets in the `public/` directory. Reference them in code using absolute paths starting with `/` (e.g., `/my-model.glb`).
- **Loaders**: Use `GLTFLoader` (and `DRACOLoader` if models are compressed). Wrap loading logic in a `loadModel` method with proper error handling.
- **Centering**: When loading models, use `THREE.Box3` to calculate the bounding box and center the model if it's offset in the source file.

### 3. Styling & UI
- **Canvas Positioning**: The canvas (class `.webgl`) should be fixed and cover the background (`z-index: -1`).
- **Tailwind CSS**: Use Tailwind for all 2D UI elements.
- **Premium Aesthetics**: 
  - Use **Glassmorphism** for UI cards (e.g., `bg-white/10 backdrop-blur-md border-white/20`).
  - Use **Vibrant Gradients** for text and buttons.
  - Implement **Dark Mode** defaults (`bg-slate-900` or `#121316`).

### 4. Lighting & Environment
- **Standard Setup**: Combine `AmbientLight` (for base visibility) with `DirectionalLight` or `SpotLight` (for shadows and depth).
- **Physical Correctness**: Set `renderer.outputColorSpace = THREE.SRGBColorSpace` for accurate color representation.
- **Fog**: Use `this.scene.fog = new THREE.Fog(color, near, far)` to create depth and prevent 3D models from "popping" out of view at the edge of the frustum.

### 5. TypeScript Standards
- **Strong Typing**: Avoid `any`. Define interfaces for sizes, configuration objects, and custom model data.
- **Private/Public**: Explicitly mark class members as `private` or `public`.
- **Null Checks**: Always check for element existence (e.g., `document.querySelector<HTMLCanvasElement>("canvas.webgl")`) before initializing.

### 6. Package Management
- **Primary**: Use `pnpm` for package management and script execution.
- **Lock File**: Maintain `pnpm-lock.yaml` for reproducible builds (never commit `node_modules/`).
- **Compatibility**: The template is compatible with npm/yarn if needed, but pnpm is the standard.

## Development Workflow

- **Install Dependencies**: `pnpm install`
- **Development Server**: `pnpm run dev` - Start development server (runs on http://localhost:5173)
- **Production Build**: `pnpm run build` - Production build (runs `tsc` first to ensure type safety)
- **Type Check**: `pnpm run type-check` - Run TypeScript validation standalone
- **Preview Build**: `pnpm run preview` - Preview the production build locally
- **Network Access**: `pnpm run host` - Expose dev server to local network

Adhering to these rules will ensure thatあらゆる new features or models added to the scene maintain high performance and professional visual quality.
