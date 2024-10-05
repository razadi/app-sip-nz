import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassportService } from '../../../core/passport/passport.service';
import { AreasService } from '../../../core/catalogs/areas.service';
import { ToastService } from '../../../core/services/toast.service';
import { MessageService } from '../../../core/services/message.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { IArea } from '../../../core/models/catalogs.model';
import { ICompany } from '../../../core/models/company.model';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  listOfData: IArea[] = [];
  copylistOfData;
  dataForm: FormGroup;
  emp: ICompany;
  area: IArea;
  modalTitle;
  tplModalButtonLoading = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private messageService: MessageService,
    private modal: NzModalService,
    private passportService: PassportService,
    private areasService: AreasService
  ) { }

  ngOnInit(): void {
    this.emp = this.passportService.cia$.getValue();

    this.getAreas();
  }

  getAreas() {
    this.areasService.getAreas(this.emp.clave).subscribe((res: any) => {
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

  createForm(area: IArea) {
    this.area = area;
    
    this.dataForm = this.fb.group({
      name: [ this.area ? this.area.name : null, [Validators.required]],
      owner: [ this.area ? this.area.owner : null, [Validators.required]]
    });
  }

  cataModal(area: IArea, tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.createForm(area);    
    this.modalTitle = area ? `Modificar datos del ${area.name}` : 'Crear una área nueva.';
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
      if (this.area && this.area.name ) {
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
    this.area.name = this.dataForm.get('name').value;
    this.area.owner = this.dataForm.get('owner').value;
    this.areasService.editArea(this.area).subscribe((res: any) => {
      if (!res.error) {
        this.toastService.success(res.msg, 2500);
        this.getAreas();
      }
    }, (err) => {
      console.log(err);
      this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
    });
  }

  insertar() {
    this.area = this.dataForm.value;
    this.area.emp = this.emp.clave;    
    this.areasService.newArea(this.area).subscribe((res: any) => {
      if (!res.error) {
        this.toastService.success(res.msg, 2500);
        this.getAreas();
      }
    }, (err) => {
      console.log(err);
      this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
    });
  }

  eliminar(emp, cve, name) {
    let cbOK = () => {
      this.areasService.deleteArea(emp, cve).subscribe((res: any) => {
        if (!res.error) {
          this.toastService.success(res.msg, 2500);
          this.getAreas();
        }
      }, (err) => {
        console.log(err);
        this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
      });
    };
    this.messageService.confirm('¿Deséa eliminar el área?', '<b>' + name + '</b>', cbOK, () => {});
  }

}
