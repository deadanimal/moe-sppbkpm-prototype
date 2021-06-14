import { AfterViewInit, Component, NgZone, OnInit, TemplateRef } from "@angular/core";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import * as moment from "moment";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, AfterViewInit {
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

  constructor(private zone: NgZone, private modalService: BsModalService) {}

  ngOnInit() {
    this.getCharts();
    var mYear = moment().format("YYYY");
    var mDay = moment().format("dddd, MMM D");
    document.getElementsByClassName("widget-calendar-year")[0].innerHTML =
      mYear;
    document.getElementsByClassName("widget-calendar-day")[0].innerHTML = mDay;
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

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, { class: "modal-xl" });
  }

  closeModal() {
    this.modal.hide();
    this.registerForm.reset();
  }

  getChart1() {
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    /**
     * Chart design taken from Samsung health app
     */

    let chart = am4core.create("dashuser1", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingBottom = 30;

    chart.data = [
      {
        name: "Monica",
        steps: 45688,
        href: "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg",
      },
      {
        name: "Joey",
        steps: 35781,
        href: "https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg",
      },
      {
        name: "Ross",
        steps: 25464,
        href: "https://www.amcharts.com/wp-content/uploads/2019/04/ross.jpg",
      },
      {
        name: "Phoebe",
        steps: 18788,
        href: "https://www.amcharts.com/wp-content/uploads/2019/04/phoebe.jpg",
      },
      {
        name: "Rachel",
        steps: 15465,
        href: "https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg",
      },
      {
        name: "Chandler",
        steps: 11561,
        href: "https://www.amcharts.com/wp-content/uploads/2019/04/chandler.jpg",
      },
    ];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.dy = 35;
    categoryAxis.renderer.tooltip.dy = 35;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.fillOpacity = 0.3;
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.baseGrid.strokeOpacity = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "steps";
    series.dataFields.categoryX = "name";
    series.tooltipText = "{valueY.value}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.dy = -6;
    series.columnsContainer.zIndex = 100;

    let columnTemplate = series.columns.template;
    columnTemplate.width = am4core.percent(50);
    columnTemplate.maxWidth = 66;
    columnTemplate.column.cornerRadius(60, 60, 10, 10);
    columnTemplate.strokeOpacity = 0;

    series.heatRules.push({
      target: columnTemplate,
      property: "fill",
      dataField: "valueY",
      min: am4core.color("#e5dc36"),
      max: am4core.color("#5faa46"),
    });
    series.mainContainer.mask = undefined;

    let cursor = new am4charts.XYCursor();
    chart.cursor = cursor;
    cursor.lineX.disabled = true;
    cursor.lineY.disabled = true;
    cursor.behavior = "none";

    let bullet = columnTemplate.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 30;
    bullet.valign = "bottom";
    bullet.align = "center";
    bullet.isMeasured = true;
    bullet.verticalCenter = "bottom";
    bullet.interactionsEnabled = false;

    let hoverState = bullet.states.create("hover");
    let outlineCircle = bullet.createChild(am4core.Circle);
    outlineCircle.adapter.add("radius", function (radius, target) {
      let circleBullet = target.parent as any;
      return circleBullet.circle.pixelRadius + 10;
    });

    let image = bullet.createChild(am4core.Image);
    image.width = 60;
    image.height = 60;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
    image.propertyFields.href = "href";

    image.adapter.add("mask", function (mask, target) {
      let circleBullet = target.parent as any;
      return circleBullet.circle;
    });

    let previousBullet;
    chart.cursor.events.on("cursorpositionchanged", function (event) {
      let dataItem = series.tooltipDataItem as any;

      if (dataItem.column) {
        let bullet = dataItem.column.children.getIndex(1);

        if (previousBullet && previousBullet != bullet) {
          previousBullet.isHover = false;
        }

        if (previousBullet != bullet) {
          let hs = bullet.states.getKey("hover");
          hs.properties.dy = -bullet.parent.pixelHeight + 30;
          bullet.isHover = true;

          previousBullet = bullet;
        }
      }
    });
  }

  getChart2() {
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("dashuser2", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        region: "Central",
        state: "North Dakota",
        sales: 920,
      },
      {
        region: "Central",
        state: "South Dakota",
        sales: 1317,
      },
      {
        region: "Central",
        state: "Kansas",
        sales: 2916,
      },
      {
        region: "Central",
        state: "Iowa",
        sales: 4577,
      },
      {
        region: "Central",
        state: "Nebraska",
        sales: 7464,
      },
      {
        region: "Central",
        state: "Oklahoma",
        sales: 19686,
      },
      {
        region: "Central",
        state: "Missouri",
        sales: 22207,
      },
      {
        region: "Central",
        state: "Minnesota",
        sales: 29865,
      },
      {
        region: "Central",
        state: "Wisconsin",
        sales: 32125,
      },
      {
        region: "Central",
        state: "Indiana",
        sales: 53549,
      },
      {
        region: "Central",
        state: "Michigan",
        sales: 76281,
      },
      {
        region: "Central",
        state: "Illinois",
        sales: 80162,
      },
      {
        region: "Central",
        state: "Texas",
        sales: 170187,
      },
      {
        region: "East",
        state: "West Virginia",
        sales: 1209,
      },
      {
        region: "East",
        state: "Maine",
        sales: 1270,
      },
      {
        region: "East",
        state: "District of Columbia",
        sales: 2866,
      },
      {
        region: "East",
        state: "New Hampshire",
        sales: 7294,
      },
      {
        region: "East",
        state: "Vermont",
        sales: 8929,
      },
      {
        region: "East",
        state: "Connecticut",
        sales: 13386,
      },
      {
        region: "East",
        state: "Rhode Island",
        sales: 22629,
      },
      {
        region: "East",
        state: "Maryland",
        sales: 23707,
      },
      {
        region: "East",
        state: "Delaware",
        sales: 27453,
      },
      {
        region: "East",
        state: "Massachusetts",
        sales: 28639,
      },
      {
        region: "East",
        state: "New Jersey",
        sales: 35763,
      },
      {
        region: "East",
        state: "Ohio",
        sales: 78253,
      },
      {
        region: "East",
        state: "Pennsylvania",
        sales: 116522,
      },
      {
        region: "East",
        state: "New York",
        sales: 310914,
      },
      {
        region: "South",
        state: "South Carolina",
        sales: 8483,
      },
      {
        region: "South",
        state: "Louisiana",
        sales: 9219,
      },
      {
        region: "South",
        state: "Mississippi",
        sales: 10772,
      },
      {
        region: "South",
        state: "Arkansas",
        sales: 11678,
      },
      {
        region: "South",
        state: "Alabama",
        sales: 19511,
      },
      {
        region: "South",
        state: "Tennessee",
        sales: 30662,
      },
      {
        region: "South",
        state: "Kentucky",
        sales: 36598,
      },
      {
        region: "South",
        state: "Georgia",
        sales: 49103,
      },
      {
        region: "South",
        state: "North Carolina",
        sales: 55604,
      },
      {
        region: "South",
        state: "Virginia",
        sales: 70641,
      },
      {
        region: "South",
        state: "Florida",
        sales: 89479,
      },
      {
        region: "West",
        state: "Wyoming",
        sales: 1603,
      },
      {
        region: "West",
        state: "Idaho",
        sales: 4380,
      },
      {
        region: "West",
        state: "New Mexico",
        sales: 4779,
      },
      {
        region: "West",
        state: "Montana",
        sales: 5589,
      },
      {
        region: "West",
        state: "Utah",
        sales: 11223,
      },
      {
        region: "West",
        state: "Nevada",
        sales: 16729,
      },
      {
        region: "West",
        state: "Oregon",
        sales: 17431,
      },
      {
        region: "West",
        state: "Colorado",
        sales: 32110,
      },
      {
        region: "West",
        state: "Arizona",
        sales: 35283,
      },
      {
        region: "West",
        state: "Washington",
        sales: 138656,
      },
      {
        region: "West",
        state: "California",
        sales: 457731,
      },
    ];

    // Create axes
    let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.dataFields.category = "state";
    yAxis.renderer.grid.template.location = 0;
    yAxis.renderer.labels.template.fontSize = 10;
    yAxis.renderer.minGridDistance = 10;

    let xAxis = chart.xAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "sales";
    series.dataFields.categoryY = "state";
    series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
    series.columns.template.strokeWidth = 0;
    series.columns.template.adapter.add("fill", function (fill, target) {
      if (target.dataItem) {
        let test1 = target.dataItem.dataContext as any;
        switch (test1.region) {
          case "Central":
            return chart.colors.getIndex(0);
            break;
          case "East":
            return chart.colors.getIndex(1);
            break;
          case "South":
            return chart.colors.getIndex(2);
            break;
          case "West":
            return chart.colors.getIndex(3);
            break;
        }
      }
      return fill;
    });

    let axisBreaks = {};
    let legendData = [];

    // Add ranges
    function addRange(label, start, end, color) {
      let range = yAxis.axisRanges.create();
      range.category = start;
      range.endCategory = end;
      range.label.text = label;
      range.label.disabled = false;
      range.label.fill = color;
      range.label.location = 0;
      range.label.dx = -130;
      range.label.dy = 12;
      range.label.fontWeight = "bold";
      range.label.fontSize = 12;
      range.label.horizontalCenter = "left";
      range.label.inside = true;

      range.grid.stroke = am4core.color("#396478");
      range.grid.strokeOpacity = 1;
      range.tick.length = 200;
      range.tick.disabled = false;
      range.tick.strokeOpacity = 0.6;
      range.tick.stroke = am4core.color("#396478");
      range.tick.location = 0;

      range.locations.category = 1;
      let axisBreak = yAxis.axisBreaks.create();
      axisBreak.startCategory = start;
      axisBreak.endCategory = end;
      axisBreak.breakSize = 1;
      axisBreak.fillShape.disabled = true;
      axisBreak.startLine.disabled = true;
      axisBreak.endLine.disabled = true;
      axisBreaks[label] = axisBreak;

      legendData.push({ name: label, fill: color });
    }

    addRange("Central", "Texas", "North Dakota", chart.colors.getIndex(0));
    addRange("East", "New York", "West Virginia", chart.colors.getIndex(1));
    addRange("South", "Florida", "South Carolina", chart.colors.getIndex(2));
    addRange("West", "California", "Wyoming", chart.colors.getIndex(3));

    chart.cursor = new am4charts.XYCursor();

    let legend = new am4charts.Legend();
    legend.position = "right";
    legend.scrollable = true;
    legend.valign = "top";
    legend.reverseOrder = true;

    chart.legend = legend;
    legend.data = legendData;

    legend.itemContainers.template.events.on("toggled", function (event) {
      let qsw = event.target.dataItem.dataContext as any;
      let name = qsw.name;
      let axisBreak = axisBreaks[name];
      if (event.target.isActive) {
        axisBreak.animate(
          { property: "breakSize", to: 0 },
          1000,
          am4core.ease.cubicOut
        );
        yAxis.dataItems.each(function (dataItem) {
          let ggwp = dataItem.dataContext as any;
          if (ggwp.region == name) {
            dataItem.hide(1000, 500);
          }
        });
        series.dataItems.each(function (dataItem) {
          let qwerty = dataItem.dataContext as any;
          if (qwerty.region == name) {
            dataItem.hide(1000, 0, 0, ["valueX"]);
          }
        });
      } else {
        axisBreak.animate(
          { property: "breakSize", to: 1 },
          1000,
          am4core.ease.cubicOut
        );
        yAxis.dataItems.each(function (dataItem) {
          let asdf = dataItem.dataContext as any;
          if (asdf.region == name) {
            dataItem.show(1000);
          }
        });

        series.dataItems.each(function (dataItem) {
          let zxcv = dataItem.dataContext as any;
          if (zxcv.region == name) {
            dataItem.show(1000, 0, ["valueX"]);
          }
        });
      }
    });
  }

  ngAfterViewInit() {}
}
