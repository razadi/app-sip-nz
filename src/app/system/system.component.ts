import { Component, OnInit } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';
import { IUser } from '../core/models/user.model';
import { PassportService } from '../core/passport/passport.service';
import { SessionService } from '../core/services/session.service';
import { RouteStateService } from '../core/services/route-state.service';
import { Router } from '@angular/router';
import { ICompany } from '../core/models/company.model';

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
  anio = new Date().getFullYear();
  menu = [
    {
      title: 'Home',
      icon: 'home',
      link: '/'
    },
    {
      title: 'Planeación y Diseño',
      icon: 'reconciliation',
      child: [
        { title: 'Variables', link: '/planning/variables' }
      ]
    },
    {
      title: 'Tablero',
      icon: 'layout',
      child: [
        { title: 'Tablero', link: '/dashboard' }
      ]
    },
    {
      title: 'Sistema Vigía',
      icon: 'profile',
      child: [
        { title: 'Vigía', link: '/vigilant' }
      ]
    },
    {
      title: 'Catálogos',
      icon: 'folder',
      child: [
        { title: 'Generales', link: '/catalogs/grales' },
        { title: 'Áreas de la empresa', link: '/catalogs/areas' },
        { title: 'Periodos', link: '/catalogs/periods' },
        { title: 'Escenarios', link: '/catalogs/stages' },
        { title: 'Datos', link: '/catalogs/data' },
        { title: 'Usuarios', link: '/catalogs/users' }
      ]
    }
  ];

  constructor(
    private router: Router,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
    private userIdle: UserIdleService,
    private passportService: PassportService
  ) { }

  ngOnInit(): void {
    this.user = this.passportService.user$.getValue();
    this.cia = this.passportService.cia$.getValue();

    // this.userIdle.startWatching();
    // this.userIdle.onTimerStart().subscribe();
    // this.userIdle.onTimeout().subscribe(() => {
    //   this.logout();
    // });
  }

  logout() {
    this.userIdle.stopWatching();
    this.routeStateService.removeAll();
    this.passportService.logout();
    this.sessionService.removeItem('active-menu');
    this.router.navigate(['/login']);
  }

}
