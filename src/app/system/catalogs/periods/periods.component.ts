import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { ToastService } from '../../../core/services/toast.service';
import { MessageService } from '../../../core/services/message.service';
import { PassportService } from '../../../core/passport/passport.service';
import { PeriodsService } from '../../../core/catalogs/periods.service';
import { IPeriod } from '../../../core/models/catalogs.model';
import { ICompany } from '../../../core/models/company.model';

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss']
})
export class PeriodsComponent implements OnInit {

  listOfData: IPeriod[] = [];
  copylistOfData;
  dataForm: FormGroup;
  emp: ICompany;
  periodo: IPeriod;
  modalTitle;
  tplModalButtonLoading = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private messageService: MessageService,
    private modal: NzModalService,
    private passportService: PassportService,
    private periodsService: PeriodsService
  ) { }

  ngOnInit(): void {
    this.emp = this.passportService.cia$.getValue();

    this.getRegisters();
  }

  getRegisters() {
    this.periodsService.getPeriodos(this.emp.clave).subscribe((res: any) => {
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

  createForm(periodo: IPeriod) {
    this.periodo = periodo;
    
    this.dataForm = this.fb.group({
      period: [ this.periodo ? this.periodo.period : null, [Validators.required]],
      begin: [ this.periodo ? this.periodo.begin : null, [Validators.required]],
      end: [ this.periodo ? this.periodo.end : null, [Validators.required]]
    });
  }

  cataModal(periodo: IPeriod, tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.createForm(periodo);    
    this.modalTitle = periodo ? `Modificar datos del periodo ${periodo.period}` : 'Crear un nuevo periodo.';
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
      if (this.periodo && this.periodo.period ) {
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
    this.periodo.period = this.dataForm.get('period').value;
    this.periodo.begin = this.dataForm.get('begin').value;
    this.periodo.end = this.dataForm.get('end').value;
    this.periodsService.editPeriodo(this.periodo).subscribe((res: any) => {
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
    this.periodo = this.dataForm.value;
    this.periodo.emp = this.emp.clave;    
    this.periodsService.newPeriodo(this.periodo).subscribe((res: any) => {
      if (!res.error) {
        this.toastService.success(res.msg, 2500);
        this.getRegisters();
      }
    }, (err) => {
      console.log(err);
      this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
    });
  }

  eliminar(emp, cve, name) {
    let cbOK = () => {
      this.periodsService.deletePeriodo(emp, cve).subscribe((res: any) => {
        if (!res.error) {
          this.toastService.success(res.msg, 2500);
          this.getRegisters();
        }
      }, (err) => {
        console.log(err);
        this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
      });
    };
    this.messageService.confirm('¿Deséa eliminar el periodo?', '<b>' + name + '</b>', cbOK, () => {});
  }

}
