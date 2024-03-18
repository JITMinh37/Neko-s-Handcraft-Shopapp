import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NgIf, ClickOutsideModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() showOverlayChange = new EventEmitter<boolean>();
  @Output() showSignInChange = new EventEmitter<boolean>();
  showDropdown = false;
  showOverlay = false;
  showSignInForm = false;
  showMenu = false;
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
    this.showOverlay = this.showDropdown;
    this.showOverlayChange.emit(this.showOverlay);
  }

  onOutsideClick(e : Event): void {
    this.showDropdown = false;
    this.showOverlay = false;
    this.showMenu = false;
    this.showOverlayChange.emit(this.showOverlay);
  }

  inputText = '';

  clearInput() {
    this.inputText = '';
  }

  showSignIn(){
    this.showSignInForm = true;
    this.showSignInChange.emit(this.showSignInForm);
  }
  toggleMenu(event: Event){
    event.stopPropagation();
    this.showMenu = !this.showMenu;
    console.log(this.showMenu);
  }
}
