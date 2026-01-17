import "./styles/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Sizes {
  width: number;
  height: number;
}

class ThreeJSTemplate {
  private scene!: THREE.Scene;
  private clock!: THREE.Clock;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private canvas!: HTMLCanvasElement;
  private sizes!: Sizes;
  private model?: THREE.Group;
  private mixer?: THREE.AnimationMixer;
  private controls!: OrbitControls;
  private floor!: THREE.Mesh;
  private gridOffset: number = 0;

  constructor() {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initLights();
    this.initEnvironment();
    this.loadModel();
    this.initControls();
    this.addEventListeners();
    this.animate();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog("#121316", 5, 15);
    this.clock = new THREE.Clock();
  }

  private initCamera(): void {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.camera.position.set(0, 2, 6);
    this.scene.add(this.camera);
  }

  private initRenderer(): void {
    const canvas = document.querySelector<HTMLCanvasElement>("canvas.webgl");
    if (!canvas) {
      throw new Error("Canvas element not found");
    }
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  private initLights(): void {
    // Ambient light for general visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    // Dynamic "Headlights" / Focus Light
    const spotLight = new THREE.SpotLight(0x7444ff, 10);
    spotLight.position.set(0, 5, 5);
    spotLight.angle = Math.PI * 0.2;
    spotLight.penumbra = 0.5;
    this.scene.add(spotLight);

    // Neon Accent Lights
    const pinkLight = new THREE.PointLight(0xff00bb, 2, 10);
    pinkLight.position.set(-3, 1, 0);
    this.scene.add(pinkLight);

    const blueLight = new THREE.PointLight(0x00ffff, 2, 10);
    blueLight.position.set(3, 1, 0);
    this.scene.add(blueLight);
  }

  private initEnvironment(): void {
    // Create an infinite-feeling floor with a grid
    const floorGeometry = new THREE.PlaneGeometry(20, 100);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: "#1a1a1a",
      roughness: 0.1,
      metalness: 0.5
    });
    this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
    this.floor.rotation.x = -Math.PI * 0.5;
    this.floor.position.y = -0.5;
    this.scene.add(this.floor);

    // Add a grid helper for motion effect
    const grid = new THREE.GridHelper(100, 50, 0x7444ff, 0x222222);
    grid.position.y = -0.49;
    this.scene.add(grid);

    // Assign grid to floor for easier movement logic
    this.grid = grid;
  }
  private grid!: THREE.GridHelper;

  private loadModel(): void {
    const loader = new GLTFLoader();

    loader.load(
      "/pony_cartoon.glb",
      (gltf) => {
        this.model = gltf.scene;
        this.model.scale.set(1.5, 1.5, 1.5);

        // Center the model
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        this.model.position.x += (this.model.position.x - center.x);
        this.model.position.y += (this.model.position.y - center.y);
        this.model.position.z += (this.model.position.z - center.z);

        this.model.position.y = 0;

        if (gltf.animations && gltf.animations.length) {
          this.mixer = new THREE.AnimationMixer(this.model);
          const action = this.mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        this.scene.add(this.model);
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );
  }

  private initControls(): void {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.maxPolarAngle = Math.PI * 0.5; // Prevent looking under floor
  }

  private addEventListeners(): void {
    window.addEventListener("resize", () => this.onResize());
  }

  private onResize(): void {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.sizes.width, this.sizes.height);
  }

  private animate(): void {
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Looping Movement Effect
    // Move the grid backwards to simulate forward velocity
    this.gridOffset += delta * 10; // Speed of movement
    if (this.grid) {
      this.grid.position.z = (this.gridOffset % 2);
    }

    // 2. "Riding" Physics (Subtle bobbing and vibration)
    if (this.model) {
      // Gentle bounce (suspension)
      this.model.position.y = Math.sin(elapsedTime * 10) * 0.05;

      // Slight tilt as if driving/riding at speed
      this.model.rotation.z = Math.sin(elapsedTime * 5) * 0.02;
      this.model.rotation.x = Math.sin(elapsedTime * 3) * 0.01;
    }

    // 3. Update animations
    if (this.mixer) {
      this.mixer.update(delta);
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(() => this.animate());
  }
}

new ThreeJSTemplate();
