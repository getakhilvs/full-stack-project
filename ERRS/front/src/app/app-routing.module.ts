import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { AdminproductlistComponent } from './components/adminproductlist/adminproductlist.component';
import { EmployeelistComponent } from './components/employeelist/employeelist.component';
import { EmployeeproductsComponent } from './components/employeeproducts/employeeproducts.component';
import { HistoryComponent } from './components/history/history.component';
import { AddpointsComponent } from './components/addpoints/addpoints.component';
import { RecentactivityComponent } from './components/recentactivity/recentactivity.component';
import {  authGuard } from './services/auth-guard.service';
import { EditproductsComponent } from './components/editproducts/editproducts.component';
import { AddachievementsComponent } from './components/addachievements/addachievements.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }, 
  { path: 'editproducts',component:EditproductsComponent},
  { path: 'admin', component: AdminComponent,canActivate:[authGuard],
  
  children: [
    {path:'addproduct',component:AddproductComponent},
    {path:'adminproducts',component:AdminproductlistComponent},
    {path:'employeelist',component:EmployeelistComponent},
    {path:'addpoints',component:AddpointsComponent},
    {path:'recentactivity',component:RecentactivityComponent},
    {path:'addacheivements',component:AddachievementsComponent} 
  ]},


  { path: 'employee', component: EmployeeComponent,canActivate:[authGuard],
  children: [
    {path:'employeeproducts',component:EmployeeproductsComponent},
    {path:'history',component:HistoryComponent} 
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
