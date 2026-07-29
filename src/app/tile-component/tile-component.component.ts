import { Component, input, Input } from '@angular/core';
import { OnInit } from '@angular/core';

import {
  TilesetSrc,
  TilesetCols,
  TilePxSize,
  TilesetPxHeight,
  TilesetPxWidth,
  TilesetOptions,
  utilConstants,
} from '../constants/constants.component';
@Component({
  selector: 'tile-component',
  imports: [],
  templateUrl: './tile-component.component.html',
  styleUrl: './tile-component.component.scss',
})
export class TileComponent implements OnInit {
  @Input() tileId!: number; //set by app component
  @Input() gridX!: number; //set by app component
  @Input() gridY!: number; //set by app component
  @Input() zoomLevel!: number; //set by app component
  @Input() seedVal!: number; //set by app component

  tilePxSize = TilePxSize;
  tilesetPxWidth = TilesetPxWidth;
  tilesetPxHeight = TilesetPxHeight;
  tilesetSrc = TilesetSrc;
  util = new utilConstants();

  tileIdX!: number;
  tileIdY!: number;

  hashVal!: number;
  tilePictureId!: number;
  tilePictureIdX!: number;
  startPxX!: number;
  tilePictureIdY!: number;
  startPxY!: number;
  direction!: string;
  flipped!: string;

  ngOnInit(): void {
    this.tileIdX = this.tileId % this.gridX;
    this.tileIdY = Math.floor(this.tileId / this.gridX);

    this.hashVal = this.util.createHash(
      this.seedVal || 0,
      this.tileIdX,
      this.tileIdY,
    );

    this.tilePictureId = this.util.getTileById(this.hashVal);
    
    this.tilePictureIdX = this.tilePictureId % TilesetCols;
    this.startPxX = this.tilePictureIdX * TilePxSize * -1;
    this.tilePictureIdY = Math.floor(this.tilePictureId / TilesetCols);
    this.startPxY = this.tilePictureIdY * TilePxSize * -1;

    this.direction = this.util.getRotationByHash(this.hashVal); //this.util.getRandomDirection();
    this.flipped =((this.hashVal >> 10) & 1) === 1 ? '' : 'flipped';

    console.log(
      this.tileIdX,
      ' ',
      this.tileIdY,
      ' ',
      this.tilePictureId,
      ' ',
      this.hashVal,
    );
  }
}
