import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { IUser } from '../../../core/models/user.model';
import { UserService } from '../../../core/passport/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { MessageService } from '../../../core/services/message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  listOfData: IUser[] = [];
  copylistOfData; // = [...this.listOfData];
  modalTitle;
  userForm: FormGroup;
  tplModalButtonLoading = false;
  user: IUser;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private messageService: MessageService,
    private modal: NzModalService
  ) { }

  async ngOnInit() {
    // let paso = await this.userService.getUsers();
    // this.listOfData.push(paso);
    // this.copylistOfData = [...this.listOfData];
    this.getUsers();
  }

  async ngAfterViewInit() {
  }

  getUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      this.listOfData = res.data ? res.data : null;
      this.copylistOfData = [...this.listOfData];
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

  userFrm(usua: IUser) {
    this.user = usua;
    
    this.userForm = this.fb.group({
      user: [usua ? usua.usu_logi : null, [Validators.required]],
      pass: [usua ? usua.usu_pass : null, [Validators.required]],
      name: [usua ? usua.usu_nomb : null, [Validators.required]],
      mail: [usua ? usua.usu_mail : null, [Validators.required, Validators.email]]
    });
    usua ? this.userForm.get('user').disable() : this.userForm.get('user').enable();
  }

  userModal(usu: IUser, tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.userFrm(usu);
    
    this.modalTitle = usu ? `Modificar datos de ${usu.usu_logi}` : 'Crear un usuario nuevo.';
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

    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
      this.userForm.controls[i].updateValueAndValidity();      
    }

    if (this.userForm.valid) {
      if (this.user && this.user.usu_logi ) {
        this.editUser();
      } else {
        this.insertUser();    
      }
      this.tplModalButtonLoading = false;
      modelRef.destroy();
      
    } else {
      this.tplModalButtonLoading = false;
    }
  }

  insertUser() {
    this.user = this.userForm.value;
    this.userService.newUser(this.user).subscribe((res: any) => {
      console.log(res);
      this.getUsers();
    }, (err) => {
      console.log(err);
      this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
    });
  }

  editUser() {
    this.user.usu_nomb = this.userForm.get('name').value;
    this.user.usu_pass = this.userForm.get('pass').value;
    this.user.usu_mail = this.userForm.get('mail').value;
    this.userService.editUser(this.user.usu_logi, this.user).subscribe((res: any) => {
      if (!res.error) {
        this.toastService.success(res.msg, 2500);
        this.getUsers();
      }
    }, (err) => {
      console.log(err);
      this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
    });
  }

  deleteUser(id, name) {
    let cbOK = () => {
      this.toastService.success('Se eliminó el usuario seleccionado');
    };
    this.messageService.confirm('¿Deséa eliminar al usuario?', '<b>' + name + '</b>', cbOK, () => {});
  }

}
