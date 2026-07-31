import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export const TilesetSrc = process.env['NODE_ENV']==="production" ? "/TilesetViewer/DoodleTilemap.png" : "/DoodleTilemap.png"
export const TilePxSize = 512;
export const TilesetRows = 3;
export const TilesetCols = 5;
export const TilesetPxWidth = TilePxSize * TilesetCols;
export const TilesetPxHeight = TilePxSize * TilesetRows;
export const TilesetOptions = [...Array(13).keys()]; //From 0-(N-1)
const directions = ["", "right", "back", "left"]

export class utilConstants {
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;
  private ExcludedTiles:number[] = []
  isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  getScreenSizePercentage(percent: number, isWidth = true) {
    if (this.window == null) {
      return 0;
    }
    return (
      (percent / 100) *
      (isWidth === true ? this.window.innerWidth : this.window.innerHeight)
    );
  }

  addDigit(num: string, placesNeeded: number): string {
    while (num.length < placesNeeded) {
      num = `0${num}`;
    }
    return num;
  }
  timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  getRandomFromAvailableTiles(){
    let adjustedTileset = TilesetOptions.filter(element => !this.ExcludedTiles.includes(element));
    let chosenId = Math.floor(Math.random() * adjustedTileset.length);
    return adjustedTileset[chosenId];
  }
  getTileById(tileId:number){
    return TilesetOptions[tileId % TilesetOptions.length];
  }
  getRandomDirection(){
    return directions[Math.floor(Math.random()*4)];
  }

  createHash(seed:number, x:number, y:number){
    let h = seed;

    h ^= x * 0x27d4eb2d;
    h = Math.imul(h, 0x85ebca6b);

    h ^= y * 0x165667b1;
    h = Math.imul(h, 0xc2b2ae35);

    h ^= h >>> 16;
    return h >>> 0;
  }
  getRotationByHash(hash:number){
    var rotation = ((hash >> 8) & 3) * 90;
    switch(rotation){
      case 90:
        return "right";
      case 180:
        return "back";
      case 270:
        return "left";
      default:
        return "";
    }
  }
}
