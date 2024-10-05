import { Component, OnInit } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';
import { IUser } from '../core/models/user.model';
import { PassportService } from '../core/passport/passport.service';
import { SessionService } from '../core/services/session.service';
import { RouteStateService } from '../core/services/route-state.service';
import { ActivationEnd, Router } from '@angular/router';
import { ICompany } from '../core/models/company.model';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  user: IUser;
  cia: ICompany;

  inputValue;
  isCollapsed = false;
  label = '';
  anio = new Date().getFullYear();
  menus: any[] = [];
  // varEditorModal: NzModalRef;
  lap = 0;

  constructor(
    private router: Router,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
    private userIdle: UserIdleService,
    private passportService: PassportService
  ) { }

  async ngOnInit() {
    this.user = this.passportService.user$.getValue();
    this.cia = this.passportService.cia$.getValue();

    this.getDataRoute().subscribe((data: any) => {
      this.label = data.titulo;
    });

    this.menus = await this.passportService.getMenu(this.user.usu_nive, this.cia.emp_id);
    const accesos = await this.passportService.getAcceso(this.user.usu_logi);
    this.passportService.setAcceso(accesos);
  }

  getDataRoute() {
    return this.router.events.pipe(
        filter(evento => evento instanceof ActivationEnd),
        filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
        map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }

  logout() {
    this.userIdle.stopWatching();
    this.routeStateService.removeAll();
    this.passportService.logout();
    this.sessionService.removeItem('active-menu');
    this.router.navigate(['/login']);
  }

}
