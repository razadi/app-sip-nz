import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { ToastService } from '../../../core/services/toast.service';
import { MessageService } from '../../../core/services/message.service';
import { StagesService } from '../../../core/catalogs/stages.service';
import { IStage } from '../../../core/models/catalogs.model';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss']
})
export class StagesComponent implements OnInit {

  listOfData: IStage[] = [];
  copylistOfData;
  dataForm: FormGroup;
  escenario: IStage;
  modalTitle;
  tplModalButtonLoading = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private messageService: MessageService,
    private modal: NzModalService,
    private stageService: StagesService
  ) { }

  ngOnInit(): void {
    this.getRegisters();
  }

  getRegisters() {
    this.stageService.getEscenarios().subscribe((res: any) => {
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

  createForm(escenario: IStage) {
    this.escenario = escenario;
    
    this.dataForm = this.fb.group({
      nombre: [ this.escenario ? this.escenario.nombre : null, [Validators.required]],
      valord: [ this.escenario ? this.escenario.valord : null, [Validators.required]],
      valora: [ this.escenario ? this.escenario.valora : null, [Validators.required]]
    });
  }

  cataModal(escenario: IStage, tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.createForm(escenario);    
    this.modalTitle = escenario ? `Modificar datos del escenario ${escenario.nombre}` : 'Crear un nuevo escenario.';
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
      if (this.escenario && this.escenario.nombre ) {
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
    this.escenario.nombre = this.dataForm.get('nombre').value;
    this.escenario.valord = this.dataForm.get('valord').value;
    this.escenario.valora = this.dataForm.get('valora').value;
    this.stageService.editEscenario(this.escenario).subscribe((res: any) => {
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
    this.escenario = this.dataForm.value;  
    this.stageService.newEscenario(this.escenario).subscribe((res: any) => {
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
      this.stageService.deleteEscenario(cve).subscribe((res: any) => {
        if (!res.error) {
          this.toastService.success(res.msg, 2500);
          this.getRegisters();
        }
      }, (err) => {
        console.log(err);
        this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
      });
    };
    this.messageService.confirm('¿Deséa eliminar el escenario?', '<b>' + name + '</b>', cbOK, () => {});
  }

}
