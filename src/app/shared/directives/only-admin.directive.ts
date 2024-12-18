import { Directive, AfterViewInit, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { IUser } from '../../core/models/user.model';
import { PassportService } from '../../core/passport/passport.service';

@Directive({
  selector: '[onlyAdmin]'
})
export class OnlyAdminDirective implements AfterViewInit {
  
  @Input() onlyAdmin: any[] = [];

  user: IUser

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>,
    private passportService: PassportService
  ) {
    this.user = this.passportService.user$.getValue();
  }

  ngAfterViewInit() {
    // console.log(this.user.usu_nive);
    
    if(this.onlyAdmin.includes(this.user.usu_nive)) {
      console.log('si');
      
      this.view.createEmbeddedView(this.template);
    } else {
      console.log('no');
      
      this.view.clear();
    }
  }

}
