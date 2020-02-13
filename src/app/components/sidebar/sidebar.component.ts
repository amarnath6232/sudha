import { Component, OnInit } from '@angular/core';
import { SampleService } from 'app/Services/sample.service';
import { Logout } from "./../../share/logout";
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/Services/authentication.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
  { path: '/minikit', title: 'Minikit', icon: '', class: '' },
  { path: '/list-minikit', title: 'List Minikit', icon: '', class: '' },
  { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  /*  { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
  { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' }, */
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebar;
  menuItems: any[];

  constructor(public sample: SampleService,
    private router: Router,
    private auth: AuthenticationService) { }

  ngOnInit() {
    /*  this.sample.loggedIn.subscribe(val => {
       this.sidebar = val;
     }) */
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout() {
    /* let logout = new Logout(this.router, this.auth);
    logout.logout(); */
    this.auth.token = null;
    localStorage.clear();
    this.router.navigate(['/signIn']);
  }
}
