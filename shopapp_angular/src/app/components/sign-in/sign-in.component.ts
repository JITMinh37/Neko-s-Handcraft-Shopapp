import { UserService } from './../../services/user.service';
import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { CustomEvent } from '../register/object-event.interface';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginDTO } from '../../dtos/users/login.dto';
import { LoginResponse } from '../../responses/login.response';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ClickOutsideModule, HttpClientModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  providers: [UserService, TokenService]
})
export class SignInComponent {
  @Output() closeSignInChange = new EventEmitter<boolean>();
  @Output() showRegisterChange =new EventEmitter<CustomEvent>();
  @ViewChild('loginForm') loginForm!: NgForm;
  showSignIn: boolean; 
  showRegister: boolean;
  phoneNumber: string;
  password: string;
  rememberMe: boolean = true;
  constructor(private userService: UserService, private tokenService: TokenService){
    this.showSignIn = false;
    this.showRegister = false;
    this.phoneNumber = '';
    this.password = '';
  }
  Login(){
    const message = 'phone' + this.phoneNumber + ' password' + this.password;
    //alert(message);
    
    const loginDTO: LoginDTO = {    
      "phone_number": this.phoneNumber,
      "password": this.password,
    }
    
    this.userService.login(loginDTO)
        .subscribe({
          next: (response: LoginResponse) => {
            debugger;
            const token = response.token;
            if(this.rememberMe){
              this.tokenService.setToken(token);
            }
            debugger;
          },
          complete: () => {
            debugger;
          },
          error: (err: any) => {
            debugger;
            alert(`Cannot login, error: ${err.error}`)
          }
        });
  }

  
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
