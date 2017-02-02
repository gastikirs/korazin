import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { CleanComponent } from './components/clean/clean.component';
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { routing } from './app.router';

import { OrderPipe } from './custompipes/order.pipe';
import { CapitalizePipe } from './custompipes/capitalize.pipe';

import { ExpensesComponent } from './components/expenses/expenses.component';
import { CleanStatsComponent } from './components/clean/clean-stats/clean-stats.component';
import { BreakComponent } from './components/break/break.component';
import { HomeComponent } from './components/home/home.component';

import { FirebaseConfig } from './firebaseconfig';

@NgModule({
  declarations: [
    AppComponent,
    CleanComponent,
    OrderPipe,
    ExpensesComponent,
    CleanStatsComponent,
    BreakComponent,
    HomeComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(FirebaseConfig)
  ],
  providers: [FirebaseService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
