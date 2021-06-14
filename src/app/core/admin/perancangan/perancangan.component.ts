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

import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import * as moment from "moment";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FormGroup } from "@angular/forms";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}

@Component({
  selector: "app-perancangan",
  templateUrl: "./perancangan.component.html",
  styleUrls: ["./perancangan.component.scss"],
})
export class PerancanganComponent implements OnInit, OnDestroy {

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered"
  };
  // Form
  registerForm: FormGroup

  private chart1: any;

  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      jenis: "PPT",
      peringkat: "Pra-sekolah",
      tarikh: "1/6/2021",
      negeri: "Selangor",
    },
    {
      jenis: "PAT",
      peringkat: "SK",
      tarikh: "3/11/2020",
      negeri: "WP Kuala Lumpur",
    },
    {
      jenis: "UPSR",
      peringkat: "SK",
      tarikh: "5/11/2020",
      negeri: "Melaka",
    },
    {
      jenis: "PT3",
      peringkat: "SMK",
      tarikh: "16/10/2020",
      negeri: "Perak",
    },
    {
      jenis: "SPM",
      peringkat: "SBP",
      tarikh: "26/11/2020",
      negeri: "Pahang",
    },
    {
      jenis: "PPT",
      peringkat: "Pra-sekolah",
      tarikh: "1/6/2021",
      negeri: "Kelantan",
    },
    {
      jenis: "SPM",
      peringkat: "SMK",
      tarikh: "3/11/2020",
      negeri: "Johor",
    },
    {
      jenis: "PAT",
      peringkat: "SK",
      tarikh: "7/10/2020",
      negeri: "Terengganu",
    },
    {
      jenis: "SPM",
      peringkat: "SMK",
      tarikh: "16/10/2020",
      negeri: "Selangor",
    },
    {
      jenis: "SPM",
      peringkat: "SBP",
      tarikh: "26/11/2020",
      negeri: "Kedah",
    },
  ];
  SelectionType = SelectionType;

  addModal: BsModalRef;
  editModal: BsModalRef;
  @ViewChild("modalAdd") modalAdd: ElementRef;
  @ViewChild("modalEdit") modalEdit: ElementRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered modal-secondary"
  };
  radios = "bg-danger";
  eventTitle = undefined;
  eventDescription;
  eventId;
  event;
  startDate;
  endDate;
  calendar;
  today = new Date();
  y = this.today.getFullYear();
  m = this.today.getMonth();
  d = this.today.getDate();
  events = [
    {
      id: 0,
      title: "Lunch meeting",
      start: "2018-11-21",
      end: "2018-11-22",
      className: "bg-orange"
    },
    {
      id: 1,
      title: "Call with Dave",
      start: new Date(this.y, this.m, 1),
      allDay: true,
      className: "bg-red",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 2,
      title: "Lunch meeting",
      start: new Date(this.y, this.m, this.d - 1, 10, 30),
      allDay: true,
      className: "bg-orange",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 3,
      title: "All day conference",
      start: new Date(this.y, this.m, this.d + 7, 12, 0),
      allDay: true,
      className: "bg-green",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 4,
      title: "Meeting with Mary",
      start: new Date(this.y, this.m, this.d - 2),
      allDay: true,
      className: "bg-blue",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 5,
      title: "Winter Hackaton",
      start: new Date(this.y, this.m, this.d + 1, 19, 0),
      allDay: true,
      className: "bg-red",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 6,
      title: "Digital event",
      start: new Date(this.y, this.m, 21),
      allDay: true,
      className: "bg-warning",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 7,
      title: "Marketing event",
      start: new Date(this.y, this.m, 21),
      allDay: true,
      className: "bg-purple",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 8,
      title: "Dinner with Family",
      start: new Date(this.y, this.m, 19),
      allDay: true,
      className: "bg-red",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 9,
      title: "Black Friday",
      start: new Date(this.y, this.m, 23),
      allDay: true,
      className: "bg-blue",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 10,
      title: "Cyber Week",
      start: new Date(this.y, this.m, 2),
      allDay: true,
      className: "bg-yellow",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    }
  ];

  constructor(private modalService: BsModalService, private zone: NgZone) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {
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

  changeView(newView) {
    this.calendar.changeView(newView);

    currentDate: this.calendar.view.title;
  }

  ngOnInit() {
    var mYear = moment().format("YYYY");
    var mDay = moment().format("dddd, MMM D");
    document.getElementsByClassName(
      "widget-calendar-year"
    )[0].innerHTML = mYear;
    document.getElementsByClassName("widget-calendar-day")[0].innerHTML = mDay;
    this.initCalendar();
    this.getCharts();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart1) {
        console.log("Chart disposed");
        this.chart1.dispose();
      }
    });
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChart1();
    });
  }

  getChart1() {
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("per1", am4charts.RadarChart);

    // Add data
    chart.data = [
      {
        category: "Peperiksaan Pertengahan Tahun (PPT)",
        value: 80,
        full: 100,
      },
      {
        category: "Peperiksaan Akhir Tahun (PAT)",
        value: 35,
        full: 100,
      },
      {
        category: "Peperiksaan Percubaan UPSR/SPM",
        value: 68,
        full: 100,
      },
    ];

    // Make chart not full circle
    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(20);

    // Set number format
    chart.numberFormatter.numberFormat = "#.#'%'";

    // Create axes
    let categoryAxis = chart.yAxes.push(
      new am4charts.CategoryAxis<am4charts.AxisRendererRadial>()
    );
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    // categoryAxis.renderer.labels.template.fontWeight = 500;
    categoryAxis.renderer.labels.template.adapter.add(
      "fill",
      function (fill, target) {
        return target.dataItem.index >= 0
          ? chart.colors.getIndex(target.dataItem.index)
          : fill;
      }
    );
    categoryAxis.renderer.minGridDistance = 10;

    let valueAxis = chart.xAxes.push(
      new am4charts.ValueAxis<am4charts.AxisRendererCircular>()
    );
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;

    // Create series
    let series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = "full";
    series1.dataFields.categoryY = "category";
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );

    series1.columns.template.fillOpacity = 0.08;
    // series1.columns.template.cornerRadiusTopLeft = 20;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    let series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = "value";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Add cursor
    chart.cursor = new am4charts.RadarCursor();
  }

  initCalendar() {
    this.calendar = new Calendar(document.getElementById("calendar"), {
      plugins: [interaction, dayGridPlugin],
      defaultView: "dayGridWeek",
      selectable: true,
      editable: true,
      events: this.events,
      views: {
        month: {
          titleFormat: { month: "long", year: "numeric" }
        },
        agendaWeek: {
          titleFormat: { month: "long", year: "numeric", day: "numeric" }
        },
        agendaDay: {
          titleFormat: { month: "short", year: "numeric", day: "numeric" }
        }
      },
      // Add new event
      select: info => {
        this.addModal = this.modalService.show(this.modalAdd, this.default);
        this.startDate = info.startStr;
        this.endDate = info.endStr;
      },
      // Edit calendar event action
      eventClick: ({ event }) => {
        this.eventId = event.id;
        this.eventTitle = event.title;
        this.eventDescription = event.extendedProps.description;
        this.radios = "bg-danger";
        this.event = event;
        this.editModal = this.modalService.show(this.modalEdit, this.default);
      }
    });
    this.calendar.render();
  }
  getNewEventTitle(e) {
    this.eventTitle = e.target.value;
  }
  getNewEventDescription(e) {
    this.eventDescription = e.target.value;
  }
  addNewEvent() {
    this.events.push({
      title: this.eventTitle,
      start: this.startDate,
      end: this.endDate,
      className: this.radios,
      id: this.events.length
    });
    this.calendar.addEvent({
      title: this.eventTitle,
      start: this.startDate,
      end: this.endDate,
      className: this.radios,
      id: this.events.length
    });
    this.addModal.hide();
    this.radios = "bg-danger";
    (this.eventTitle = undefined),
      (this.eventDescription = undefined),
      (this.eventId = undefined),
      (this.event = undefined);
  }
  deleteEventSweetAlert() {
    this.editModal.hide();
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        cancelButtonClass: "btn btn-secondary",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false
      })
      .then(result => {
        if (result.value) {
          this.events = this.events.filter(
            prop => prop.id + "" !== this.eventId
          );
          this.initCalendar();
          swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            type: "success",
            confirmButtonClass: "btn btn-primary",
            buttonsStyling: false
          });
        }
      });
    this.radios = "bg-danger";
    (this.eventTitle = undefined),
      (this.eventDescription = undefined),
      (this.eventId = undefined),
      (this.event = undefined);
  }
  updateEvent() {
    this.events = this.events.map((prop, key) => {
      if (prop.id + "" === this.eventId + "") {
        return {
          ...prop,
          title: this.eventTitle,
          className: this.radios,
          description: this.eventDescription
        };
      } else {
        return prop;
      }
    });
    this.radios = "bg-danger";
    (this.eventTitle = undefined),
      (this.eventDescription = undefined),
      (this.eventId = undefined),
      (this.event = undefined);
    this.initCalendar();
    this.editModal.hide();
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
    this.registerForm.reset()
  }

  confirm() {
    swal.fire({
      title: "Pengesahan",
      text: "Sah untuk meneruskan aktiviti?",
      type: "info",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Sah",
      showCancelButton: true,
      cancelButtonClass: "btn btn-danger",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.value) {
        this.register()
      }
    })
  }

  register() {
    swal.fire({
      title: "Berjaya",
      text: "Data berjaya disimpan",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Tutup"
    }).then((result) => {
      if (result.value) {
        this.modal.hide()
        this.registerForm.reset()
      }
    })
  }

  delete() {
    swal.fire({
      title: "Pengesahan",
      text: "Sah untuk meneruskan aktiviti?",
      type: "warning",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-danger",
      confirmButtonText: "Sah",
      showCancelButton: true,
      cancelButtonClass: "btn btn-info",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.value) {
        this.cdelete()
      }
    })
  }

  cdelete() {
    swal.fire({
      title: "Berjaya",
      text: "Data berjaya dibuang",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Tutup"
    }).then((result) => {
      if (result.value) {
        this.modal.hide()
        this.registerForm.reset()
      }
    })
  }
}
