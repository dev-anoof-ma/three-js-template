# 🎨 Three.js TypeScript Template

> A professional, production-ready template for building stunning 3D web experiences with Three.js, TypeScript, and Tailwind CSS.

![Three.js Template Preview](./public/Screenshot.png)

## ✨ Features

- 🎮 **Three.js** - Industry-standard WebGL library for 3D graphics
- 📘 **TypeScript** - Full type safety and superior developer experience
- ⚡ **Vite** - Lightning-fast development server with HMR
- 🎨 **Tailwind CSS** - Modern utility-first styling for UI overlays
- 📦 **PNPM** - Fast, disk space efficient package manager
- 🏗️ **Clean Architecture** - Class-based OOP structure with separation of concerns
- 🎭 **GLTF/GLB Support** - Load external 3D models with animations
- 🌈 **Premium Aesthetics** - Built-in neon lighting and cinematic effects

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** (recommended) or npm/yarn

### Installation

```bash
# Clone or download this template
cd threejs-template

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The app will be running at **http://localhost:5173** 🎉

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm run dev` | Start development server (http://localhost:5173) |
| `pnpm run build` | Build for production with TypeScript validation |
| `pnpm run preview` | Preview production build locally |
| `pnpm run type-check` | Run TypeScript type checking |
| `pnpm run host` | Expose dev server to local network |

## 📁 Project Structure

```
threejs-template/
├── public/              # Static assets (3D models, textures, images)
│   ├── pony_cartoon.glb # Example 3D model
│   ├── favicon_white.ico
│   └── logo.png
├── styles/
│   └── style.css        # Global styles + Tailwind directives
├── index.html           # Main HTML entry point
├── main.ts              # Core application logic (Three.js setup)
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.ts       # Vite bundler configuration
└── AI_RULES.md          # Development guidelines for AI assistants
```

## 🎯 What's Included

### 🔧 Core Setup
- **Scene Management** - Organized class-based architecture
- **Camera Controls** - OrbitControls for intuitive navigation
- **Responsive Design** - Automatic resize handling
- **Animation Loop** - requestAnimationFrame-based render loop with delta time

### 💡 Lighting System
- Ambient lighting for base illumination
- Directional lights for depth and shadows
- Dynamic spotlight effects
- Neon accent lights (pink/cyan)
- Atmospheric fog

### 🎨 Visual Effects
- Infinite grid floor with motion parallax
- "Riding" physics simulation (bounce, tilt)
- Glassmorphic UI overlays (optional)
- sRGB color space for accurate rendering

## 🎓 Learning Resources

### Three.js Documentation
- [Official Three.js Docs](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [Three.js Journey](https://threejs-journey.com/) (Recommended course)

### Free 3D Assets
- [Sketchfab](https://sketchfab.com/) - Millions of free 3D models
- [Poly Haven](https://polyhaven.com/) - Free HDRIs, textures, and models
- [Kenney Assets](https://www.kenney.nl/assets) - Game-ready 3D models

### TypeScript & Tooling
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🛠️ How to Add Your Own 3D Models

1. **Get a Model**: Download a `.glb` or `.gltf` file from Sketchfab or create one in Blender
2. **Add to Public**: Place the file in the `public/` folder
3. **Load in Code**: Update the path in `main.ts`:

```typescript
loader.load(
  "/your-model.glb",  // ← Change this
  (gltf) => {
    this.model = gltf.scene;
    this.scene.add(this.model);
  }
);
```

## 🎨 Customization Tips

### Change Background Color
Edit `styles/style.css`:
```css
html {
  background: #your-color;
}
```

### Adjust Camera Position
In `main.ts` → `initCamera()`:
```typescript
this.camera.position.set(x, y, z); // Adjust coordinates
```

### Modify Lighting
In `main.ts` → `initLights()`:
```typescript
const light = new THREE.PointLight(0xffffff, intensity, distance);
light.position.set(x, y, z);
```

## 🌟 Inspirational Three.js Projects

- [Bruno Simon's Portfolio](https://bruno-simon.com/) - Interactive 3D driving game
- [Coastal World](https://coastalworld.com/) - Immersive 3D storytelling
- [Lusion](https://lusion.co/) - Award-winning creative studio
- [Three.js Examples](https://threejs.org/examples/) - Official demos

## 📝 Development Guidelines

For detailed coding standards and architecture patterns, see **[AI_RULES.md](./AI_RULES.md)**.

Key principles:
- ✅ Use TypeScript with strict typing
- ✅ Follow class-based OOP architecture
- ✅ Store assets in `public/` directory
- ✅ Use Tailwind for UI overlays
- ✅ Maintain 60 FPS performance

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Share your creations built with this template

## 📄 License

MIT License - feel free to use this template for personal or commercial projects.

## 💙 Acknowledgments

- **Three.js** - Amazing WebGL library by [mrdoob](https://github.com/mrdoob)
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Community** - All the incredible Three.js creators and educators

---

**Built with ❤️ for the 3D web community**

*Ready to create something amazing? Star this repo and share your creations!* ⭐
