import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

export const TilePxSize = 512;
export const TilesetRows = 3;
export const TilesetCols = 2;
export const TilesetPxWidth = TilePxSize * TilesetRows;
export const TilesetPxHeight = TilePxSize * TilesetCols;
export const TilesetOptions = 5;
export class utilConstants {
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;
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
}
