import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { CleanAuthors } from '../cleanauthors.model';

@Component({
  selector: 'kz-clean-stats',
  templateUrl: './clean-stats.component.html',
  styleUrls: ['./clean-stats.component.css']
})
export class CleanStatsComponent implements OnInit {

  cleanStats: CleanAuthors[] = [];

  constructor(private _firebaseService: FirebaseService) { }

  ngOnInit() {
    this._firebaseService.getCleanAuthors().subscribe(cleanAuthors => {
      this.cleanStats = cleanAuthors.sort((a,b) => a.count - b.count);
    });
  }

}
