import { DrawCenteredImage } from './graphics';
import { Keys } from './keys';

const car1Image = document.querySelector<HTMLImageElement>('#car1');
const car2Image = document.querySelector<HTMLImageElement>('#car2');

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

  constructor(x: number, y: number, id: string, rotation = -Math.PI / 2) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.heading = rotation;
  }

  Draw() {
    if (this.isPlayerOne()) {
      DrawCenteredImage(car1Image, this.x, this.y, this.heading + imageRotationOffset);
    }
    if (this.isPlayerTwo()) {
      DrawCenteredImage(car2Image, this.x, this.y, this.heading + imageRotationOffset);
    }
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

  private isPlayerOne(): boolean {
    return this.id.indexOf('1') > -1;
  }

  private isPlayerTwo(): boolean {
    return this.id.indexOf('2') > -1;
  }

  private HandleInputs() {
    if (this.isPlayerOne()) {
      this.HandleP1Inputs();
    }
    if (this.isPlayerTwo()) {
      this.HandleP2Inputs();
    }
  }

  private HandleP1Inputs() {
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

  private HandleP2Inputs() {
    if (Keys.w.isPressed) {
      this.vel += acc;
    }

    if (Keys.s.isPressed) {
      this.vel *= friction * friction;
      this.vel -= acc;
    }

    if (Keys.a.isPressed && Math.abs(this.vel) > acc * 2) {
      this.heading -= turningSpeed;
    }

    if (Keys.d.isPressed && Math.abs(this.vel) > acc * 2) {
      this.heading += turningSpeed;
    }
  }

  private MoveCar() {
    this.vel *= friction;
    this.vel = Math.min(this.vel, maxSpeed);
    this.vel = Math.max(this.vel, masReverseSpeed);
    this.x += Math.cos(this.heading) * this.vel;
    this.y += Math.sin(this.heading) * this.vel;
  }
}
