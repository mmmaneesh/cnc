import { NursetemplateComponent } from './components/nursetemplate/nursetemplate.component';
import { LoginboxedComponent } from './components/loginboxed/loginboxed.component';
import { DietarytemplateeComponent } from './components/dietarytemplatee/dietarytemplatee.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'dietary', component:DietarytemplateeComponent},
  {path: 'nurses', component:NursetemplateComponent},
  {path: 'loginboxed/:id', component:LoginboxedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
