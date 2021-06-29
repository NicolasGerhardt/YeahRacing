import Car from './car';
import { canvas, DrawRect } from './graphics';
import { TileVector, Vector } from './interfaces/vector';
import { Level_01 } from './levels/level_01';

const TileGrid_cols = 40;
const TileGrid_rows = 30;
const Tile_W = canvas.width / TileGrid_cols;
const Tile_H = canvas.height / TileGrid_rows;
console.log({ TileGrid_cols, TileGrid_rows, Tile_W, Tile_H });

let Level_Grid: number[];

const TileType = {
  none: 0,
  wall: 1,
  car1Spawn: 2,
  car2Spawn: 3,
  grass: 4,
  tree: 5,
  finishLine: 6
};

function ResetGrid() {
  Level_Grid = new Array(Level_01.length);
  for (let i = 0; i < Level_01.length; i++) {
    Level_Grid[i] = Level_01[i]; 
  }
}

function SpawnCars(): Car[] {
  let cars: Car[] = [];
  for (let i = 0; i < Level_Grid.length; i++) {
    if (Level_Grid[i] == TileType.car1Spawn) {
      let tile = IndexToGridCoord(i);
      let pos = GridCoordToScreenCoord(tile.col, tile.row);
      console.log({ i, tile, pos });
      cars.push(new Car(pos.x + Tile_W / 2, pos.y + Tile_H / 2));
      Level_Grid[i] = TileType.none;
    }
  }

  return cars;
}

function GridCoordToIndex(col: number, row: number): number {
  return col + row * TileGrid_cols;
}

function IndexToGridCoord(index: number): TileVector {
  let col = index % TileGrid_cols;
  let row = Math.floor(index / TileGrid_cols);
  return { col, row };
}

function GridCoordToScreenCoord(col: number, row: number): Vector {
  let x = col * Tile_W;
  let y = row * Tile_H;
  return { x, y };
}

function GetTileTypeAtTileCoord(tileCol: number, tileRow: number): number {
  let calculatedIndex = GridCoordToIndex(tileCol, tileRow);
  if (calculatedIndex < Level_Grid.length && calculatedIndex >= 0) {
    return Level_Grid[calculatedIndex];
  }
  return TileType.none;
}

function HandleCarTileCollision(car: Car) {
  let tileCol = Math.floor(car.x / Tile_W);
  let tileRow = Math.floor(car.y / Tile_H);
  if (GetTileTypeAtTileCoord(tileCol, tileRow) == TileType.none) return;
  
  car.HitWall();
  
  // let prevBallX = car.x;
  // let prevBallY = car.y;
  // let prevTileCol = Math.floor(prevBallX / Tile_W);
  // let prevTileRow = Math.floor(prevBallY / Tile_H);
  // let bothTestFailed = true;
  // if (prevTileCol != tileCol) {
  //   let emptyAdjacentTile = GetTileTypeAtTileCoord(prevTileCol, tileRow) == TileType.none;
  //   if (emptyAdjacentTile) {
  //     bothTestFailed = false;
  //   }
  // }
  // if (prevTileRow != tileRow) {
  //   let emptyAdjacentTile = GetTileTypeAtTileCoord(tileCol, prevTileRow) == TileType.none;
  //   if (emptyAdjacentTile) {
  //     bothTestFailed = false;
  //   }
  // }
  // if (bothTestFailed) {
  // }
}

function DrawGrid() {
  for (let eachCol = 0; eachCol < TileGrid_cols; eachCol++) {
    for (let eachRow = 0; eachRow < TileGrid_rows; eachRow++) {
      if (GetTileTypeAtTileCoord(eachCol, eachRow) == TileType.wall) {
        _drawTile(eachCol * Tile_W, eachRow * Tile_H);
      }
    }
  }
}

function _drawTile(x: number, y: number, color = 'blue') {
  DrawRect(x, y, Tile_W, Tile_H, color);
}

export { DrawGrid, ResetGrid, HandleCarTileCollision, TileType, GetTileTypeAtTileCoord, SpawnCars };
