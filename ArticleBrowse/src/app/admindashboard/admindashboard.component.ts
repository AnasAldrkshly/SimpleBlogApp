import { Component, OnInit, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-admindashboard",
  templateUrl: "./admindashboard.component.html",
  styleUrls: ["./admindashboard.component.css"],
})
export class AdmindashboardComponent implements OnInit {
  chartConfig: Object;
  students: any;
  dataSource: any;
  dataSource2: any;
  dataSource3: any;
  dataSource4: any;
  selectedSlice = "none";
  chart: any;

  data: any[];
  obje: object;
  obje2: object;
  obje3: object;

  vobj = { label: "Age", value: 0 };
  fobj = { label: 0, value: 0 };
  fobj2 = { label: 0, value: 0 };

  gdata: any[];
  gobje: object;
  gobje2: object;
  gobje3: object;

  gvobj = { label: "Gender", value: 0 };
  gfobj = { label: 0, value: 0 };
  gfobj2 = { label: 0, value: 0 };

  udata: any[];
  uobje: object;
  uobje2: object;
  uobje3: object;

  uvobj = { label: "Uni", value: 0 };
  ufobj = { label: 0, value: 0 };
  ufobj2 = { label: 0, value: 0 };

  evdata: any[];
  evobje: object;
  evobje2: object;
  evobje3: object;

  evvobj = { label: "Eve", value: 0 };
  evfobj = { label: 0, value: 0 };
  evfobj2 = { label: 0, value: 0 };

  Obj = {
    data: [],
  };

  Obj2 = {
    chart: {
      caption: "Distribution of Editors' per Articles ",
      plottooltext: "<b>$percentValue</b> of Article written by auther $label  ",
      showLegend: "1",
      showPercentValues: "1",
      legendPosition: "bottom",
      useDataPlotColorForLabels: "1",
      enablemultislicing: "0",
      showlegend: "0",
      theme: "fusion",
    },
    data: [],
  };

  gObj = {
    data: [],
  };

  
  UniObj = {
    data: [],
  };

  UniObj2 = {
    chart: {
      caption: "",
      subCaption: "",
      showLegend: "1",
      showPercentValues: "1",
      legendPosition: "bottom",
      useDataPlotColorForLabels: "1",
      enablemultislicing: "0",
      showlegend: "0",
      theme: "fusion",
    },
    data: [],
  };

  EvObj = {
    data: [],
  };

  EvObj2 = {
    chart: {
      caption: "Distribution of Articles on Categories",
      subCaption: "# of Articles per Category",
      showLegend: "1",
      showPercentValues: "1",
      legendPosition: "bottom",
      useDataPlotColorForLabels: "1",
      enablemultislicing: "0",
      showlegend: "0",
      theme: "fusion",
    },
    data: [],
  };

  EvObj3 = {
    data: [],
  };

  constructor(private zone: NgZone, private http: HttpClient) {
    this.chartConfig = {
      width: "700",
      height: "400",
      type: "column2d",
      dataFormat: "json",
    };
  }

  cats: any;

  ngOnInit() {
    this.http.get("http://localhost:8000/categories").subscribe(
      (response) => {
        this.cats = response;
        this.cats = this.cats.data;
      },
      (error) => {
        console.log(error);
      }
    );

    /*------------------------------------------------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------Articles---------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------------*/

    this.http.get("http://localhost:8000/articles").subscribe(
      (response) => {
        this.dataSource = response;
        this.dataSource = this.dataSource.data;
        this.Obj["data"].push(this.dataSource.data);
        console.log(this.Obj);
        console.log(JSON.stringify(response));
        console.log(this.dataSource);
        // console.log(this.dataSource.);
        console.log(this.dataSource[1].created_user_id);

        var counts = {};
        var v1;
        var count1;
        var cont;

        for (var i = 0; i < this.dataSource.length; i++) {
          v1 = this.dataSource[i].created_user_id;
          cont = 0;
          if (i > 0) {
            for (var q = 0; q < this.Obj2["data"].length; q++) {
              if (this.Obj2["data"][q].label == v1) {
                console.log(this.Obj2["data"][q].label);
                cont = 1;
                break;
              } else {
                console.log(this.Obj2["data"][q].label);
                cont = 0;
              }
            }
          }
          if (cont === 1) {
            continue;
          } else {
            count1 = 0;
            console.log(v1);
            for (var j = 0; j < this.dataSource.length; j++) {
              if (this.dataSource[j].created_user_id === v1) {
                console.log(v1);
                count1 = count1 + 1;
              }
            }
            this.fobj["label"] = v1;
            this.fobj["value"] = count1;
            this.Obj2["data"].push(JSON.parse(JSON.stringify(this.fobj)));
            console.log(this.fobj);
            console.log(this.fobj2);
            console.log(this.Obj2["data"]);
          }
        }
        console.log(this.Obj2);
      },
      (error) => {
        console.log(error);
      }
    );

    /*------------------------------------------------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------Categories-------------------------------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------------*/

    this.http.get("http://localhost:8000/articles").subscribe(
      (response3) => {
        this.dataSource3 = response3;
        this.dataSource3 = this.dataSource3.data;
        this.EvObj["data"].push(this.dataSource3);
        console.log(this.EvObj);
        console.log(JSON.stringify(response3));
        console.log(this.dataSource3);

        // var counts = {};
        var v3;
        var count3;
        var cont3;
        var label3;

        for (var i = 0; i < this.dataSource3.length; i++) {
          console.log(this.dataSource3[i].cat_Id);
          v3 = this.dataSource3[i].cat_Id;
          label3 = this.cats[v3 - 1].Cat_Name;
          console.log(v3);
          console.log(this.cats);
          console.log(this.cats[v3 - 1]);
          console.log(this.cats[v3 - 1].Cat_Name);
          cont3 = 0;
          if (i > 0) {
            for (var q = 0; q < this.EvObj3["data"].length; q++) {
              if (this.EvObj3["data"][q].label == label3) {
                //   console.log(this.EvObj3["data"][q].label);
                cont3 = 1;
                break;
              } else {
                //     console.log(this.EvObj3["data"][q].label);
                cont3 = 0;
              }
            }
          }
          if (cont3 === 1) {
            continue;
          } else {
            count3 = 0;
            console.log(v3);
            for (var j = 0; j < this.dataSource3.length; j++) {
              if (this.dataSource3[j].cat_Id === v3) {
                console.log(this.dataSource3);
                console.log(this.dataSource3.length);
                console.log(v3);
                count3 = count3 + 1;
              }
            }
            console.log(count3);
            console.log(v3);
            console.log(this.cats);
            console.log(this.cats[v3 - 1]);
            console.log(this.cats[v3 - 1].Cat_Name);

            this.evfobj["label"] = this.cats[v3 - 1].Cat_Name;
            this.evfobj["value"] = count3;
            this.evfobj2["label"] = this.dataSource3[i].cat_Id;
            this.evfobj2["value"] = count3;
            this.evfobj2 = JSON.parse(JSON.stringify(this.evfobj));
            this.EvObj2["data"].push(JSON.parse(JSON.stringify(this.evfobj)));
            this.EvObj3["data"].push(JSON.parse(JSON.stringify(this.evfobj2)));
            console.log(this.EvObj2["data"]);
            console.log(this.EvObj3["data"]);
          }
        }
        console.log(this.EvObj2);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // FusionCharts initialized listener to get the chart instance
  initialized($event) {
    this.chart = $event.chart; // saving chart instance
  }

  // Change listener for radio buttons
  onRadioOptionChange(option) {
    this.selectedSlice = option;
    // For each data element , see if it is selected, if none then slice in all elements
    this.dataSource.data.forEach((d, index) => {
      if (option == "none") {
        this.chart.slicePlotItem(index, false);
      } else if (option === d.label.toLowerCase()) {
        this.chart.slicePlotItem(index, true);
      }
    });
  }

  // Get data item label
  getLabel(index) {
    return this.dataSource.data[index].label;
  }

  // FusionCharts Component dataPlot click listener
  dataplotClick($event) {
    let dataIndex = $event.dataObj.dataIndex;
    let isSliced = $event.dataObj.isSliced;
    this.zone.run(() => {
      this.selectedSlice = isSliced
        ? "none"
        : this.getLabel(dataIndex).toLowerCase();
    });
  }
}
