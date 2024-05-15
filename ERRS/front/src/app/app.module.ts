import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { AdminproductlistComponent } from './components/adminproductlist/adminproductlist.component';
import { EmployeelistComponent } from './components/employeelist/employeelist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { EmployeeproductsComponent } from './components/employeeproducts/employeeproducts.component';
import { HistoryComponent } from './components/history/history.component';
import { AddpointsComponent } from './components/addpoints/addpoints.component';
import { RecentactivityComponent } from './components/recentactivity/recentactivity.component';
import { EditproductsComponent } from './components/editproducts/editproducts.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AddachievementsComponent } from './components/addachievements/addachievements.component';
import{MatSnackBarModule} from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    EmployeeComponent,
    AddproductComponent,
    AdminproductlistComponent,
    EmployeelistComponent,
    EmployeeproductsComponent,
    HistoryComponent,
    AddpointsComponent,
    RecentactivityComponent,
    EditproductsComponent,
    AddachievementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
