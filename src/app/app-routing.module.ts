import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/login/main/main.component';
import { OopsComponent } from './components/oops/oops.component';

const routes: Routes = [
  {
    path: 'login',
    // loadChildren: './modules/login/login.module#LoginModule'
    component: MainComponent
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'g12',
        loadChildren: './modules/group12/group12.module#Group12Module'
      },
      {
        path: 'setting',
        loadChildren: './modules/group34/group34.module#Group34Module'
        // children: [
        //   {
        //     path: 'g1',
        //     loadChildren: './modules/group1/group1.module#Group1Module'
        //   },
        //   {
        //     path: '',
        //     loadChildren: './modules/group23/group23.module#Group23Module'
        //   }
        // ]
      },
      {
        path: 'g23',
        loadChildren: './modules/group23/group23.module#Group23Module'
      }
    ]
  },
  // {
  //   path: '**',
  //   component: OopsComponent,
  //   pathMatch: 'full'
  // }
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
