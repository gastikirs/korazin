import { RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CleanComponent } from './components/clean/clean.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { BreakComponent } from './components/break/break.component';
import { AuthGuard } from './auth.guard';

const APP_ROUTES: Routes = [
			{path: '', pathMatch: 'full', component: HomeComponent},
			{path: 'clean', component: CleanComponent, canActivate: [AuthGuard]},
			{path: 'expenses', component: ExpensesComponent, canActivate: [AuthGuard]},
			{path: 'break', component: BreakComponent, canActivate: [AuthGuard]}
		];

export const routing = RouterModule.forRoot(APP_ROUTES);