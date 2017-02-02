import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Item } from './item';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'kz-break',
  templateUrl: './break.component.html',
  styleUrls: ['./break.component.css']
})
export class BreakComponent implements OnInit{

	breaks: Item[] = [];
  loadingData: boolean;
  appState: string = 'default';
  myForm: FormGroup;
  username: string;
  createdAt: string;

  constructor(private _firebaseService: FirebaseService, private auth: AuthService) { }


  ngOnInit() {
    this.loadingData = true;
  	this._firebaseService.getBreaks().subscribe((breaks) => {
  		this.breaks = breaks;
      this.loadingData = false;
  	});

    this.username = this.auth.getUserName();
    this.createdAt = moment().format("DD-MM-YYYY");
    
    this.myForm = new FormGroup({
      "item": new FormControl('', Validators.required),
      "author": new FormControl(this.username.charAt(0).toUpperCase() + this.username.slice(1)),
      "createdAt": new FormControl(this.createdAt)
    });
    console.log(this.myForm.value.item);
  }

  changeState(state){
    this.appState = state;
  }

  onSubmit(){
    this._firebaseService.addBreak({
      "item": this.myForm.value.item,
      "author": this.username.charAt(0).toUpperCase() + this.username.slice(1),
      "createdAt": this.createdAt
    });
    this.myForm.reset();
     console.log(this.myForm.controls);
    
    this.changeState('default');
  }

  deleteBreak(id) {
    this._firebaseService.deleteBreak(id);
  }

}
