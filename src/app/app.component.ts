import { Component } from '@angular/core';
import { TileComponent } from './tile-component/tile-component.component';
@Component({
  selector: 'app-root',
  imports: [TileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tileset-viewer';
  zoomLevel = 0.5;

  tileGen = [4, 2, 0, 4, 3, 4, 3, 2, 2, 0, 3, 4, 0, 1, 2, 0, 2, 3, 3, 4, 4, 4, 2, 2, 2, 4, 0, 0, 0, 3, 3, 1, 3, 3, 1, 4, 4, 4, 2, 2, 2, 2, 4, 0, 0, 1, 3, 0, 2, 4]
}
