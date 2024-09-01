import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Event, Router, NavigationEnd } from '@angular/router';
import { DataService } from '../services/data.service';
import { KeycloakService } from 'keycloak-angular';
declare var $: any;

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit, AfterViewInit {
  showDropdown = true;
  public bellCollapsed = true;
  public userCollapsed = true;
  public langCollapsed = true;

  splitVal: any;
  base = '';
  page = '';
  isAdmin: boolean = false;

  constructor(
    public router: Router,
    private commonService: DataService,
    private keycloakService: KeycloakService
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
      }
    });
  }

  ngOnInit(): void {
    // Check if the user has the 'admin' role
    const roles = this.keycloakService.getUserRoles();
    this.isAdmin = roles.includes('manage-users');

    $(document).on('click', '#filter_search', function () {
      $('#filter_inputs').slideToggle('slow');
    });

    $(document).on('mouseover', function (e: any) {
      e.stopPropagation();
      if ($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
        const targ = $(e.target).closest('.sidebar').length;
        if (targ) {
          $('body').addClass('expand-menu');
          $('.subdrop + ul').slideDown();
        } else {
          $('body').removeClass('expand-menu');
          $('.subdrop + ul').slideUp();
        }
        return false;
      }
      return false;
    });
  }

  ngAfterViewInit() {
    this.loadDynmicallyScript('./../../../assets/js/script.js');
  }

  loadDynmicallyScript(js: any) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() {}

  change(name: any) {
    this.page = name;
    // this.commonService.nextmessage('admin');
  }

  home() {
    // this.router.navigate(['/index']);
    window.location.href = '/index';
  }

  main() {
    // this.commonService.nextmessage('main');
  }

  clickLogout() {
    window.location.href = '/index';
  }

  burgerMenu() {
    if ($('body').hasClass('mini-sidebar')) {
      $('body').removeClass('mini-sidebar');
      $('.subdrop + ul').slideDown();
    } else {
      $('body').addClass('mini-sidebar');
      $('.subdrop + ul').slideUp();
    }
    return false;
  }

  Logout() {
    localStorage.removeItem('LoginData');
    this.router.navigate(['/login-form']);
  }
}
