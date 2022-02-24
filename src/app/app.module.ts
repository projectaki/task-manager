import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { ProjectsModule } from './projects/projects.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LayoutComponent],
  imports: [BrowserModule, AppRoutingModule, ProjectsModule, HomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
