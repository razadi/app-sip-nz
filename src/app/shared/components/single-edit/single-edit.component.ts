import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IElemento } from 'src/app/core/models/elemento.model';


@Component({
  selector: 'app-single-edit',
  templateUrl: './single-edit.component.html',
  styleUrls: ['./single-edit.component.scss']
})
export class SingleEditComponent implements OnInit {

  @Input() title: string;
  @Input() placeHolder: string;
  @Input() campo: IElemento;
  @Input() editing: boolean;

  @Output() itemSelected = new EventEmitter<IElemento>();

  constructor() { }

  ngOnInit(): void {
  }

  saveItem() {
    this.itemSelected.emit(this.campo);
  }

  close() {
    this.itemSelected.emit(null);
  }

}
