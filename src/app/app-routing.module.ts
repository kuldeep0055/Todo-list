import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllpostComponent } from './Components/allpost/allpost.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:"", component: AllpostComponent, pathMatch: 'full'},
  // {path:"about-us", component: AboutUsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
