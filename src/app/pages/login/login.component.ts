import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { SessionService } from '../../core/services/session.service';
import { ILogin } from '../../core/models/user.model';
import { PassportService } from '../../core/passport/passport.service';
import { ToastService } from '../../core/services/toast.service';
import { RouteStateService } from '../../core/services/route-state.service';
import { TranslateService } from '@ngx-translate/core';
import { ProjectService } from '../../core/system/project.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  anio = new Date().getFullYear();
  version;
  locale;
  validateForm: FormGroup;
  showLangText = false;

  langs = [{
    code: 'es',
    text: 'Español',
    abbr: 'MX'
  }];

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    public translate: TranslateService,
    private passportService: PassportService,
    private toastService: ToastService,
    private routeStateService: RouteStateService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false]
    });
    this.locale = this.sessionService.getItem("language");
    this.version = environment.version;
  }

  async submitForm(): Promise<void> {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      let login: ILogin = await this.passportService.login(this.validateForm.controls['userName'].value, this.validateForm.controls['password'].value);
     
      if (login.user) {
        this.passportService.setUser(login);
        const configured = await this.projectService.configurated();
        // TODO: acá debo sacr la empresa del usuario, por lo pronto sale con PI
        const cia = await this.projectService.getCia();        
        this.passportService.setCia(cia);
        this.routeStateService.add("system", '', null, true);
        return;
      }
      this.toastService.addSingle('error', 'Invalid user.');
      return;       
    }    
    
  }

  open(type: string, openType: any = 'href'): void {
    
  }

  change(lang: string): void {
    // this.showLangText = !this.showLangText;
    this.locale = lang;
    if (this.locale === undefined || this.locale == null || this.locale.length === 0) {
      this.locale = "es";
    }
    this.translate.use(this.locale);
    this.sessionService.setItem("language", this.locale);
  }

}
