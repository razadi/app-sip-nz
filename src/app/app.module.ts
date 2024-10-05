import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LOCALE_ID } from '@angular/core';

import { LanguageTranslationModule } from './shared/modules/language-translation.module';

import { NzmoduleModule } from './shared/nzmodule/nzmodule.module';
import { NziconsModule } from './shared/nzmodule/nzicons.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserIdleModule } from 'angular-user-idle';
import { AuthGuard } from './core/guard/auth.guard';

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
    {provide: LOCALE_ID, useValue: 'en-US' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
