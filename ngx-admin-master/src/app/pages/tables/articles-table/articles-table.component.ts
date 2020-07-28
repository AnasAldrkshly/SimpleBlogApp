import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from "@nebular/theme";

@Component({
  selector: "ngx-articles-table",
  templateUrl: "./articles-table.component.html",
  styleUrls: ["./articles-table.component.scss"],
})
export class ArticlesTableComponent {
  art_settings = {
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
    },
    columns: {
      id: {
        title: "ID",
        type: "number",
      },
      Title: {
        title: "Title",
        type: "string",
      },

      cat_Id: {
        title: "Category",
        type: "string",
        valuePrepareFunction: (value) => {
          return this.cats_data[value - 1].Cat_Name;
        },
      },
      tag_Id: {
        title: "Tag",
        type: "string",
        valuePrepareFunction: (value) => {
          return this.tags_data[value - 1].Tag_Name;
        },
      },
    },
  };

  arts;
  arts_data;

  cats;
  cats_data;

  tags;
  tags_data;

  data_sent;

  constructor(
    private http: HttpClient,
    private router: Router,
    public _DomSanitizationService: DomSanitizer,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.http.get("http://localhost:8000/articles").subscribe(
      (response) => {
        this.arts = response;
        this.arts_data = this.arts.data;
        console.log(this.arts_data);
      },
      (error) => {
        console.log(error);
      }
    );

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

  getCatById(id) {
    var Vdata;
    var catName;
    this.http.get("http://localhost:8000/categories/" + id).subscribe(
      (response) => {
        console.log(response);
        Vdata = response;
        console.log(Vdata.data.Cat_Name);
        return Vdata.data.Cat_Name;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /*-------------------------------------------------------------------------------------------*/
  onCreateArtConfirm($event) {
    this.showToast("info", "Article Create", "Please Create your aticle here");
    this.router.navigate(["pages/forms/inputs"]);
  }

  onDeleteArtConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve(
        console.log(event),
        this.http
          .delete("http://localhost:8000/articles/" + event.data.id)
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

  /*----------------------------*/
  onUserRowSelect(event): void {
    console.log(event.data);
    console.log("AAAAA");
    this.data_sent = event.data;
    this.router.navigate(["pages/forms/edit"], this.data_sent);
  }

  /*----------------------------*/

  onEditArtConfirm(event): void {
    this.showToast("info", "Article Edit", "Cant Edit Article now");
  }

  /*----------------------------*/

  /*----------------------------------------------------*/

  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = "success";

  t_title = "HI there!";
  t_content = `I'm cool toaster!`;

  types: NbComponentStatus[] = [
    "primary",
    "success",
    "info",
    "warning",
    "danger",
  ];

  positions: string[] = [
    NbGlobalPhysicalPosition.TOP_RIGHT,
    NbGlobalPhysicalPosition.TOP_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    NbGlobalLogicalPosition.TOP_END,
    NbGlobalLogicalPosition.TOP_START,
    NbGlobalLogicalPosition.BOTTOM_END,
    NbGlobalLogicalPosition.BOTTOM_START,
  ];

  quotes = [
    { title: null, body: "We rock at Angular" },
    { title: null, body: "Titles are not always needed" },
    { title: null, body: "Toastr rock!" },
  ];

  makeToast() {
    this.showToast(this.status, this.t_title, this.t_content);
  }

  openRandomToast() {
    const typeIndex = Math.floor(Math.random() * this.types.length);
    const quoteIndex = Math.floor(Math.random() * this.quotes.length);
    const type = this.types[typeIndex];
    const quote = this.quotes[quoteIndex];

    this.showToast(type, quote.title, quote.body);
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : "";
    this.index += 1;
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
