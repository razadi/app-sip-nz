import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-elements',
  templateUrl: './data-elements.component.html',
  styleUrls: ['./data-elements.component.scss']
})
export class DataElementsComponent implements OnInit {

  @Input() title: string;
  @Input() descrip: string;
  @Input() bcolor = true;

  constructor() { }

  ngOnInit(): void {
  }

}
