import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { RegisterComponent } from '../register/register.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { CustomEvent } from '../register/object-event.interface';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SignInComponent, RegisterComponent, ClickOutsideModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent {
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
