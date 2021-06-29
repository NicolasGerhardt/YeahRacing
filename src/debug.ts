import Car from "./car";
import { DrawText } from "./graphics";
import { LastKeyPressed } from "./input";



export function DrawDebugText(frameCount: number, framesPerSecond: number, cars: Car[]) {
  let debugTextArray = [
    `frameCount: ${frameCount}`,
    `framesPerSecond: ${framesPerSecond}`,
    `LastKeyPressed: ${LastKeyPressed}`,
  ];

  cars.forEach(car => {
    debugTextArray.push(`${car.id} speed: ${car.vel.toFixed(2)}`);
  });

  for (let i = 0; i < debugTextArray.length; i++) {
    DrawText(debugTextArray[i], 10, i * 10 + 30);
  }
}