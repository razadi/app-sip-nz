import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-elements',
  templateUrl: './list-elements.component.html',
  styleUrls: ['./list-elements.component.scss']
})
export class ListElementsComponent implements OnInit {

  @Input() list: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
