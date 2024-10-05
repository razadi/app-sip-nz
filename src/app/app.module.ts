import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LOCALE_ID } from '@angular/core';

import { LanguageTranslationModule } from './shared/modules/language-translation.module';

import { NzmoduleModule } from './shared/nzmodule/nzmodule.module';
import { NziconsModule } from './shared/nzmodule/nzicons.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserIdleModule } from 'angular-user-idle';
import { AuthGuard } from './core/guard/auth.guard';
import { HttpAuthInterceptor } from './core/interceptors/http-auth.interceptor';
// import { HttpErrorsInterceptor } from './core/interceptors/http-errors.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LanguageTranslationModule,
    AppRoutingModule,
    UserIdleModule.forRoot({ idle: 300, timeout: 1, ping: null }),
    NzmoduleModule,
    NziconsModule
  ],
  providers: [
    NzMessageService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'en-US' }
    // {provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
