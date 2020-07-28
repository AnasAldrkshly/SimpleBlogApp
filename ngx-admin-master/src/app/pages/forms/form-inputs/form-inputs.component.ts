import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { StudentService } from "./StudentService";
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
  selector: "ngx-form-inputs",
  styleUrls: ["./form-inputs.component.scss"],
  templateUrl: "./form-inputs.component.html",
})
export class FormInputsComponent {
  imageUrl = null;
  photo: Blob;
  title: any;
  content: any;
  cat_id: any;
  tag_id: any;
  created_user_id: any;
  a: any;
  tags;
  tags_data;
  cats;
  cats_data;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _service: StudentService,
    public _DomSanitizationService: DomSanitizer,
    private toastrService: NbToastrService
  ) {
    console.log(this.router.getCurrentNavigation().extras);
    this.recievedData = this.router.getCurrentNavigation().extras;
    console.log(this.recievedData);
    this.title = this.recievedData.id;
    console.log(this.recievedData.id);
  }
  // private route: ActivatedRoute
  recievedData: any;
  /*-------------------------------------------*/
  setPhoto(event) {
    this.photo = event.target.files[0];
  }

  onClickSubmit() {
    const fd = new FormData();
    fd.append("stphoto", this.photo);
    this._service.postImage(fd).subscribe((res) =>
    this.showToast('success','Image Upload', 'Image Uploaded Successfully'))
  }

  // showImage() {
  //   this._service.getImage().subscribe((res) => {
  //     this.photo = res;
  //     var myReader: FileReader = new FileReader();
  //     myReader.onloadend = (e) => {
  //       this.imageUrl = this._DomSanitizationService.bypassSecurityTrustUrl(
  //         <string>myReader.result
  //       );
  //     };
  //     myReader.readAsDataURL(this.photo);
  //   });
  // }

  /*---------------------------------------------*/
  ngOnInit() {
    this.a = true;
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
  }

  someImage;

  ngGetImage() {
    this.a = true;
    this.http.get("http://localhost:8000/images/_3-512.png").subscribe(
      (response) => {
        this.someImage = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitArticle(): any {
    let bodyObj = {};
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    (bodyObj = {
      title: this.title,
      content: this.content,
      cat_id: this.cat_id,
      tag_id: this.tag_id,
      created_user_id: 3,
    }),
      console.log("ASDF");
    this.http.post("http://localhost:8000/articles/", bodyObj).subscribe(
      (response) => {
        console.log(response);
        this.showToast('success','Article Submit', 'Article Submitted successfully');
        this. onClickSubmit() ;
        this.router.navigate(['pages/tables/articles-table'])
      },
      (error) => {
        console.log(error);
      }
    );
  }

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
