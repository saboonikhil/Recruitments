import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router' 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ClublistingsComponent } from './clublistings/clublistings.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { QuizComponent } from './quiz/quiz.component';
 
@NgModule({
  declarations: [
    AppComponent,
    DashboardStudentComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    ClublistingsComponent,
    DisclaimerComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    MatCheckboxModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path : '', component: HomeComponent},
      {path : 'login', component: LoginComponent},
      {path : 'dashboard_student', component: DashboardStudentComponent},
      {path : 'clubs/listings', component: ClublistingsComponent},
      {path : 'clubs/:id', component: DisclaimerComponent},
      {path : 'clubs/:id/:domain/attempt', component: QuizComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
