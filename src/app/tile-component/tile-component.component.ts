import { Component, Input } from '@angular/core';
import { TilesetSrc, TilesetCols, TilePxSize, TilesetPxHeight, TilesetPxWidth, TilesetOptions, utilConstants } from '../constants/constants.component';
@Component({
  selector: 'tile-component',
  imports: [],
  templateUrl: './tile-component.component.html',
  styleUrl: './tile-component.component.scss'
})
export class TileComponent {
  @Input() zoomLevel = 1 //set by app component
  
  tilePxSize = TilePxSize
  tilesetPxWidth = TilesetPxWidth
  tilesetPxHeight = TilesetPxHeight
  tilesetSrc = TilesetSrc
  util = new utilConstants();

  tileId = this.util.getRandomFromAvailableTiles()
  tileIdX = ((this.tileId) % TilesetCols)
  startPxX = this.tileIdX * TilePxSize * -1
  tileIdY = (Math.floor(this.tileId / TilesetCols))
  startPxY = this.tileIdY * TilePxSize * -1;
  direction = this.util.getRandomDirection();
  flipped = Math.random() < 0.5 ? "" : "flipped"

  constructor(){
    console.log(this.tilesetSrc)
  }
}
