import {
  Component,
  OnInit,
  TemplateRef,
  ElementRef,
  ViewChild,
  NgZone,
  OnDestroy,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-jenis-pentaksiran",
  templateUrl: "./jenis-pentaksiran.component.html",
  styleUrls: ["./jenis-pentaksiran.component.scss"],
})
export class JenisPentaksiranComponent implements OnInit, OnDestroy {
  private chart1: any;
  private chart2: any;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };
  // Form
  registerForm: FormGroup;

  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      idsekolah: "SMKDK1",
      jenis: "PPT",
      peringkat: "Pra-sekolah",
      tarikh: "1/6/2021",
      negeri: "Selangor",
    },
    {
      idsekolah: "SKDK1",
      jenis: "PAT",
      peringkat: "SK",
      tarikh: "3/11/2020",
      negeri: "WP Kuala Lumpur",
    },
    {
      idsekolah: "SKDK5",
      jenis: "UPSR",
      peringkat: "SK",
      tarikh: "5/11/2020",
      negeri: "Melaka",
    },
    {
      idsekolah: "SMKDK3",
      jenis: "PT3",
      peringkat: "SMK",
      tarikh: "16/10/2020",
      negeri: "Perak",
    },
    {
      idsekolah: "SMKDK4",
      jenis: "SPM",
      peringkat: "SBP",
      tarikh: "26/11/2020",
      negeri: "Pahang",
    },
    {
      idsekolah: "SKDK2",
      jenis: "PPT",
      peringkat: "Pra-sekolah",
      tarikh: "1/6/2021",
      negeri: "Kelantan",
    },
    {
      idsekolah: "SMKDK5",
      jenis: "SPM",
      peringkat: "SMK",
      tarikh: "3/11/2020",
      negeri: "Johor",
    },
    {
      idsekolah: "SKDK3",
      jenis: "PAT",
      peringkat: "SK",
      tarikh: "7/10/2020",
      negeri: "Terengganu",
    },
    {
      idsekolah: "SMKDK6",
      jenis: "SPM",
      peringkat: "SMK",
      tarikh: "16/10/2020",
      negeri: "Selangor",
    },
    {
      idsekolah: "SMKDK7",
      jenis: "SPM",
      peringkat: "SBP",
      tarikh: "26/11/2020",
      negeri: "Kedah",
    },
  ];
  SelectionType = SelectionType;

  entries1: number = 5;
  selected1: any[] = [];
  temp1 = [];
  activeRow1: any;
  rows1: any = [
    {
      guru: "G19",
      nama: "Azizah binti Zakaria",
      sekola: "SMK Seri Hartamas",
      jenis: "Sekolah Menengah Kebangsaan ",
      tarikh: "1/6/2021",
      negeri: "Selangor",
    },
    {
      guru: "G212",
      nama: "Harris Saifullah bin Ahmad",
      sekola: "SK Damansara",
      jenis: "Sekolah Rendah Kebangsaan ",
      tarikh: "5/2/2021",
      negeri: "WP Kuala Lumpur",
    },
    {
      guru: "G34",
      nama: "Nur Kamaliah binti Abdullah",
      sekola: "SMK Jalan 16",
      jenis: "Sekolah Menengah Kebangsaan ",
      tarikh: "1/4/2021",
      negeri: "Pahang",
    },
    {
      guru: "G431",
      nama: "Lee Jia Hao",
      sekola: "SMK Sri Bayu",
      jenis: "Sekolah Menengah Kebangsaan ",
      tarikh: "9/10/2021",
      negeri: "Selangor",
    },
    {
      guru: "G165",
      nama: "Wang Zhifu Ping",
      sekola: "SK Jalan 6",
      jenis: "Sekolah Rendah Kebangsaan ",
      tarikh: "26/1/2021",
      negeri: "Melaka",
    },
    {
      guru: "G78",
      nama: "Karim bin Sabtu",
      sekola: "SMK Kota Rawang",
      jenis: "Sekolah Menengah Kebangsaan ",
      tarikh: "1/10/2020",
      negeri: "Terengganu",
    },
    {
      guru: "G1",
      nama: "Barney Stinson",
      sekola: "SMK Bandar Baru Keramat",
      jenis: "Sekolah Menengah Kebangsaan ",
      tarikh: "12/6/2020",
      negeri: "Johor",
    },
    {
      guru: "G323",
      nama: "Surendran A/L Kumar",
      sekola: "SK Kampung 48",
      jenis: "Sekolah Rendah Kebangsaan ",
      tarikh: "2/8/2021",
      negeri: "Selangor",
    },
    {
      guru: "G98",
      nama: "Badrul Hisyam bin Saifullah",
      sekola: "SK Batu 16",
      jenis: "Sekolah Rendah Kebangsaan ",
      tarikh: "30/6/2021",
      negeri: "Pulau Pinang",
    },
    {
      guru: "G877",
      nama: "Aira Sofea binti Mohd Faris",
      sekola: "SMK Tun Teja",
      jenis: "Sekolah Menengah Kebangsaan ",
      tarikh: "21/3/2021",
      negeri: "Selangor",
    },
    {
      guru: "G90",
      nama: "Amy Santiago",
      sekola: "SMK Presint 21",
      jenis: "Sekolah Menengah Kebangsaan ",
      tarikh: "9/12/2021",
      negeri: "WP Putrajaya",
    },
  ];
  SelectionType1 = SelectionType;

  constructor(private modalService: BsModalService, private zone: NgZone) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
    this.temp1 = this.rows1.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  entriesChange1($event) {
    this.entries1 = $event.target.value;
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
  filterTable1($event) {
    let val = $event.target.value;
    this.temp1 = this.rows1.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }, { selected1 }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(selected);
  }
  onSelect1({ selected1 }) {
    this.selected1.splice(0, this.selected1.length);
    this.selected1.push(selected1);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }
  onActivate1(event) {
    this.activeRow1 = event.row1;
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, { class: "modal-xl" });
  }

  closeModal() {
    this.modal.hide();
    this.registerForm.reset();
  }

  confirm() {
    swal
      .fire({
        title: "Pengesahan",
        text: "Sah untuk meneruskan aktiviti?",
        type: "info",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Sah",
        showCancelButton: true,
        cancelButtonClass: "btn btn-danger",
        cancelButtonText: "Batal",
      })
      .then((result) => {
        if (result.value) {
          this.register();
        }
      });
  }

  register() {
    swal
      .fire({
        title: "Berjaya",
        text: "Data berjaya disimpan",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Tutup",
      })
      .then((result) => {
        if (result.value) {
          this.modal.hide();
          this.registerForm.reset();
        }
      });
  }

  ngOnInit() {
    this.getCharts();
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChart1();
      this.getChart2();
    });
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
    });
  }

  getChart1() {
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("jp1", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: "Peperiksaan Sekolah",
        litres: 501.9,
      },
      {
        country: "PBD",
        litres: 301.9,
      },
      {
        country: "Standard Kecergasan Fizikal",
        litres: 201.1,
      },
      {
        country: "Ppsi",
        litres: 165.8,
      },
      {
        country: "JQAF",
        litres: 139.9,
      },
      {
        country: "KKQ",
        litres: 128.3,
      },
      {
        country: "Prasekolah",
        litres: 99,
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

  getChart2() {
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("jp2", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "network";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "network";
    series.dataFields.valueX = "MAU";
    series.tooltipText = "{valueX.value}";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.dx = 10;
    labelBullet.label.text =
      "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.locationX = 1;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
    chart.data = [
      {
        network: "Tingkatan 5",
        MAU: 2255250000,
      },
      {
        network: "Tingkatan 4",
        MAU: 430000000,
      },
      {
        network: "Tingkatan 3",
        MAU: 1000000000,
      },
      {
        network: "Tingkatan 2",
        MAU: 246500000,
      },
      {
        network: "Tingkatan 1",
        MAU: 355000000,
      },
      {
        network: "Tahun 1",
        MAU: 500000000,
      },
      {
        network: "Tahun 2",
        MAU: 624000000,
      },
      {
        network: "Tahun 3",
        MAU: 329500000,
      },
      {
        network: "Tahun 4",
        MAU: 1000000000,
      },
      {
        network: "Tahun 5",
        MAU: 431000000,
      },
      {
        network: "Tahun 6",
        MAU: 1433333333,
      },
    ];
  }
}
