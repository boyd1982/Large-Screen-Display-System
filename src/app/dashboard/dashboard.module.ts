import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule} from './dashboard-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { WeatherComponent } from './weather/weather.component';
import { ReservoirComponent } from './reservoir/reservoir.component';
import { HighwayComponent } from './highway/highway.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { StaffComponent } from './staff/staff.component';
import { MaterialComponent } from './material/material.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatapanelComponent } from './datapanel/datapanel.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxEchartsModule,
    NgbModule,
    NgxDatatableModule,
    HttpClientModule
  ],

  declarations: [OverviewComponent, WeatherComponent, ReservoirComponent, HighwayComponent, EquipmentComponent, StaffComponent, MaterialComponent, DatapanelComponent]
})
export class DashboardModule { }
