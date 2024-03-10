import { Component, Output, EventEmitter } from '@angular/core';
import { CustomEvent } from './object-event.interface';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Output() closeRegisterChange = new EventEmitter<CustomEvent>();
  showSignIn = false;
  showRegister = false;
  closeForm(){
    this.showSignIn = false;
    this.showRegister = false;

    const eventObject: CustomEvent = {
      showSignIn: this.showSignIn,
      showRegister: this.showRegister
    };
    this.closeRegisterChange.emit(eventObject);
  }
}
