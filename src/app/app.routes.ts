import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { PropertyComponent } from './pages/property/property.component';

export const routes: Routes = [
  {
    path: '', redirectTo:'login' , pathMatch:'full'
},
{
    path:'login',
    component:LoginComponent
},
{
    path:'',
    component:LayoutComponent,
    children:[
        {
            path:'dashboard',
            component:HomeComponent,
          //  canActivate: [authGuard]
        },
        {
          path:'property',
          component:PropertyComponent
      }
    ]
}
];
