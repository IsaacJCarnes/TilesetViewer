import { Component, Input } from '@angular/core';
import { TilesetRows, TilePxSize, TilesetPxHeight, TilesetPxWidth, TilesetOptions } from '../constants/constants.component';
@Component({
  selector: 'tile-component',
  imports: [],
  templateUrl: './tile-component.component.html',
  styleUrl: './tile-component.component.scss'
})
export class TileComponent {
  @Input() zoomLevel = 1
  tilePxSize = TilePxSize
  tilesetPxWidth = TilesetPxWidth
  tilesetPxHeight = TilesetPxHeight

  tileId = Math.floor(Math.random() * TilesetOptions)
  tileIdX = ((this.tileId) % TilesetRows)
  startPxX = this.tileIdX * TilePxSize * -1
  tileIdY = (Math.floor(this.tileId / TilesetRows))
  startPxY = this.tileIdY * TilePxSize * -1

  constructor(){
  }
}
