import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DrawerService } from 'src/app/shared/drawer.service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent {

  @ViewChild('drawer') drawer!: MatSidenav;

  public isMobile = false;
  isDrawerOpen: boolean = false;
  activeTab: string = 'home'; // Default active tab

  constructor(private observer: BreakpointObserver, private drawerService: DrawerService) {
    this.drawerService.isDrawerOpen$.subscribe((isOpen) => {
      this.isDrawerOpen = isOpen;
    });
  }

  closeDrawer(): void {
    this.drawerService.closeDrawer();
  }

  ngAfterViewInit() {
    this.observer.observe(['(min-width: 800px)']).subscribe((res) => {
      this.isMobile = res.matches;
    });
  }

  toggleSidenav() {
    this.drawer.toggle();
  }
 
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
