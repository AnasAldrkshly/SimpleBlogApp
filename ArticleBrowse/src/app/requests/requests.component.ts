import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.css"],
})
export class RequestsComponent implements OnInit {
  requests: any;
  student: any;
  request: any;

  title: any;
  content: any;
  cat_id: any;
  tag_id: any;
  artid;
  this_tag;
  created_user_id: any;
  tags;
  tags_data;
  cats;
  cats_data;
  created_at;
  categories: any;
  Art_Cat;
  Art_Tag;
  recievedData;

  constructor(private http: HttpClient, private router: Router) {
    console.log(this.router.getCurrentNavigation().extras);
    this.recievedData = this.router.getCurrentNavigation().extras;
    console.log(this.recievedData);
    this.artid = this.recievedData.id;
    this.title = this.recievedData.Title;
    this.cat_id = this.recievedData.cat_Id;
    this.tag_id = this.recievedData.tag_Id;
    this.created_at = this.recievedData.created_at;
    this.content = this.recievedData.Content;
    console.log(this.recievedData.id);
    console.log(this.recievedData.Title);
    console.log(this.recievedData.cat_Id);
    console.log(this.recievedData.tag_Id);
    console.log(this.recievedData.Content);
    this.getTagById(this.artid);
  }

  ngOnInit() {
    //  this.getEvents();
    this.getCategories();
    this.getTags();
  }

  getTagById(id) {
    this.http.get("http://localhost:8000/tags/" + id).subscribe(
      (response) => {
        this.this_tag = response;
        return (this.this_tag = this.this_tag.data.Tag_Name);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCategories() {
    this.http.get("http://localhost:8000/categories/" + this.cat_id).subscribe(
      (response) => {
        this.categories = response;
        console.log(this.categories);
        this.Art_Cat = this.categories.data.Cat_Name;
        console.log(this.categories.data.Cat_Name);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTags() {
    this.http.get("http://localhost:8000/article_tag/").subscribe(
      (response) => {
        this.tags = response;
        console.log(this.tags);
        this.tags = this.tags.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
