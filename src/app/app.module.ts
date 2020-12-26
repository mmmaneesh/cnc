import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule, MatDialogConfig} from '@angular/material/dialog';
import { NgApexchartsModule } from "ng-apexcharts";
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NumberValueAccessor, FormControl } from '@angular/forms';

import { AnthropometryComponent } from './components/anthropometry/anthropometry.component';
import { AppachescoreComponent } from './components/appachescore/appachescore.component';
import { DemographicsComponent } from './components/demographics/demographics.component';
import { NutricscoreComponent } from './components/nutricscore/nutricscore.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { ProteincalorieformComponent } from './components/proteincalorieform/proteincalorieform.component';
import { SofascoreComponent } from './components/sofascore/sofascore.component';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { CreatechecklistComponent } from './components/createchecklist/createchecklist.component';
import { AppacheanalysisComponent } from './components/appacheanalysis/appacheanalysis.component';
import { ReferenceComponent } from './components/reference/reference.component';
import { SofaanalysisComponent } from './components/sofaanalysis/sofaanalysis.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { GaugeChartModule } from 'angular-gauge-chart';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { ViewproductComponent } from './components/viewproduct/viewproduct.component';
import {MatTableModule} from '@angular/material/table';
import { DataServiceService } from "./services/data-service.service";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoginComponent } from './components/login/login.component';
import { InnerloginComponent } from './components/innerlogin/innerlogin.component';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { DietarytemplateeComponent } from './components/dietarytemplatee/dietarytemplatee.component';
import { NursetemplateComponent } from './components/nursetemplate/nursetemplate.component';
import { ProductselectionComponent } from './components/productselection/productselection.component';
import { ProductcombinationComponent } from './components/productcombination/productcombination.component';
import { GoogleChartsModule } from "angular-google-charts";
import { LoginboxedComponent } from './components/loginboxed/loginboxed.component';
import { SofascoreeleoneComponent } from './components/sofascoreeleone/sofascoreeleone.component';
import { SofascoreeletwoComponent } from './components/sofascoreeletwo/sofascoreeletwo.component';
import { NutricpointsComponent } from './components/nutricpoints/nutricpoints.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { QRCodeModule } from 'angular2-qrcode';

import html2canvas from 'html2canvas';
import { AlertcomponentComponent } from './components/alertcomponent/alertcomponent.component';
import { parse } from 'date-fns';
import { AnthropometryabwComponent } from './components/anthropometryabw/anthropometryabw.component';
import { AppacheentrymodeComponent } from './components/appacheentrymode/appacheentrymode.component';
import { AppacheeditmodeComponent } from './components/appacheeditmode/appacheeditmode.component';
import { ScoremeterComponent } from './components/scoremeter/scoremeter.component';






@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    AnthropometryComponent,
    AppachescoreComponent,
    DemographicsComponent,
    NutricscoreComponent,
    PrescriptionComponent,
    ProteincalorieformComponent,
    SofascoreComponent,
    ChecklistComponent,
    CreatechecklistComponent,
    AppacheanalysisComponent,
    ReferenceComponent,
    SofaanalysisComponent,
    CalculatorComponent,
    AddproductComponent,
    EditproductComponent,
    ViewproductComponent,
    LoginComponent,
    InnerloginComponent,
    DietarytemplateeComponent,
    NursetemplateComponent,
    ProductselectionComponent,
    ProductcombinationComponent,
    LoginboxedComponent,
    SofascoreeleoneComponent,
    SofascoreeletwoComponent,
    NutricpointsComponent,
    QrcodeComponent,
    AlertcomponentComponent,
    AnthropometryabwComponent,
    AppacheentrymodeComponent,
    AppacheeditmodeComponent,
    ScoremeterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    NgApexchartsModule,
    HttpClientModule,
    GaugeChartModule,
    MatTableModule,
    FormsModule,
    ToastrModule.forRoot(),
    AngularSvgIconModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    GoogleChartsModule.forRoot(),
    MatProgressSpinnerModule,
    QRCodeModule

    
  ],
  providers: [DataServiceService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [AppachescoreComponent, SofascoreComponent, PrescriptionComponent, DemographicsComponent, AnthropometryComponent,
    NutricscoreComponent, ChecklistComponent, CreatechecklistComponent, AppacheanalysisComponent, ReferenceComponent, SofaanalysisComponent,
    CalculatorComponent,AddproductComponent, EditproductComponent, ViewproductComponent, ProductselectionComponent, ProductcombinationComponent,
  SofascoreeleoneComponent,SofascoreeletwoComponent, NutricpointsComponent, QrcodeComponent, AlertcomponentComponent, AnthropometryabwComponent,
    AppacheentrymodeComponent, AppacheeditmodeComponent
]
})
export class AppModule { }
