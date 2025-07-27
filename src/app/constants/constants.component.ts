import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export const TilesetSrc = process.env['NODE_ENV']==="production" ? "/TilesetViewer/DoodleTilemap.png" : "/DoodleTilemap.png"
export const TilePxSize = 512;
export const TilesetRows = 3;
export const TilesetCols = 3;
export const TilesetPxWidth = TilePxSize * TilesetRows;
export const TilesetPxHeight = TilePxSize * TilesetCols;
export const TilesetOptions = [...Array(9).keys()]; //From 0-(N-1)
const directions = ["", "right", "back", "left"]

export class utilConstants {
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;
  private ExcludedTiles:number[] = [1,4]
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
  getRandomDirection(){
    return directions[Math.floor(Math.random()*4)];
  }
}
