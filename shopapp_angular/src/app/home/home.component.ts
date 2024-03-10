import { NgIf } from '@angular/common';
import { Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { RegisterComponent } from '../register/register.component';
import { CustomEvent } from '../register/object-event.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgIf, HeaderComponent, FooterComponent, SignInComponent, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  showOverlay = false;
  showSignIn = false;
  showRegister = false;
  onShowOverlayChange(value:boolean): void{
    this.showOverlay = value;
  }

  onShowSignInChange(value:boolean): void{
    this.showSignIn = value;
    console.log(this.showSignIn);
  }


  onCloseSignIn(value:boolean): void{
    this.showSignIn = value;
  }

  onShowRegister(event : CustomEvent): void{
    this.showRegister = event.showRegister;
    this.showSignIn = event.showSignIn;
  }

  onCloseRegister(event: CustomEvent){
    this.showSignIn = event.showSignIn;
    this.showRegister = event.showRegister;
  }
}
