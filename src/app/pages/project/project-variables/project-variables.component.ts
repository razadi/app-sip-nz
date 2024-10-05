import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { MessageService } from '../../../core/services/message.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { RouteStateService } from '../../../core/services/route-state.service';
import { IVariable } from '../../../core/models/variable.model';
import { VariablesService } from '../../../core/system/variables.service';
import { PassportService } from '../../../core/passport/passport.service';
import { ProjectService } from '../../../core/system/project.service';

@Component({
  selector: 'app-project-variables',
  templateUrl: './project-variables.component.html',
  styleUrls: ['./project-variables.component.scss']
})
export class ProjectVariablesComponent implements OnInit {

  listOfData: IVariable[] = [];
  copylistOfData;
  varForm: FormGroup;
  modalTitle;
  tplModalButtonLoading = false;
  variable: IVariable;
  emp: any;
  existenVars;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private messageService: MessageService,
    private routeStateService: RouteStateService,
    private variableService: VariablesService,
    private passportservice: PassportService,
    private projectService: ProjectService,
    private modal: NzModalService
  ) { }

  async ngOnInit() {
    this.emp = this.passportservice.cia$.getValue();   
    this.existenVars = await this.projectService.existsVars();
    if (this.existenVars) {
      this.routeStateService.add("system", '', null, true);
    }
    this.getVars();
  }

  getVars() {
    this.variableService.getVariables(this.emp.clave, 'principal').subscribe((res: any) => {
      console.log(res);
      
      this.listOfData = res.data ? res.data : null;
      if (this.listOfData !== null) {
        this.copylistOfData = [...this.listOfData];
      }
    });
  }

  search(search){
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

  varFrm(vari: IVariable) {
    this.variable = vari;
    
    this.varForm = this.fb.group({
      // emp: [ this.variable ? this.variable.emp : null, [Validators.required]],
      name: [ this.variable ? this.variable.name : null, [Validators.required]],
      descri: [ this.variable ? this.variable.descri : null, [Validators.required]]
    });
    // usua ? this.varForm.get('user').disable() : this.varForm.get('user').enable();
  }

  varModal(vari: IVariable, tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.varFrm(vari);
    
    this.modalTitle = vari ? `Modificar datos de ${vari.name}` : 'Crear una variable nueva.';
    this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        value: ''
      },
      nzOnOk: () => console.log('Click ok')
    });
  }

  async acceptModel(modelRef: NzModalRef) {
    this.tplModalButtonLoading = true;

    for (const i in this.varForm.controls) {
      this.varForm.controls[i].markAsDirty();
      this.varForm.controls[i].updateValueAndValidity();      
    }

    if (this.varForm.valid) {
      console.log(this.variable);
      
      if (this.variable) {
        this.editVar();
      } else {
        this.insertVar();    
      }
      this.tplModalButtonLoading = false;
      modelRef.destroy();
      
    } else {
      this.tplModalButtonLoading = false;
    }
  }

  insertVar() {
    this.variable = this.varForm.value;
    this.variable.emp = this.emp.clave;
    this.variable.nivel = 0;
    this.variable.prin = 1;

    console.log(this.variable);
    
    this.variableService.newVariable(this.variable).subscribe((res: any) => {
      this.toastService.success('Se agregó la variable', 2000);
      this.getVars();
    }, (err) => {
      console.log(err);
      this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
    });
  }

  editVar() {
    // this.variable.emp = this.varForm.get('emp').value;
    this.variable.name = this.varForm.get('name').value;
    this.variable.descri = this.varForm.get('descri').value;
    this.variableService.editVariable(this.variable).subscribe((res: any) => {
      if (!res.error) {
        this.toastService.success(res.msg, 2500);
        this.getVars();
      }
    }, (err) => {
      console.log(err);
      this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
    });
  }

  deleteVar(emp, cve, name) {
    let cbOK = () => {
      this.toastService.success('Se eliminó la variable seleccionada');
    };
    this.messageService.confirm('¿Deséa eliminar la variable?', '<b>' + name + '</b>', cbOK, () => {});
  }

  enterSystem() {
    this.routeStateService.add("project", 'project/company', null, true);
  }

}
