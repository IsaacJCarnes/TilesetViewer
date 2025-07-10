import { Component } from '@angular/core';
import { TileComponent } from './tile-component/tile-component.component';
import { utilConstants, TilePxSize } from './constants/constants.component';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [TileComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tileset-viewer';
  zoomLevel = 0.25;
  adjustedPxSize = TilePxSize * this.zoomLevel
  util = new utilConstants()
  tileGen:number[] = []
  constructor(){
    this.tileGen = this.constructTiles()
  }
  getTileHeight():number{
    return Math.floor(this.util.getScreenSizePercentage(100, false)/this.adjustedPxSize)+1;
  }

  getTileWidth():number{
    return Math.floor(this.util.getScreenSizePercentage(100)/this.adjustedPxSize)+1;
  }

  constructTiles():Array<number>{
    let newTiles:Array<number> = []
    for (let i = 0; i < this.getTileHeight()*this.getTileWidth(); i++) {
        newTiles.push(0)      
    }
    return newTiles;
  }
}