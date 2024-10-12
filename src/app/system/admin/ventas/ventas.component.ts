import { Component, OnInit } from '@angular/core';
import { IActividad, IEstrategia } from 'src/app/core/models/ventas.model';
import { VentasService } from 'src/app/core/system/modules/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
