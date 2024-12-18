import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActividad, ICliente, IEstrategia, IEstSeguir, IVendedor } from 'src/app/core/models/ventas.model';
import { VentasService } from 'src/app/core/system/modules/ventas.service';

@Component({
  selector: 'app-vdetail',
  templateUrl: './vdetail.component.html',
  styleUrls: ['./vdetail.component.scss']
})
export class VdetailComponent implements OnInit {

  indexTab = 0;
  estId: number;
  tooltips = ['Back', '', ''];
  links = ['/adminis/ventas', '', ''];
  visibles = [true, false, false];
  time = '12:23 am';
  visible: boolean = false;
  activitiesPen: IActividad[] = [];
  activitiesRel: IActividad[] = [];
  activitiesAll: IActividad[] = [];

  listOfData: IActividad[] = [];
  copylistOfData
  filterAct: boolean;

  estrategia: IEstrategia;
  cliente: ICliente;
  estseguir: IEstSeguir;
  vendedor: IVendedor;


  constructor(
    private route: ActivatedRoute,
    private ventasService: VentasService
  ) { }

  ngOnInit(): void {
    this.estId = this.route.snapshot.params.id;
    this.getVenta();
  }

  async getVenta() {
    const api = await this.ventasService.getVenta(this.estId+'').toPromise();
    this.estrategia = api.data.estrategia;
    
    this.cliente = api.data.cliente;
    this.estseguir = api.data.seguir;
    this.vendedor = api.data.vendedor;

    const api2 = await this.ventasService.getActividades(this.estId+'', 'est', 'si').toPromise();
    this.activitiesPen = api2.data;
    const api3 = await this.ventasService.getActividades(this.estId+'', 'est', 'no').toPromise();
    this.activitiesRel = api3.data;
    const api4 = await this.ventasService.getActividades(this.estId+'', 'all', 'no').toPromise();
    this.activitiesAll = api4.data;

    // this.listOfData = api2.data ? api2.data : null;
    // this.copylistOfData = [...this.listOfData];
    // this.changeListActies();
    // console.log(api2);    
    // this.activities = api2.data;
  }

  editarCia() {
    // this.modalEmpEditor('Modificar empresa', this.cia);
  }

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }

  changeListActies() {
    // this.listOfData = !this.filterUsu ? this.listOfData.filter((usu: any) => usu.cia === this.cia.name) : this.copylistOfData;
  }

  searchActies(search){    
    const targetValue: any[] = [];
    this.copylistOfData.forEach((value: any) => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (value[keys[i]] && value[keys[i]].toString().toLocaleLowerCase().includes(search)) {
          targetValue.push(value);
          break;
        }
      }
    });
    this.listOfData = targetValue;
  }

}
