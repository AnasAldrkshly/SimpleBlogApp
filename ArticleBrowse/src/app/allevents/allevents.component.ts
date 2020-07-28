import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-allevents",
  templateUrl: "./allevents.component.html",
  styleUrls: ["./allevents.component.css"],
})
export class AlleventsComponent implements OnInit {
  articles: any;
  requests: any;
  va = 0;
  categories: any;
  tags: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getArticles();
    this.getCategories();
    this.getTags();
  }

  getArticles() {
    this.http.get("http://localhost:8000/articles").subscribe(
      (response) => {
        this.articles = response;
        this.articles = this.articles.data;
      },
      (error) => {
        console.log(error);
      }
    );

    /*this.http.get('https://localhost:44357/api/Student_Event').subscribe(response => {this.requests = response; }, error => {
      console.log(error);
    } );*/
  }

  getCategories() {
    this.http.get("http://localhost:8000/categories/").subscribe(
      (response) => {
        this.categories = response;
        console.log(this.categories);
        this.categories = this.categories.data;
      },
      (error) => {
        console.log(error);
      }
    );

    // this.category = this.category.data.Cat_Name
  }

  getTags() {
    this.http.get("http://localhost:8000/tags/").subscribe(
      (response) => {
        this.tags = response;
        console.log(this.tags);
        this.tags = this.tags.data;
      },
      (error) => {
        console.log(error);
      }
    );

    // this.category = this.category.data.Cat_Name
  }

  goToDetails(id) {
    this.router.navigate(["/requests"], id);
  }

  /*getRequests() {
    this.http.get('https://localhost:44357/api/Student_Event').subscribe(response => {this.requests = response; }, error => {
      console.log(error);
    } );
  }*/

  /* filterRequestsOfEvent(E_ID){
    return this.requests.filter(x => x.data.event_Id === E_ID);
  }*/

  /*postRequest( v_id,  v_student_Id,  v_event_Id ,  v_requestStatus) {
    this.http.post<any>('https://localhost:44357/api/Student_Event', {
      // id: v_id,
      student_Id: v_student_Id,
      event_Id: v_event_Id,
      requestStatus: v_requestStatus
  }).subscribe(data => {
        'id' ;
        'student_Id';
        'event_Id';
        'requestStatus';
    });
  }*/
  //    this.Id = data.id;
}
