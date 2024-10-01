import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Event, Router, NavigationEnd } from '@angular/router';
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
  userName: string | undefined;

  constructor(public router: Router, private keycloakService: KeycloakService) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
      }
    });
  }

  ngOnInit(): void {
    const roles = this.keycloakService.getUserRoles();
    this.isAdmin = roles.includes('manage-users');

    this.keycloakService.loadUserProfile().then((profile) => {
      this.userName = profile.firstName + ' ' + profile.lastName;
    });

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

  // Add the burgerMenu method to handle the sidebar toggle logic
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
    this.keycloakService.logout(window.location.origin + '/login');
  }
}
