import { Component, OnInit } from '@angular/core';
import { IActividad, IEstrategia } from 'src/app/core/models/ventas.model';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { VentasService } from 'src/app/core/system/modules/ventas.service';

@Component({
  selector: 'app-vlist',
  templateUrl: './vlist.component.html',
  styleUrls: ['./vlist.component.scss']
})
export class VlistComponent implements OnInit {

  ventas: IEstrategia[] = [];
  activities: IActividad[] = [];

  count = 4;
  array = new Array(this.count);


  constructor(
    private ventasService: VentasService,
    private routeStateService: RouteStateService
  ) { }

  ngOnInit(): void {
    this.getVentas();
  }

  async getVentas() {
    const api = await this.ventasService.getVentas().toPromise();
    console.log(api);    
    this.ventas = api.data;

    const api2 = await this.ventasService.getActividades('0', 'today', 'no').toPromise();
    console.log(api2);    
    this.activities = api2.data;
  }

  verVenta(id: string) {
    this.routeStateService.add('Ventas', `/adminis/ventas/venta/${id}`, null, false);
  }

}
