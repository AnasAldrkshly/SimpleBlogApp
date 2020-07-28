import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

import { NavComponent } from "./nav/nav.component";
import { AlleventsComponent } from "./allevents/allevents.component";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { RequestsComponent } from "./requests/requests.component";

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "allevents", component: AlleventsComponent },
  { path: "admindashboard", component: AdmindashboardComponent },
  { path: "requests", component: RequestsComponent },
  { path: "**", redirectTo: "home", pathMatch: "full" },
];
