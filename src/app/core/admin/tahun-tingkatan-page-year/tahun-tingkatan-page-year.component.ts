import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tahun-tingkatan-page-year',
  templateUrl: './tahun-tingkatan-page-year.component.html',
  styleUrls: ['./tahun-tingkatan-page-year.component.scss']
})
export class TahunTingkatanPageYearComponent implements OnInit {

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor(private router: Router) {
    this.bsRangeValue = [this.bsValue, this.maxDate];
   }

   navigatePage(path: String) {
    if (path == 'view') {
      return this.router.navigate(['/admin/pentadbiran/tahun-tingkatan-view'])
    }
  }
  ngOnInit() {
  }

}
