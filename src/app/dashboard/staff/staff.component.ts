import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.getScript('./assets/js/staff_test.js');
  }

}
