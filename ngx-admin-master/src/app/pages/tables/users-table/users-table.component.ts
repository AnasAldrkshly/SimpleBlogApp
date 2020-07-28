import { Component } from "@angular/core";
// import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from "@angular/common/http";
// import { Observable } from 'rxjs/Observable';

// import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: "ngx-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.scss"],
})
export class UsersTableComponent {
  user_settings = {
    mode: "inline",
    // actions:{add: true, edit: true, delete:true},
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
      username: {
        title: "User Name",
        type: "string",
      },
      role_id: {
        title: "Role",
        type: "number",
        valuePrepareFunction: (value) => {
          // example of value.... value = 1543105073896
          // value is timeStamp
          if (value == 1) return "Administrator";
          if (value == 2) return "Editor";
          if (value == 3) return "User";
          // return moment(value).format('DD/MM/YYYY');
        },
      },
      email: {
        title: "Email",
        type: "string",
      },
    },
  };

  /*---------------------------------------*/
  role_settings = {
    mode: "inline",
    // actions:{add: true, edit: true, delete:true},
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
      role_name: {
        title: "Role Name",
        type: "string",
      },
    },
  };

  users;
  users_data;

  roles;
  roles_data;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("http://localhost:8000/users").subscribe(
      (response) => {
        this.users = response;
        this.users_data = this.users.data;
        console.log(this.users_data);
      },
      (error) => {
        console.log(error);
      }
    );

    this.http.get("http://localhost:8000/roles").subscribe(
      (response) => {
        this.roles = response;
        this.roles_data = this.roles.data;
        console.log(this.roles_data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /*------------------------------------------USERS------------------------------------------*/
  onDeleteUserConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve(
        console.log(event),
        this.http
          .delete("http://localhost:8000/users/" + event.data.id)
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
  onEditUserConfirm(event): void {
    let bodyObj = {};
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    console.log("AAAAA");
    if (window.confirm("Are you sure you want to Save?")) {
      event.confirm.resolve(
        console.log(event),

        console.log(event.newData.username),
        (bodyObj = {
          username: event.newData.username,
          role_id: event.newData.role_id,
          email: event.newData.email,
        }),
        this.http
          .put("http://localhost:8000/users/" + event.data.id, bodyObj)
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
  onCreateUserConfirm(event): void {
    let bodyObj = {};
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    console.log("BBBBB");
    if (window.confirm("Are you sure you want to create?")) {
      event.confirm.resolve(
        console.log(event),
        console.log(event.newData.username),
        (bodyObj = {
          username: event.newData.username,
          role_id: event.newData.role_id,
          email: event.newData.email,
        }),
        this.http.post("http://localhost:8000/users/", bodyObj).subscribe(
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

  /*----------------------------------------ROLES--------------------------------------------*/

  onDeleteRoleConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve(
        console.log(event),
        this.http
          .delete("http://localhost:8000/roles/" + event.data.id)
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

  onEditRoleConfirm(event): void {
    let bodyObj = {};
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    console.log("AAAAA");
    if (window.confirm("Are you sure you want to Save?")) {
      event.confirm.resolve(
        console.log(event),

        console.log(event.newData.role_name),
        (bodyObj = {
          role_name: event.newData.role_name,
        }),
        this.http
          .put("http://localhost:8000/roles/" + event.data.id, bodyObj)
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
  onCreateRoleConfirm(event): void {
    let bodyObj = {};
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    console.log("BBBBB");
    if (window.confirm("Are you sure you want to create?")) {
      event.confirm.resolve(
        console.log(event),
        console.log(event.newData.role_name),
        (bodyObj = {
          role_name: event.newData.role_name,
        }),
        this.http.post("http://localhost:8000/roles/", bodyObj).subscribe(
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
