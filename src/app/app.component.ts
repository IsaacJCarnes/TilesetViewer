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
  adjustedPxSize = TilePxSize * this.zoomLevel
  util = new utilConstants()
  tileGen:number[] = []
  constructor(){
    this.constructTiles()
  }
  getTileHeight():number{
    return Math.floor(this.util.getScreenSizePercentage(100, false)/this.adjustedPxSize)+1;
  }

  getTileWidth():number{
    return Math.floor(this.util.getScreenSizePercentage(100)/this.adjustedPxSize)+1;
  }

  constructTiles(){
    let newTiles:Array<number> = []
    for (let i = 0; i < this.getTileHeight()*this.getTileWidth(); i++) {
        newTiles.push(0)      
    }
    this.tileGen = newTiles;
  }

  titleDisplayed = true
  lastClicked:number = -1
  doubleClickTime = 500
  showingTiles = true
  @HostListener('document:mousedown', ['$event'])
  handleClickEvent(e: Event) {
    e.preventDefault();
    if(this.titleDisplayed){
      this.titleDisplayed = false;
      this.lastClicked = Date.now();
      return;
    }
    if(this.lastClicked + this.doubleClickTime > Date.now()){
      this.constructTiles();
      this.reloadTiles();
      this.lastClicked = -1
    } else {
      this.lastClicked = Date.now();
    }
  }

  reloadTiles(){
    this.showingTiles = false
    setTimeout(() => {this.showingTiles = true})
  }
}