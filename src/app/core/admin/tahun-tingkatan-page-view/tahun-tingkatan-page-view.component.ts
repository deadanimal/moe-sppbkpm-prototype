import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";
import { FormGroup } from "@angular/forms";
import Dropzone from "dropzone";
Dropzone.autoDiscover = false;

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-tahun-tingkatan-page-view",
  templateUrl: "./tahun-tingkatan-page-view.component.html",
  styleUrls: ["./tahun-tingkatan-page-view.component.scss"],
})
export class TahunTingkatanPageViewComponent implements OnInit {
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
      jenis: "PPT",
      peringkat: "SMK",
      tahun: "2021",
      negeri: "Selangor",
      tingkatan: "4",
      umur: "16",
      institusi: "Pendidikan",
    },
    {
      jenis: "PAT",
      peringkat: "SK",
      tahun: "2020",
      negeri: "WP Kuala Lumpur",
      tingkatan: "5",
      umur: "11",
      institusi: "Pendidikan",
    },
    {
      jenis: "UPSR",
      peringkat: "SK",
      tahun: "2020",
      negeri: "Melaka",
      tingkatan: "6",
      umur: "12",
      institusi: "Pendidikan",
    },
    {
      jenis: "PT3",
      peringkat: "SMK",
      tahun: "2020",
      negeri: "Perak",
      tingkatan: "3",
      umur: "15",
      institusi: "Pendidikan",
    },
    {
      jenis: "SPM",
      peringkat: "SBP",
      tahun: "2020",
      negeri: "Pahang",
      tingkatan: "5",
      umur: "17",
      institusi: "Pendidikan",
    },
    {
      jenis: "PPT",
      peringkat: "Pra-sekolah",
      tahun: "2021",
      negeri: "Kelantan",
      tingkatan: "-",
      umur: "6",
      institusi: "Pra-pendidikan",
    },
    {
      jenis: "SPM",
      peringkat: "SMK",
      tahun: "2020",
      negeri: "Johor",
      tingkatan: "5",
      umur: "17",
      institusi: "Pendidikan",
    },
    {
      jenis: "PAT",
      peringkat: "SK",
      tahun: "2020",
      negeri: "Terengganu",
      tingkatan: "4",
      umur: "10",
      institusi: "Pendidikan",
    },
    {
      jenis: "SPM",
      peringkat: "SMK",
      tahun: "2020",
      negeri: "Selangor",
      tingkatan: "5",
      umur: "17",
      institusi: "Pendidikan",
    },
    {
      jenis: "SPM",
      peringkat: "SBP",
      tahun: "2020",
      negeri: "Kedah",
      tingkatan: "5",
      umur: "17",
      institusi: "Pendidikan",
    },
  ];
  SelectionType = SelectionType;

  constructor(private modalService: BsModalService) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  ngOnInit() {
    let currentMultipleFile = undefined;
    // multiple dropzone file - accepts any type of file
    new Dropzone(document.getElementById("dropzone-multiple"), {
      url: "https://",
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: document.getElementsByClassName(
        "dz-preview-multiple"
      )[0],
      previewTemplate: document.getElementsByClassName("dz-preview-multiple")[0]
        .innerHTML,
      maxFiles: null,
      acceptedFiles: null,
      init: function () {
        this.on("addedfile", function (file) {
          if (currentMultipleFile) {
          }
          currentMultipleFile = file;
        });
      },
    });
    document.getElementsByClassName("dz-preview-multiple")[0].innerHTML = "";
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
  onSelect({ selected }, { selected1 }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(selected);
  }
  onActivate(event) {
    this.activeRow = event.row;
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
}
