import { Component, OnInit, TemplateRef } from '@angular/core';
import { INivel } from '../../../../core/models/catalogs.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { MessageService } from '../../../../core/services/message.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { CatalogsService } from '../../../../core/catalogs/catalogs.service';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.scss']
})
export class NivelesComponent implements OnInit {

  listOfData: INivel[] = [];
  copylistOfData;
  dataForm: FormGroup;
  nivel: INivel;
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
    this.catalogsService.getNiveles().subscribe((res: any) => {
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

  createForm(nivel: INivel) {
    this.nivel = nivel;
    
    this.dataForm = this.fb.group({
      name: [ this.nivel ? this.nivel.name : null, [Validators.required]]
    });
  }

  cataModal(nivel: INivel, tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.createForm(nivel);    
    this.modalTitle = nivel ? `Modificar datos del nivel ${nivel.name}` : 'Crear un nuevo nivel.';
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
      if (this.nivel && this.nivel.name ) {
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
    this.nivel.name = this.dataForm.get('name').value;

    this.catalogsService.editNivel(this.nivel).subscribe((res: any) => {
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
    this.nivel = this.dataForm.value;  
    this.catalogsService.newNivel(this.nivel).subscribe((res: any) => {
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
      this.catalogsService.deleteNivel(cve).subscribe((res: any) => {
        if (!res.error) {
          this.toastService.success(res.msg, 2500);
          this.getRegisters();
        }
      }, (err) => {
        console.log(err);
        this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
      });
    };
    this.messageService.confirm('¿Deséa eliminar el nivel?', '<b>' + name + '</b>', cbOK, () => {});
  }

}
