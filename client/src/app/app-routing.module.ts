import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './components/init/init.component';
import { OnlineComponent } from './components/online/online.component';
import { TimedComponent } from './components/timed/timed.component';

const routes: Routes = [
  { path: '', component: InitComponent },
  { path: 'online', component: OnlineComponent },
  { path: 'timed', component: TimedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
