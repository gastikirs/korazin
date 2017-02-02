import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Clean } from './clean.model';
import { CleanAuthors } from './cleanauthors.model';
import { OrderPipe } from '../../custompipes/order.pipe';

import { CleanStatsComponent } from './clean-stats/clean-stats.component';

@Component({
  selector: 'kz-clean',
  templateUrl: './clean.component.html',
  styleUrls: ['./clean.component.css']
})
export class CleanComponent implements OnInit {

  cleans: Clean[];
  cleanAuthors: CleanAuthors[];
  appState: string = 'default';
  loadingTable: boolean;
  notCompCleans: Clean[] = [];

  //Active props for edit

  activeKey: string;
  activeDate: string;
  activeAuthor_1: string;
  activeAuthor_2: string;
  activeTask: string;
  activeCompleted: boolean;

  constructor(private _firebaseService: FirebaseService) { }

  ngOnInit() {
    this.loadingTable = true;
    this._firebaseService.getCleans().subscribe(cleans => {
      this.cleans = cleans;
      this.loadingTable = false;

      this.notCompCleans = this.cleans.filter((clean) => !clean.completed);
    //  console.log(this.notCompCleans);
    });
    this._firebaseService.getCleanAuthors().subscribe(cleanAuthors => {
      this.cleanAuthors = cleanAuthors;
    //  console.log(cleanAuthors);
    })

  }

  changeState(state: string, key: string = null) {
    if(key) {
      this.activeKey = key;
    }
    this.appState = state;
  }

  addCleanTask(
    date: string,
    author1: string,
    author2: string,
    task: string,
  ){
    //console.log(date,author1,author2,task);
   
     var newCleanTask = {
      date: date,
      authors: author1 + ' & ' + author2,
      task: task,
      completed: false
      };

    if(author1 != author2) {
      this._firebaseService.addClean(newCleanTask);
    } else {
      alert('Error. Same authors!');
    }
    this.changeState('default');
  }

  cancelNewClean() {
    this.changeState('default');
  }

  showEdit(clean: Clean) {
    this.activeKey = clean.$key;
    this.activeDate = clean.date;
    //this.activeAuthors = clean.authors;
    this.activeTask = clean.task;
    this.activeCompleted = clean.completed;

    var aux = clean.authors.indexOf('&');
    this.activeAuthor_1 = clean.authors.slice(0, aux-1);
    this.activeAuthor_2 = clean.authors.slice(aux + 2);

    console.log(this.activeAuthor_1, this.activeAuthor_2);

    this.changeState('edit');
  }

  editClean() {
    var clean = {
      date: this.activeDate,
      authors: this.activeAuthor_1 + ' & ' + this.activeAuthor_2,
      task: this.activeTask,
      completed: this.activeCompleted
    };

    if(this.activeAuthor_1 != this.activeAuthor_2) {
      this._firebaseService.updateClean(this.activeKey, clean);
    } else {
      alert('Error. Same authors!');
    }
    this.changeState('default');
  }

  deleteClean($key, authors, completed) {
    this._firebaseService.deleteClean($key);

    if(completed) {
      var aux = authors.indexOf('&');
      var author_1 = authors.slice(0, aux-1);
      var author_2 =  authors.slice(aux + 2);

      var authorsList = ['Gaston', 'Oxana', 'Tomer', 'Hanan', 'Or'];

      var author1_key = authorsList.indexOf(author_1);
      var author2_key = authorsList.indexOf(author_2);

      this._firebaseService.decClean(author1_key);
      this._firebaseService.decClean(author2_key);
    }
  }

  changeComplete(clean: Clean) {
    this.activeKey = clean.$key;
    var completed = !clean.completed;

    var updatedClean = {
      date: clean.date,
      authors: clean.authors,
      task: clean.task,
      completed: completed
    };

    var aux = clean.authors.indexOf('&');
    var author_1 = clean.authors.slice(0, aux-1);
    var author_2 =  clean.authors.slice(aux + 2);

    var authorsList = ['Gaston', 'Oxana', 'Tomer', 'Hanan', 'Or'];

    var author1_key = authorsList.indexOf(author_1);
    var author2_key = authorsList.indexOf(author_2);

    if(completed) {
      this._firebaseService.sumClean(author1_key);
      this._firebaseService.sumClean(author2_key);
    } else {
      this._firebaseService.decClean(author1_key);
      this._firebaseService.decClean(author2_key);
    }



    this._firebaseService.updateClean(this.activeKey, updatedClean)
  }

}


