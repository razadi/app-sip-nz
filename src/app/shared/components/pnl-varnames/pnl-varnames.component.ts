import { Component, Input, OnInit } from '@angular/core';

export interface IPaso {
  cve: string;
  name: string;
}

@Component({
  selector: 'app-pnl-varnames',
  templateUrl: './pnl-varnames.component.html',
  styleUrls: ['./pnl-varnames.component.scss']
})
export class PnlVarnamesComponent implements OnInit {
  @Input() corto: string[];
  @Input() names: string[];
  @Input() inicia = 0;

  listado: IPaso[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = +this.inicia; i < this.corto.length; i++) {
      this.listado.push({
        cve: this.corto[i],
        name: this.names[i]
      });
    }
  }

}
