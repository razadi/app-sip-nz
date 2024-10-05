import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NzmoduleModule } from '../shared/nzmodule/nzmodule.module';
import { NziconsModule } from '../shared/nzmodule/nzicons.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    NzmoduleModule,
    NziconsModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ContentComponent
  ]
})
export class LayoutModule { }
