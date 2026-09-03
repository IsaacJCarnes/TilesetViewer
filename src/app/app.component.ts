import { Component, HostListener, ViewChild } from '@angular/core';
import { TileComponent } from './tile-component/tile-component.component';
import { utilConstants, TilePxSize } from './constants/constants.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  imports: [TileComponent, NgFor, NgIf, NgClass, CdkDrag],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(CdkDrag) drag!: CdkDrag;
  
  title = 'tileset-viewer';
  zoomLevel = 0.25;
  adjustedPxSize = TilePxSize * this.zoomLevel;
  util = new utilConstants();
  tileGen: number[] = [];
  constructor() {
    this.constructTiles();
  }
  @HostListener('window:resize')
  handleResize() {
    this.tileWidth = this.getTileWidth();
    this.tileHeight = this.getTileHeight();
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

  tileAdjustX = 0;
  tileAdjustY = 0;

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

  moveTileAdjustment(x: number, y: number) {
    this.tileAdjustX += x;
    this.tileAdjustY += y;
  }

  gridTileAdjustment(x: number, y: number) {
    this.gridAdjustX += x;
    this.gridAdjustY += y;
    if (this.gridAdjustX > this.adjustedPxSize) {
      this.moveTileAdjustment(-1, 0);
      this.gridAdjustX -= this.adjustedPxSize;
      this.resetPointerForDrag(-this.adjustedPxSize, 0);
    } else if (this.gridAdjustX < -this.adjustedPxSize) {
      this.moveTileAdjustment(1, 0);
      this.gridAdjustX += this.adjustedPxSize;
      this.resetPointerForDrag(this.adjustedPxSize, 0);
    }

    if (this.gridAdjustY > this.adjustedPxSize) {
      this.moveTileAdjustment(0, -1);
      this.gridAdjustY -= this.adjustedPxSize;
      this.resetPointerForDrag(0, -this.adjustedPxSize);
    } else if (this.gridAdjustY < -this.adjustedPxSize) {
      this.moveTileAdjustment(0, 1);
      this.gridAdjustY += this.adjustedPxSize;
      this.resetPointerForDrag(0, this.adjustedPxSize);
    }
  }

  lastDragX = 0;
  lastDragY = 0;

  onDragMoved(event: CdkDragMove) {
    if (this.titleDisplayed) {
      this.titleDisplayed = false;
    }
    const deltaX = event.distance.x - this.lastDragX;
    const deltaY = event.distance.y - this.lastDragY;

    this.lastDragX = event.distance.x;
    this.lastDragY = event.distance.y;

    this.gridTileAdjustment(deltaX, deltaY);
  }

  onDragEnded() {
    this.lastDragX = 0;
    this.lastDragY = 0;
  }

  resetPointerForDrag(x: number, y: number) {
    const pos = this.drag.getFreeDragPosition();

    this.drag.setFreeDragPosition({
      x: pos.x + x,
      y: pos.y + y,
    });
  }
}
