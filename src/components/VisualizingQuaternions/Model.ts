import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
class SphereModel {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private sphere: THREE.Mesh;

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    const geometry = new THREE.SphereGeometry( 20, 64, 64 );
    const material = new THREE.MeshLambertMaterial({ color: 0x00aadd }); // 使用 MeshPhongMaterial 材质
    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);

    this.camera.position.z = 100;
    // 添加 OrbitControls 控制器
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.update();

    // 添加平行光
    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    light.position.set(0, 1, 2);
    this.scene.add(light);
  }

  setRadius(radius: number) {
    this.sphere.scale.set(radius, radius, radius);
  }

  animate() {
    const animateFrame = () => {
      requestAnimationFrame(animateFrame);
      this.renderer.render(this.scene, this.camera);
    };
    animateFrame();
  }
}

export default SphereModel;
