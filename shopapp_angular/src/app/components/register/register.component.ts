
import { Component, Output, EventEmitter, ViewChild, OnInit, Injector } from '@angular/core';
import { CustomEvent } from './object-event.interface';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/users/register.dto';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [UserService] //providers:  có ý nghĩa là bạn đang cung cấp các dependency (các dịch vụ, các lớp) để Angular có thể tạo ra các instance của chúng và inject vào các component hoặc các service khác trong ứng dụng của bạn.
})
export class RegisterComponent {
  @ViewChild("registerForm") registerForm!: NgForm; // ánh xạ đến phần tử DOM "registerForm" đến biến registerForm của class Component. Dấu "!" sử dụng có ý nghĩa là khai báo trước và gắn giá trị sau.
                                                    // Angular sẽ không phải quan tâm nó có null hay không.
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

  phoneNumber = '';
  password = '';
  retypePassword = '';
  fullname = '';
  address = '';
  dateOfBirth = new Date();
  constructor(private userService: UserService) { // HttpClient: để kết nối với api, Router> dùng để chuyển sang trang khác khi register thành công.
    this.fullname = '';
    this.password = '';
    this.retypePassword = '';
    this.address = '';
    this.phoneNumber = '';
    // Khởi tạo dateOfBirth với ngày tháng 18 năm trước
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }


  register(){
    const message = 'phone' + this.phoneNumber + ' password' + this.password + ' fullname' + this.fullname + '\n' +
                   ' retype_password : '+ this.retypePassword + '\n' +
                   ' birthday : ' + this.dateOfBirth + '\n' +
                   ' address : ' + this.address;
    //alert(message);
    
    const registerDTO: RegisterDTO = {
      "fullname": this.fullname,
      "phone_number": this.phoneNumber,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 2
    }
    
    this.userService.register(registerDTO)
        .subscribe({
          next: (response: any) => {
            debugger;
          },
          complete: () => {
            debugger;
          },
          error: (err: any) => {
            debugger;
            alert(`Cannot register, error: ${err.error}`)
          }
        });
  }
  checkPasswordsMatch() {    
    if(this.password !== this.retypePassword){
      this.registerForm.form.controls['retype_password'].setErrors({'passwordMismatch': true});
    }else{
      this.registerForm.form.controls['retype_password'].setErrors(null);
    }
  }
  checkAge(){
    if(this.dateOfBirth){
      const today = new Date();
      const dateOfBirth = new Date(this.dateOfBirth);
      let age = today.getFullYear() - dateOfBirth.getFullYear();
      const month = today.getMonth() - dateOfBirth.getMonth();
      if(month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())){
        age--;
      }
      if(age < 18){
        this.registerForm.controls['date_of_birth'].setErrors({'invalidDate': true});
      }else{
        this.registerForm.controls['date_of_birth'].setErrors(null);
      }
    }
  }
}
