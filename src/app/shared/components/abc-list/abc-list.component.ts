import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { IElemento } from 'src/app/core/models/elemento.model';

@Component({
  selector: 'app-abc-list',
  templateUrl: './abc-list.component.html',
  styleUrls: ['./abc-list.component.scss']
})
export class AbcListComponent implements OnInit {
  
  @Input() list: IElemento[] = [];
  @Input() initLoading: boolean;
  @Input() campo: any;
  @Input() actions: boolean = true;
  @Input() acceso: string[] = [];

  @Output() itemSelectedEdit = new EventEmitter();
  @Output() itemSelectedDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  editar(item){
    this.itemSelectedEdit.emit(item);
  }

  quitar(item) {
    this.itemSelectedDelete.emit(item);
  }

}
