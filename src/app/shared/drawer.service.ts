import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  constructor() { }

  private isDrawerOpenSubject = new BehaviorSubject<boolean>(false);

  // Observable to listen to drawer state
  isDrawerOpen$ = this.isDrawerOpenSubject.asObservable();

  // Open or close the drawer
  toggleDrawer() {
    this.isDrawerOpenSubject.next(!this.isDrawerOpenSubject.value);
  }

  closeDrawer() {
    this.isDrawerOpenSubject.next(false);
  }

  openDrawer() {
    this.isDrawerOpenSubject.next(true);
  }

}
