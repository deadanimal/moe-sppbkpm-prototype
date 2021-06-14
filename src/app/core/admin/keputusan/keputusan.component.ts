import {
  Component,
  OnInit,
  TemplateRef,
  ElementRef,
  ViewChild,
  NgZone,
  OnDestroy,
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";
import { FormGroup } from "@angular/forms";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-keputusan",
  templateUrl: "./keputusan.component.html",
  styleUrls: ["./keputusan.component.scss"],
})
export class KeputusanComponent implements OnInit, OnDestroy {
  // Modal
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };
  // Form
  registerForm: FormGroup;

  //Chart
  private chart1: any;
  private chart2: any;
  private chart3: any;
  private chart4: any;
  private chart5: any;

  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      tahun: "2019",
      negeri: "Selangor",
      tingkatan: "3",
      umur: "15",
      sekolah: "SMKDK",
      matapelajaran: "Bahasa Melayu",
      pemarkahan: "100 (A)",
      status: "lulus",
      nama: "Safuan Ahmad",
      jenis: "SMK",
      markah: "80",
      tarikh: "3/4/2020",
    },
    {
      tahun: "2021",
      negeri: "Pahang",
      tingkatan: "5",
      umur: "17",
      sekolah: "SMKSHK",
      matapelajaran: "Bahasa Inggeris",
      pemarkahan: "75 (B)",
      status: "lulus",
      nama: "Syafiqah Zambri",
      jenis: "SMK",
      markah: "68",
      tarikh: "4/4/2020",
    },
    {
      tahun: "2019",
      negeri: "WP Kuala Lumpur",
      tingkatan: "5",
      umur: "17",
      sekolah: "SMKDK",
      matapelajaran: "Matematik",
      pemarkahan: "10 (E)",
      status: "tidak",
      nama: "Zuehairi Hashim",
      jenis: "SK",
      markah: "97",
      tarikh: "12/4/2020",
    },
    {
      tahun: "2021",
      negeri: "Johor",
      tingkatan: "4",
      umur: "16",
      sekolah: "SM Setapak",
      matapelajaran: "Sains",
      pemarkahan: "100 (A)",
      status: "lulus",
      nama: "Aqilah Mustapha",
      jenis: "SMK",
      markah: "50",
      tarikh: "23/4/2020",
    },
    {
      tahun: "2020",
      negeri: "Kedah",
      tingkatan: "3",
      umur: "15",
      sekolah: "SMKSP",
      matapelajaran: "Bahasa Melayu",
      pemarkahan: "100 (A)",
      status: "lulus",
      nama: "Eren Yegah",
      jenis: "SK",
      markah: "80",
      tarikh: "3/4/2020",
    },
  ];
  SelectionType = SelectionType;

  constructor(private modalService: BsModalService, private zone: NgZone) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(selected);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }

  ngOnInit() {
    this.getCharts();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart1) {
        console.log("Chart disposed");
        this.chart1.dispose();
      }
      if (this.chart2) {
        console.log("Chart disposed");
        this.chart2.dispose();
      }
      if (this.chart3) {
        console.log("Chart disposed");
        this.chart3.dispose();
      }
      if (this.chart4) {
        console.log("Chart disposed");
        this.chart4.dispose();
      }
      if (this.chart5) {
        console.log("Chart disposed");
        this.chart5.dispose();
      }
    });
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChart1();
      this.getChart2();
      this.getChart3();
      this.getChart4();
      // this.getChart5();
    });
  }

  getChart1() {
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("kep1", am4charts.XYChart);
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");

      return series;
    }

    chart.data = [
      {
        category: "2018",
        first: 40,
        second: 55,
        third: 60,
      },
      {
        category: "2019",
        first: 30,
        second: 78,
        third: 69,
      },
      {
        category: "2020",
        first: 27,
        second: 40,
        third: 45,
      },
      {
        category: "2021",
        first: 50,
        second: 33,
        third: 22,
      },
    ];

    createSeries("first", "Peperiksaan Pertengahan Tahun ");
    createSeries("second", "Peperiksaan Akhir Tahun");
    createSeries("third", "Peperiksaan Percubaan UPSR/SPM");

    function arrangeColumns() {
      let series = chart.series.getIndex(0);

      let w =
        1 -
        xAxis.renderer.cellStartLocation -
        (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            } else {
              series.dummyData = chart.series.indexOf(series);
            }
          });
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            series.bulletsContainer.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
          });
        }
      }
    }

    this.chart1 = chart;
  }

  getChart2() {
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("kep2", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        country: "80-100 = A",
        litres: 501.9,
      },
      {
        country: "60-79 = B",
        litres: 301.9,
      },
      {
        country: "40-59 = c",
        litres: 201.1,
      },
      {
        country: "20-39 = D",
        litres: 165.8,
      },
      {
        country: "1-19 = E",
        litres: 139.9,
      },
      {
        country: "0 = TH",
        litres: 128.3,
      },
    ];

    chart.innerRadius = am4core.percent(40);
    chart.depth = 120;

    chart.legend = new am4charts.Legend();

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.depthValue = "litres";
    series.dataFields.category = "country";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;
  }

  getChart3() {
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("kep3", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: "80-100 = A",
        litres: 501.9,
      },
      {
        country: "60-79 = B",
        litres: 301.9,
      },
      {
        country: "40-59 = c",
        litres: 201.1,
      },
      {
        country: "20-39 = D",
        litres: 165.8,
      },
      {
        country: "1-19 = E",
        litres: 139.9,
      },
      {
        country: "0 = TH",
        litres: 128.3,
      },
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
  }

  getChart4() {
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("kep4", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: "80-100 = A",
        litres: 501.9,
      },
      {
        country: "60-79 = B",
        litres: 301.9,
      },
      {
        country: "40-59 = c",
        litres: 201.1,
      },
      {
        country: "20-39 = D",
        litres: 165.8,
      },
      {
        country: "1-19 = E",
        litres: 139.9,
      },
      {
        country: "0 = TH",
        litres: 128.3,
      },
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
  }

  getChart5() {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("kep5", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: "80-100 = A",
        litres: 501.9,
      },
      {
        country: "60-79 = B",
        litres: 301.9,
      },
      {
        country: "40-59 = c",
        litres: 201.1,
      },
      {
        country: "20-39 = D",
        litres: 165.8,
      },
      {
        country: "1-19 = E",
        litres: 139.9,
      },
      {
        country: "0 = TH",
        litres: 128.3,
      },
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);

    this
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.getChart5();
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'modal-lg' });
  }

  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }
 
    this.modalRef.hide();
    this.modalRef = null;
  }
  closeModal(){
    this.modalRef.hide()
    this.registerForm.reset()
  }

  closeModal2(){
    this.modalRef2.hide()
    this.registerForm.reset()
  }
}
