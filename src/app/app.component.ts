import { Component, HostListener } from '@angular/core';
import { TileComponent } from './tile-component/tile-component.component';
import { utilConstants, TilePxSize } from './constants/constants.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [TileComponent, NgFor, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tileset-viewer';
  zoomLevel = 0.25;
  adjustedPxSize = TilePxSize * this.zoomLevel;
  util = new utilConstants();
  tileGen: number[] = [];
  constructor() {
    this.constructTiles();
  }
  getTileHeight(): number {
    return (
      Math.floor(
        this.util.getScreenSizePercentage(100, false) / this.adjustedPxSize,
      ) + 4
    );
  }

  getTileWidth(): number {
    return (
      Math.floor(this.util.getScreenSizePercentage(100) / this.adjustedPxSize) +
      4
    );
  }

  tileWidth = this.getTileWidth();
  tileHeight = this.getTileHeight();

  tileAdjustX = 0
  tileAdjustY = 0

  gridAdjustX = 0;
  gridAdjustY = 0;

  constructTiles() {
    let newTiles: Array<number> = [];
    for (let i = 0; i < this.tileWidth * this.tileHeight; i++) {
      newTiles.push(0);
    }
    this.tileGen = newTiles;
  }

  randomSeed = Date.now();

  titleDisplayed = true;
  lastClicked: number = -1;
  doubleClickTime = 500;
  showingTiles = true;
  @HostListener('document:mousedown', ['$event'])
  handleClickEvent(e: Event) {
    e.preventDefault();
    if (this.titleDisplayed) {
      this.titleDisplayed = false;
      this.lastClicked = Date.now();
      return;
    }
    if (this.lastClicked + this.doubleClickTime > Date.now()) {
      this.randomSeed = Date.now();
      this.lastClicked = -1;
    } else {
      this.lastClicked = Date.now();
    }
  }

  moveTileAdjustment(x:number, y:number){
    this.tileAdjustX += x;
    this.tileAdjustY += y;
  }

  gridTileAdjustment(x:number, y:number){
    this.gridAdjustX += x
    this.gridAdjustY += y
    if(this.gridAdjustX > this.adjustedPxSize){
      this.moveTileAdjustment(-1, 0)
      this.gridAdjustX -= this.adjustedPxSize
    } else if (this.gridAdjustX < -this.adjustedPxSize){
      this.moveTileAdjustment(1, 0)
      this.gridAdjustX += this.adjustedPxSize
    }

    if(this.gridAdjustY > this.adjustedPxSize){
      this.moveTileAdjustment(0, -1)
      this.gridAdjustY -= this.adjustedPxSize
    } else if (this.gridAdjustY < -this.adjustedPxSize){
      this.moveTileAdjustment(0, 1)
      this.gridAdjustY += this.adjustedPxSize
    }
  }

  gridIncrementAdjustment = 5
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    let adjustmentX = 0
    let adjustmentY = 0
    let incrementSize = this.adjustedPxSize/this.gridIncrementAdjustment
    if (event.key == 'ArrowDown') {
      adjustmentY += incrementSize
    }
    if (event.key == 'ArrowUp') {
      adjustmentY -= incrementSize
    }
    
    if (event.key == 'ArrowLeft') {
      adjustmentX -= incrementSize
    }
    if (event.key == 'ArrowRight') {
      adjustmentX += incrementSize
    }

    this.gridTileAdjustment(adjustmentX, adjustmentY)
  }
}
