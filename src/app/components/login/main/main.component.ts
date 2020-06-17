import { Component, OnInit, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('Login:MainComponent> ngOnInit()');
  }

  is401(): boolean {
    const result = sessionStorage.getItem('401return');
    // console.log(!!result);
    return !!result;
  }

  login(): void {
    // this.router.navigateByUrl('/');
    this.router.navigateByUrl('/home');
  }

  login401(): void {
    const returnPage = sessionStorage.getItem('401return');
    if (returnPage) {
      this.router.navigateByUrl(returnPage);
    } else {
      // this.router.navigateByUrl('/');
      this.router.navigateByUrl('/home');
    }
    sessionStorage.removeItem('401return');
  }

}
