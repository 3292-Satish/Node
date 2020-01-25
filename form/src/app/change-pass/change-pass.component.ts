import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  resetForm: FormGroup

  constructor() { }

  ngOnInit() {
  }

  changePass(email){
    console.log(email)
  }

}
