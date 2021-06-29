import { DrawCarImage } from './graphics';
import { Keys } from './input';

const acc = 0.1;
const turningSpeed = 0.05;
const maxSpeed = 5;
const masReverseSpeed = -1;
const imageRotationOffset = Math.PI / 2;
const friction = 0.98;

export default class Car {
  id: string;
  x: number;
  y: number;
  heading: number;
  vel = 0;

  constructor(x: number, y: number, rotation = -Math.PI / 2, id = 'car') {
    this.x = x;
    this.y = y;
    this.id = id;
    this.heading = rotation;
  }

  Draw() {
    DrawCarImage(this.x, this.y, this.heading + imageRotationOffset);
  }

  Update() {
    this.HandleInputs();
    this.MoveCar();
  }

  HitWall() {
    this.x -= Math.cos(this.heading) * this.vel;
    this.y -= Math.sin(this.heading) * this.vel;
    this.vel *= -0.3;
  }

  private HandleInputs() {
    if (Keys.Up_Arrow.isPressed) {
      this.vel += acc;
    }

    if (Keys.Down_Arrow.isPressed) {
      this.vel *= friction * friction;
      this.vel -= acc;
    }

    if (Keys.Left_Arrow.isPressed && Math.abs(this.vel) > acc * 2) {
      this.heading -= turningSpeed;
    }

    if (Keys.Right_Arrow.isPressed && Math.abs(this.vel) > acc * 2) {
      this.heading += turningSpeed;
    }
  }

  private MoveCar() {
    // if (Math.abs(this.vel) < 0.09) {
    //   this.vel = 0;
    // }

    this.vel *= friction;
    this.vel = Math.min(this.vel, maxSpeed);
    this.vel = Math.max(this.vel, masReverseSpeed);
    this.x += Math.cos(this.heading) * this.vel;
    this.y += Math.sin(this.heading) * this.vel;
  }
}
