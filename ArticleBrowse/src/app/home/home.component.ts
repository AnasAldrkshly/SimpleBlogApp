import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  goToDash() {
    window.location.href = "http://localhost:4200/pages/tables/articles-table";
    
  }

  goToForm() {
    this.router.navigateByUrl("/allevents");
  }
}
