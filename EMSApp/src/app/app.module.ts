import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./routes";
import { enableProdMode } from "@angular/core";

/*-----------------*/

import { AuthService } from "./_services/auth.service";
import { FusionChartsModule } from "angular-fusioncharts";
import { jqxDataTableComponent } from "./angular_jqxdatatable";

/*-------------------*/

import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { RequestsComponent } from "./requests/requests.component";
import { AlleventsComponent } from "./allevents/allevents.component";

/*-------------------------------------------------*/

/*-------------------------------------------------*/
// Load FusionCharts
import * as FusionCharts from "fusioncharts";
// Load Charts module
import * as Charts from "fusioncharts/fusioncharts.charts";
// Load fusion theme
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

/*-------------------------------------------------*/

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    NavComponent,
    AlleventsComponent,
    AdmindashboardComponent,
    RequestsComponent,
    jqxDataTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FusionChartsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function getBaseLocation() {
  const paths: string[] = location.pathname.split("/").splice(1, 1);
  const basePath: string = (paths && paths[0]) || "";
  return "/" + basePath;
}
