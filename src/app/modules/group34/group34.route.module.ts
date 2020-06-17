import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Group23page1Component } from '../../components/group23page1/group23page1.component';
import { Group23page2Component } from '../../components/group23page2/group23page2.component';
import { Group23page3Component } from '../../components/group23page3/group23page3.component';
import { Group1page1Component } from '../../components/group1page1/group1page1.component';

const routes: Routes = [
  {
    path: 'g1',
    // loadChildren: './modules/group1/group1.module#Group1Module'
    component: Group1page1Component
  },
  {
    path: 'p1',
    component: Group23page1Component
  },
  {
    path: 'p2',
    component: Group23page2Component
  },
  {
    path: 'p3',
    component: Group23page3Component
  },
  // {
  //   path: '',
  //   // loadChildren: './modules/group23/group23.module#Group23Module'
  //   children: [
  //     {
  //       path: 'p1',
  //       component: Group23page1Component
  //     },
  //     {
  //       path: 'p2',
  //       component: Group23page2Component
  //     },
  //     {
  //       path: 'p3',
  //       component: Group23page3Component
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Group34RouterModule { }
