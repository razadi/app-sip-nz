import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouteStateService } from '../../../core/services/route-state.service';
import { ICompany } from '../../../core/models/company.model';
import { CompaniesService } from '../../../core/system/companies.service';
import { MessageService } from '../../../core/services/message.service';
import { ProjectService } from '../../../core/system/project.service';
import { PassportService } from '../../../core/passport/passport.service';

@Component({
  selector: 'app-project-company',
  templateUrl: './project-company.component.html',
  styleUrls: ['./project-company.component.scss']
})
export class ProjectCompanyComponent implements OnInit {

  frmCompany: FormGroup;
  company: ICompany;
  configured;
  existenVars;

  constructor(
    private fb: FormBuilder,
    private routeStateService: RouteStateService,
    private companyService: CompaniesService,
    private projectService: ProjectService,
    private messageService: MessageService,
    private passportService: PassportService
  ) { 
    this.frmCompany = this.fb.group({
      name: ['', [Validators.required]],
      project: ['', [Validators.required]],
      period: ['', [Validators.required]],
      goal: ['', [Validators.required]]
    });
  }

  async ngOnInit() {
    this.configured = await this.projectService.configurated();

    // if (this.configured && !this.existenVars) {
    //   this.routeStateService.add("Variables", 'project/variable', null, false);
    // }
  }

  async submitForm(value: { name: string; project: string; period: string; goal: string }) {
    for (const key in this.frmCompany.controls) {
      this.frmCompany.controls[key].markAsDirty();
      this.frmCompany.controls[key].updateValueAndValidity();
    }
    if (this.frmCompany.valid) { 
      this.company = new ICompany();
      this.company.emp_nom = value.name;
      // this.company.project = value.project;
      // this.company.period = value.period;
      // this.company.goal = value.goal;

      this.companyService.newCompany(this.company).subscribe((res: any) => {
        this.company.emp_id = res.clave;
        this.passportService.setCia(this.company);
        this.routeStateService.add("system", '', null, true);
      }, (err) => {
        console.log(err);
        this.messageService.error(`Error: ${err.status} ${err.statusText}`, `${err.message}`);
      });
      
    }

    
  }

}
