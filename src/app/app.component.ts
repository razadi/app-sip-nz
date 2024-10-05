import { Component, OnInit } from '@angular/core';
import { SessionService } from './core/services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'sip';
  showLoader: boolean;
  theme: string;

  constructor(
    private loaderService: LoaderService,
    private sessionService: SessionService,
    private translate: TranslateService
  ) {
    // let theme = this.sessionService.getItem("selected-theme");
    // if (theme != null && theme.length > 0) {
    //   this.theme = theme;
    //   this.themeService.selectTheme(theme);
    // } else {
    //   this.theme = "theme-teal";
    // }

    this.translate.setDefaultLang('es');
    const language = this.sessionService.getItem("language");
    if (language != null && language.length > 0) {
      this.translate.use(language);
    } else {
      this.sessionService.setItem("language", "es");
    }
  }

  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });

    // this.themeService.theme.subscribe((val: string) => {
    //   this.theme = val;
    // });
  }

  ngOnDestroy(): void {
    // this.themeService.theme.observers.forEach(function(element) { element.complete(); });
    this.loaderService.status.observers.forEach(function(element) { element.complete(); });
  }
    
}
