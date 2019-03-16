import {Routes} from '@angular/router'
import { HomeComponent } from './home/home.component';
import { AlertasComponent } from './alertas/alertas.component';
import { AboutComponent } from './about/about.component';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'alertas', component:  AlertasComponent},
  {path: 'about', component: AboutComponent}
]
