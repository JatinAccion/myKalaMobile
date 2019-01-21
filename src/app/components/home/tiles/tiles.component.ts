import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TilesComponent implements OnInit {
  @Input() tilesData: Array<any>;
  @Output() selectTile = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  resetOverlay(e) {
    let elements = document.querySelectorAll('.overlay_CS');
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        let elem = elements[i] as HTMLElement;
        elem.classList.add('d-none');
      }
    }
    if (e.currentTarget.querySelectorAll('.overlay_CS')[0]) e.currentTarget.querySelectorAll('.overlay_CS')[0].classList.remove('d-none');
  }

  getSelectedTile(tile) {
    this.selectTile.emit({ tile })
  }

}
