import { Component, OnInit, TemplateRef } from '@angular/core';
import { IFactor } from '../../../../core/models/catalogs.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { MessageService } from '../../../../core/services/message.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { CatalogsService } from '../../../../core/catalogs/catalogs.service';

@Component({
  selector: 'app-factores',
  templateUrl: './factores.component.html',
  styleUrls: ['./factores.component.scss']
})
export class FactoresComponent implements OnInit {

  listOfData: IFactor[] = [];
  copylistOfData;
  dataForm: FormGroup;
  factor: IFactor;
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
    this.catalogsService.getFactores().subscribe((res: any) => {
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

  createForm(factor: IFactor) {
    this.factor = factor;
    
    this.dataForm = this.fb.group({
      descripcion: [ this.factor ? this.factor.descripcion : null, [Validators.required]],
      factor: [ this.factor ? this.factor.factor : null, [Validators.required]]
    });
  }

  cataModal(factor: IFactor, tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.createForm(factor);    
    this.modalTitle = factor ? `Modificar datos del factor ${factor.descripcion}` : 'Crear un nuevo factor.';
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
      if (this.factor && this.factor.descripcion ) {
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
    this.factor.descripcion = this.dataForm.get('descripcion').value;
    this.factor.factor = this.dataForm.get('factor').value;

    this.catalogsService.editFactor(this.factor).subscribe((res: any) => {
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
    this.factor = this.dataForm.value;  
    this.catalogsService.newFactor(this.factor).subscribe((res: any) => {
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
      this.catalogsService.deleteFactor(cve).subscribe((res: any) => {
        if (!res.error) {
          this.toastService.success(res.msg, 2500);
          this.getRegisters();
        }
      }, (err) => {
        console.log(err);
        this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
      });
    };
    this.messageService.confirm('¿Deséa eliminar la factor?', '<b>' + name + '</b>', cbOK, () => {});
  }

}
