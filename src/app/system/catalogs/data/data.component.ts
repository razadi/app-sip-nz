import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastService } from '../../../core/services/toast.service';
import { MessageService } from '../../../core/services/message.service';
import { DatosService } from '../../../core/catalogs/datos.service';
import { IDato, IUnidad, IArea } from '../../../core/models/catalogs.model';
import { CatalogsService } from '../../../core/catalogs/catalogs.service';
import { AreasService } from '../../../core/catalogs/areas.service';
import { PassportService } from '../../../core/passport/passport.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  listOfData: IDato[] = [];
  copylistOfData;
  dataForm: FormGroup;
  dato: IDato;
  modalTitle;
  tplModalButtonLoading = false;
  listUnidades: IUnidad[] = [];
  listAreas: IArea[] = [];

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private messageService: MessageService,
    private modal: NzModalService,
    private datosService: DatosService,
    private catalogsService: CatalogsService,
    private passportService: PassportService,
    private areasServices: AreasService
  ) { }

  ngOnInit(): void {
    this.getRegisters();
  }

  getListas() {
    const emp = this.passportService.cia$.getValue();

    this.catalogsService.getUnidades().subscribe((res: any) => {
      this.listUnidades = res.data;
    });
    this.areasServices.getAreas(emp.clave).subscribe((res: any) => {
      this.listAreas = res.data;
    });
  }

  getRegisters() {
    this.datosService.getDatos().subscribe((res: any) => {
      this.listOfData = res.data ? res.data : null;
      this.copylistOfData = [...this.listOfData];
    });
  }

  search(search: any){
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

  createForm(dato: IDato) {
    this.dato = dato;
    
    this.dataForm = this.fb.group({
      descri: [ this.dato ? this.dato.descri : null, [Validators.required]],
      valor: [ this.dato ? this.dato.valor : null, [Validators.required]],
      unidad: [ this.dato ? this.dato.unidad : null, [Validators.required]],
      encargado: [ this.dato ? this.dato.encargado : null, [Validators.required]]
    });
  }

  cataModal(dato: IDato, tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.getListas();
    this.createForm(dato);    
    this.modalTitle = dato ? `Modificar el dato ${dato.descri}` : 'Crear un nuevo dato.';
    this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        value: ''
      }
    });
  }

  async acceptModel(modelRef: NzModalRef) {
    this.tplModalButtonLoading = true;

    for (const i in this.dataForm.controls) {
      this.dataForm.controls[i].markAsDirty();
      this.dataForm.controls[i].updateValueAndValidity();      
    }

    if (this.dataForm.valid) {
      if (this.dato && this.dato.descri ) {
        this.editar();
      } else {
        this.insertar();    
      }
      this.tplModalButtonLoading = false;
      modelRef.destroy();      
    } else {
      this.tplModalButtonLoading = false;
    }
  }

  editar() {
    this.dato.descri = this.dataForm.get('descri').value;
    this.dato.valor = this.dataForm.get('valor').value;
    this.dato.unidad = this.dataForm.get('unidad').value;
    this.dato.encargado = this.dataForm.get('encargado').value;
    this.datosService.editDato(this.dato).subscribe((res: any) => {
      if (!res.error) {
        this.toastService.success(res.msg, 2500);
        this.getRegisters();
      }
    }, (err) => {
      console.log(err);
      this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
    });
  }

  insertar() {
    this.dato = this.dataForm.value;  
    this.datosService.newDato(this.dato).subscribe((res: any) => {
      if (!res.error) {
        this.toastService.success(res.msg, 2500);
        this.getRegisters();
      }
    }, (err) => {
      console.log(err);
      this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
    });
  }

  eliminar(cve, name) {
    let cbOK = () => {
      this.datosService.deleteDato(cve).subscribe((res: any) => {
        if (!res.error) {
          this.toastService.success(res.msg, 2500);
          this.getRegisters();
        }
      }, (err) => {
        console.log(err);
        this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
      });
    };
    this.messageService.confirm('¿Deséa eliminar el dato?', '<b>' + name + '</b>', cbOK, () => {});
  }

}
