import { Component, Output, EventEmitter } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { CustomEvent } from '../register/object-event.interface';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ClickOutsideModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  @Output() closeSignInChange = new EventEmitter<boolean>();
  @Output() showRegisterChange =new EventEmitter<CustomEvent>();
  showSignIn = false;
  showRegister = false;
  closeForm(){
    this.showSignIn = false;
    this.closeSignInChange.emit(this.showSignIn);
  }

  onClickRegister(){
    this.showRegister = true;
    this.showSignIn = false;

    const eventObject : CustomEvent = {
      showSignIn: this.showSignIn,
      showRegister: this.showRegister
    };

    this.showRegisterChange.emit(eventObject);   
  }
}
