import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private af: AngularFire, private router: Router) { }
  
  signInUser(user: User) {
		firebase.auth().signInWithEmailAndPassword(user.username, user.password).catch(function(error) {
		  // Handle Errors here.
		  var errorMessage = error.message;
		  // ...
		});
  }

  isAuth() {
  	var user = firebase.auth().currentUser;
  	if(user) {
  		return true;
  	} else {
  		return false;
  	}
  }

  logout() {
  	firebase.auth().signOut();
    this.router.navigate(['']);
  }

  getUserName() {
    var userEmail = firebase.auth().currentUser.email;
    var aux = userEmail.indexOf('@');
    var user = userEmail.slice(0,aux);
    return user;
  }
  
}

export interface User {
	username: string;
	password: string;
}
