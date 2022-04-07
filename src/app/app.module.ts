import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthConfigModule } from './auth/auth-config.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AttachTokenInterceptor } from './auth/attach-token.interceptor';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LayoutComponent],
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    AuthConfigModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AttachTokenInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
