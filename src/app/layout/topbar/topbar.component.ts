import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DrawerService } from 'src/app/shared/drawer.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  @Output() sidenavToggle = new EventEmitter<void>();
  
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  public isMobile = false;

  constructor(private observer: BreakpointObserver,private drawerService: DrawerService) {
    this.drawerService.isDrawerOpen$.subscribe((isOpen) => {
      this.isDrawerOpen = isOpen;
    });
  }

  isDrawerOpen: boolean = false;

  

  toggleDrawer(): void {
    this.drawerService.toggleDrawer();
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .subscribe((res) => {
        this.isMobile = res.matches;

        if (this.isMobile) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.close();
        }
      });

    this.isMobile = this.observer.isMatched('(max-width: 800px)');
    if (!this.isMobile) {
      this.sidenav.close();
    }
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  isSidenavOpen: boolean = false; // Tracks sidenav state
  activeTab: string = 'home'; // Default active tab

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
