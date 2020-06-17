import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Group34RouterModule } from './group34.route.module';

import { Group23page1Component } from '../../components/group23page1/group23page1.component';
import { Group23page2Component } from '../../components/group23page2/group23page2.component';
import { Group23page3Component } from '../../components/group23page3/group23page3.component';
import { Group1page1Component } from '../../components/group1page1/group1page1.component';

@NgModule({
  declarations: [
    // Group23page1Component,
    // Group23page2Component,
    // Group23page3Component,
    // Group1page1Component
  ],
  imports: [
    CommonModule,
    Group34RouterModule
  ]
})
export class Group34Module { }
