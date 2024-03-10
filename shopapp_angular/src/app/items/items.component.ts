import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { RegisterComponent } from '../register/register.component';
import { CustomEvent } from '../register/object-event.interface';
import { ClickOutsideModule } from 'ng-click-outside';
@Component({
  selector: 'app-items',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SignInComponent, RegisterComponent, ClickOutsideModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  showOverlay = false;
  showSignIn = false;
  showRegister = false;
  showMenuBody = false;
  showId = false;
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

  showMenu(){
    this.showMenuBody = !this.showMenuBody;
    this.showId = !this.showId;
  }

  onOutsideclick(e : Event){
    this.showMenuBody = false;
  }
}
