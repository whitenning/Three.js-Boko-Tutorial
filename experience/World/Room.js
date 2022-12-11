import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.handleVideo = this.experience.resources.videoMuted;
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1
    };

    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      if (child.name === "Screen002") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen
        });
      }
    });
    console.log(this.actualRoom);
    this.scene.add(this.actualRoom);
    this.actualRoom.rotation.x = Math.PI;
    this.actualRoom.rotation.z = Math.PI;
    this.actualRoom.rotation.y = 0;

    this.actualRoom.scale.set(0.5, 0.5, 0.5);
  }
  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    this.bench = this.mixer.clipAction(this.room.animations[0]);
    this.benchItem = this.mixer.clipAction(this.room.animations[1]);
    this.benchItem1 = this.mixer.clipAction(this.room.animations[2]);
    this.benchItem2 = this.mixer.clipAction(this.room.animations[3]);
    this.benchItem3 = this.mixer.clipAction(this.room.animations[4]);

    this.bench.play();
    this.benchItem.play();
    this.benchItem1.play();
    this.benchItem2.play();
    this.benchItem3.play();

    console.log(this.room);
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}

  update() {
    this.mixer.update(this.time.delta * 0.0009);
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.actualRoom.rotation.y = this.lerp.current;
  }
}
