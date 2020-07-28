import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./smart-table.component.html",
  styleUrls: ["./smart-table.component.scss"],
})
export class SmartTableComponent {
  cat_settings = {
    mode: "inline",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: "ID",
        type: "number",
      },
      Cat_Name: {
        title: "Ctegory",
        type: "string",
      },
    },
  };

  /*------------------------*/

  tag_settings = {
    mode: "inline",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: "ID",
        type: "number",
      },
      Tag_Name: {
        title: "Tag",
        type: "string",
      },
    },
  };

  /*---------------------------------------------*/

  cats;
  cats_data;

  tags;
  tags_data;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("http://localhost:8000/categories").subscribe(
      (response) => {
        this.cats = response;
        this.cats_data = this.cats.data;
        console.log(this.cats_data);
      },
      (error) => {
        console.log(error);
      }
    );

    this.http.get("http://localhost:8000/tags").subscribe(
      (response) => {
        this.tags = response;
        this.tags_data = this.tags.data;
        console.log(this.tags_data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /*------------------------------------------Categories------------------------------------------*/

  onDeleteCatConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve(
        console.log(event),
        this.http
          .delete("http://localhost:8000/categories/" + event.data.id)
          .subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          )
      );
    } else {
      event.confirm.reject();
    }
  }
  onEditCatConfirm(event): void {
    let bodyObj = {};
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    console.log("AAAAA");
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve(
        console.log(event),

        console.log(event.newData.Cat_Name),
        (bodyObj = {
          cat_name: event.newData.Cat_Name,
        }),
        this.http
          .put("http://localhost:8000/categories/" + event.data.id, bodyObj)
          .subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          )
      );
    } else {
      event.confirm.reject();
    }
  }
  onCreateCatConfirm(event): void {
    let bodyObj = {};
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    console.log("BBBBB");
    if (window.confirm("Are you sure you want to create?")) {
      event.confirm.resolve(
        console.log(event),

        console.log(event.newData.Cat_Name),
        (bodyObj = {
          cat_name: event.newData.Cat_Name,
        }),
        this.http.post("http://localhost:8000/categories/", bodyObj).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        )
      );
    } else {
      event.confirm.reject();
    }
  }

  /*------------------------------------------Tags------------------------------------------*/

  onDeleteTagConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve(
        console.log(event),
        this.http
          .delete("http://localhost:8000/tags/" + event.data.id)
          .subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          )
      );
    } else {
      event.confirm.reject();
    }
  }

  onEditTagConfirm(event): void {
    let bodyObj = {};
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    console.log("AAAAA");
    if (window.confirm("Are you sure you want to Save?")) {
      event.confirm.resolve(
        console.log(event),

        console.log(event.newData.Tag_Name),
        (bodyObj = {
          tag_name: event.newData.Tag_Name,
        }),
        this.http
          .put("http://localhost:8000/tags/" + event.data.id, bodyObj)
          .subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          )
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateTagConfirm(event): void {
    let bodyObj = {};
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    console.log("BBBBB");
    if (window.confirm("Are you sure you want to create?")) {
      event.confirm.resolve(
        console.log(event),

        console.log(event.newData.Tag_Name),
        (bodyObj = {
          tag_name: event.newData.Tag_Name,
        }),
        this.http.post("http://localhost:8000/tags/", bodyObj).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        )
      );
    } else {
      event.confirm.reject();
    }
  }
}
