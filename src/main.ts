import './style.css';
import { DrawBackground } from './graphics';
import * as TileMap from './tilemap';
import Car from './car';
import { SetUpKeyBinds } from './input';
import { DrawDebugText } from './debug';

let frameCount = 0;

const ShowDebugText = true;

let playerCars: Car[];

window.onload = function () {
  TileMap.ResetGrid();
  playerCars = TileMap.SpawnCars();
  SetUpKeyBinds();
  window.requestAnimationFrame(GameLoop);
};

function GameLoop(timeStamp: number) {
  UpdateLoop();
  DrawLoop();
  UpdateFrameData(timeStamp);
  window.requestAnimationFrame(GameLoop);
}

function UpdateLoop() {
  playerCars.forEach(car => {
    car.Update()
    TileMap.HandleCarTileCollision(car);
  });
}

function DrawLoop() {
  DrawBackground();
  TileMap.DrawGrid();
  playerCars.forEach(car => car.Draw());

  if (ShowDebugText) {
    DrawDebugText(frameCount, framesPerSecond, playerCars);
  }
}

let secondsPassed: number;
let oldTimeStamp: number;
let framesPerSecond: number;

function UpdateFrameData(timeStamp: number) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000; // convert ms to seconds
  oldTimeStamp = timeStamp;
  framesPerSecond = Math.floor(1 / secondsPassed);
  frameCount++;
}


