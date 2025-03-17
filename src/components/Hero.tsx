import React, { useEffect, useRef, Suspense } from 'react';
import { cn } from '@/lib/utils';
import { useParallax } from '@/lib/motion';
import { ChevronDown } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carContainerRef = useRef<HTMLDivElement>(null);
  const carScene = useRef<{
    scene?: THREE.Scene,
    camera?: THREE.PerspectiveCamera,
    renderer?: THREE.WebGLRenderer,
    model?: THREE.Group,
    controls?: OrbitControls
  }>({});
  
  useParallax();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      containerRef.current?.classList.add('loaded');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!carContainerRef.current) return;
    
    // Initialize 3D scene
    const container = carContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create scene
    const scene = new THREE.Scene();
    carScene.current.scene = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1, 5);
    carScene.current.camera = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    carScene.current.renderer = renderer;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 2, 3);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Load Ferrari model
    const gltfLoader = new GLTFLoader();
    
    // Use a placeholder cube while loading the model
    const geometry = new THREE.BoxGeometry(2, 1, 4);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xff0000,
      metalness: 0.7,
      roughness: 0.2
    });
    const cubeModel = new THREE.Mesh(geometry, material);
    cubeModel.position.set(0, 0, 0);
    cubeModel.castShadow = true;
    cubeModel.receiveShadow = true;
    scene.add(cubeModel);
    carScene.current.model = cubeModel;
    
    // Try to load Ferrari model from SketchFab or similar sources
    // This URL is a placeholder - you should replace it with an actual Ferrari model URL
    // gltfLoader.load(
    //   'https://path-to-ferrari-model.glb',
    //   (gltf) => {
    //     scene.remove(cubeModel);
    //     const model = gltf.scene;
    //     model.scale.set(0.01, 0.01, 0.01); // Adjust scale as needed
    //     model.position.set(0, 0, 0);
    //     model.traverse((child) => {
    //       if (child instanceof THREE.Mesh) {
    //         child.castShadow = true;
    //         child.receiveShadow = true;
    //       }
    //     });
    //     scene.add(model);
    //     carScene.current.model = model;
    //   },
    //   undefined,
    //   (error) => console.error('Error loading model:', error)
    // );
    
    // Add a platform
    const platformGeometry = new THREE.PlaneGeometry(10, 10);
    const platformMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xeeeeee,
      metalness: 0.1,
      roughness: 0.7
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.rotation.x = -Math.PI / 2;
    platform.position.y = -0.5;
    platform.receiveShadow = true;
    scene.add(platform);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (carScene.current.renderer && carScene.current.scene && carScene.current.camera) {
        carScene.current.renderer.render(carScene.current.scene, carScene.current.camera);
      }
    };
    
    animate();
    
    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!carScene.current.model) return;
      
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      const rect = container.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / height) * 2 + 1;
      
      // Move the car based on mouse position
      gsap.to(carScene.current.model.rotation, {
        y: mouseX * 0.5,
        duration: 1,
        ease: "power2.out"
      });
      
      gsap.to(carScene.current.model.position, {
        x: mouseX * 1.5,
        z: mouseY * 1.5,
        duration: 1,
        ease: "power2.out"
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      if (!carScene.current.camera || !carScene.current.renderer) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      carScene.current.camera.aspect = width / height;
      carScene.current.camera.updateProjectionMatrix();
      carScene.current.renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (carScene.current.renderer && container.contains(carScene.current.renderer.domElement)) {
        container.removeChild(carScene.current.renderer.domElement);
      }
      
      if (carScene.current.renderer) {
        carScene.current.renderer.dispose();
      }
    };
  }, []);
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-6 py-16 md:py-24 w-full flex flex-col md:flex-row items-center justify-between"
      >
        <div className="w-full md:w-1/2 md:pr-8 z-10">
          <div className="space-y-6">
            <span className="inline-block font-mono text-sm text-muted-foreground px-3 py-1 border border-border rounded-full opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Full Stack Developer
            </span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              Creating <span className="text-gradient">digital experiences</span> with code
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              Crafting beautiful, functional, and responsive web applications that
              deliver exceptional user experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium transition-all hover:scale-105"
              >
                View Projects
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-border bg-transparent hover:bg-secondary transition-all"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 mt-12 md:mt-0 hidden md:block relative">
          <div 
            ref={carContainerRef}
            className="relative w-full h-[400px] opacity-0 animate-fade-in rounded-lg overflow-hidden"
            style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
          />
        </div>
      </div>
      
      <a 
        href="#projects" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-sm text-muted-foreground animate-bounce"
      >
        <span className="mb-2">Scroll</span>
        <ChevronDown size={20} />
      </a>
    </section>
  );
};

export default Hero;
