import { Component, OnInit } from '@angular/core';
import { IActividad, IEstrategia } from 'src/app/core/models/ventas.model';
import { VentasService } from 'src/app/core/system/modules/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  ventas: IEstrategia[] = [];
  activities: IActividad[] = [];

  count = 4;
  array = new Array(this.count);


  constructor(
    private ventasService: VentasService
  ) { }

  ngOnInit(): void {
    this.getVentas();
  }

  async getVentas() {
    const api = await this.ventasService.getVentas().toPromise();
    console.log(api);    
    this.ventas = api.data;

    const api2 = await this.ventasService.getActividades('4', '1', 'no', 'no').toPromise();
    console.log(api2);    
    this.activities = api2.data;
  }

}
