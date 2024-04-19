import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/services/user.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    UserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    })
  ],
  providers: [AuthorizedGuard, 
              NotAuthorizedGuard, 
              CoursesService, 
              CoursesStoreService,
              UserService,
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
            ],
  bootstrap: [AppComponent],
})
export class AppModule {}
