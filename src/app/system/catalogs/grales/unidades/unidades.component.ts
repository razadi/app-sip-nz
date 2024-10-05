import { Component, OnInit, TemplateRef } from '@angular/core';
import { IUnidad } from '../../../../core/models/catalogs.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { MessageService } from '../../../../core/services/message.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { CatalogsService } from '../../../../core/catalogs/catalogs.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit {

  listOfData: IUnidad[] = [];
  copylistOfData;
  dataForm: FormGroup;
  unidad: IUnidad;
  modalTitle;
  tplModalButtonLoading = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private messageService: MessageService,
    private modal: NzModalService,
    private catalogsService: CatalogsService
  ) { }

  ngOnInit(): void {
    this.getRegisters();
  }

  getRegisters() {
    this.catalogsService.getUnidades().subscribe((res: any) => {
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

  createForm(unidad: IUnidad) {
    this.unidad = unidad;
    
    this.dataForm = this.fb.group({
      descri: [ this.unidad ? this.unidad.descri : null, [Validators.required]],
      corto: [ this.unidad ? this.unidad.corto : null, [Validators.required]],
      s1: [ this.unidad ? this.unidad.s1 : null, []],
      v1: [ this.unidad ? this.unidad.v1 : null, []],
      s2: [ this.unidad ? this.unidad.s2 : null, []],
      v2: [ this.unidad ? this.unidad.v2 : null, []],
      s3: [ this.unidad ? this.unidad.s3 : null, []],
      v3: [ this.unidad ? this.unidad.v3 : null, []],
      s4: [ this.unidad ? this.unidad.s4 : null, []],
      v4: [ this.unidad ? this.unidad.v4 : null, []],
      s5: [ this.unidad ? this.unidad.s5 : null, []],
      v5: [ this.unidad ? this.unidad.v5 : null, []],
      s6: [ this.unidad ? this.unidad.s6 : null, []],
      v6: [ this.unidad ? this.unidad.v6 : null, []]
    });
  }

  cataModal(unidad: IUnidad, tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.createForm(unidad);    
    this.modalTitle = unidad ? `Modificar datos de la unidad ${unidad.descri}` : 'Crear una nueva unidad.';
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
      if (this.unidad && this.unidad.descri ) {
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
    this.unidad.descri = this.dataForm.get('descri').value;
    this.unidad.corto = this.dataForm.get('corto').value;
    this.unidad.s1 = this.dataForm.get('s1').value;
    this.unidad.v1 = this.dataForm.get('v1').value;
    this.unidad.s2 = this.dataForm.get('s2').value;
    this.unidad.v2 = this.dataForm.get('v2').value;
    this.unidad.s3 = this.dataForm.get('s3').value;
    this.unidad.v3 = this.dataForm.get('v3').value;
    this.unidad.s4 = this.dataForm.get('s4').value;
    this.unidad.v4 = this.dataForm.get('v4').value;
    this.unidad.s5 = this.dataForm.get('s5').value;
    this.unidad.v5 = this.dataForm.get('v5').value;
    this.unidad.s6 = this.dataForm.get('s6').value;
    this.unidad.v6 = this.dataForm.get('v6').value;


    this.catalogsService.editUnidad(this.unidad).subscribe((res: any) => {
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
    this.unidad = this.dataForm.value;  
    this.catalogsService.newUnidad(this.unidad).subscribe((res: any) => {
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
      this.catalogsService.deleteUnidad(cve).subscribe((res: any) => {
        if (!res.error) {
          this.toastService.success(res.msg, 2500);
          this.getRegisters();
        }
      }, (err) => {
        console.log(err);
        this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
      });
    };
    this.messageService.confirm('¿Deséa eliminar la unidad?', '<b>' + name + '</b>', cbOK, () => {});
  }

}
