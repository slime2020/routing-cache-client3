import { Component, OnInit, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingCache } from '../../app-routing-cache';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('AdminComponent> ngOnInit()');
    this.clearRoutingCache();
  }

  goto(path: string): void {
    console.log('AdminComponent> goto:', path);
    this.router.navigateByUrl(path);
  }

  clearRoutingCache(): void {
    Object.keys(AppRoutingCache.handlers)
      .forEach((key) => {
        const component = AppRoutingCache.handlers[key] as {
          componentRef: ComponentRef<any>;
        };
        if (component) {
          AppRoutingCache.handlers[key] = null;
          delete AppRoutingCache.handlers[key];
          // component.componentRef.destroy();
          console.warn('clearRoutingCache> removed:', key);
        }
      });
  }

  logout(): void {
    console.log('AdminComponent> logout()');
    // this.router.navigateByUrl('/login');
    this.clearRoutingCache();
    // this.router.navigate(['/login']);
    this.router.navigate(['/login'], { state: { shouldNotCache: true } });
  }

  logout401(): void {
    console.log('AdminComponent> logout401()');
    const returnPage = this.router.url;
    console.log(returnPage);
    // this.router.navigateByUrl('/login');
    // this.clearRoutingCache();
    this.router.navigate(['/login']);
    sessionStorage.setItem('401return', returnPage);
  }

}
