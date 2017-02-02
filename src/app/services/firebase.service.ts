import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';


@Injectable()
export class FirebaseService {

  cleans: FirebaseListObservable<Clean[]>;
  cleanAuthors: FirebaseListObservable<CleanAuthors[]>;
  breaks: FirebaseListObservable<Item[]>;

  constructor(private af: AngularFire) { }
  
  getCleans(){
    this.cleans = this.af.database.list('/cleans');
    return this.cleans;
  }

  getCleanAuthors() {
    this.cleanAuthors = this.af.database.list('/cleanauthors');
    return this.cleanAuthors;
  }

  addClean(clean) {
    return this.cleans.push(clean);
  }

  updateClean($key, clean) {
    this.cleans.update($key, clean);
  }

  deleteClean($key) {
    this.cleans.remove($key);
  }

  sumClean(id) {
    var count = firebase.database().ref('cleanauthors/' + id + '/count');
    count.transaction((currentCount) => currentCount+1);
  }

  decClean(id) {
    var count = firebase.database().ref('cleanauthors/' + id + '/count');
    count.transaction((currentCount) => currentCount-1);
  }

  getBreaks() {
    this.breaks = this.af.database.list('/breaks');
    return this.breaks;
  }

  addBreak(item) {
    return this.breaks.push(item);
  }

  deleteBreak($key) {
    this.breaks.remove($key);
  }

}

export interface Clean {
  $key: string,
  date: string,
  task: string,
  authors: string,
  completed: boolean
};

export interface CleanAuthors {
  $key: string,
  name: string,
  count: number
}

export interface Item {
  $key: string,
  name: string,
  createdAt: string
}