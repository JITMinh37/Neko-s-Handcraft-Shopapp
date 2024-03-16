import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/users/register.dto';
import { environment } from '../environments/environment';
import { HttpUtilService } from './http.util.service';
import { LoginDTO } from '../dtos/users/login.dto';
@Injectable({
  providedIn: 'root'
})
// Điều này đảm bảo rằng service này có thể được inject và sử dụng ở bất kỳ nơi nào trong ứng dụng mà không cần phải import nó vào trong một module cụ thể. 
//  bạn cũng có thể cung cấp service trong một module cụ thể bằng cách thay providedIn: 'root' bằng providedIn: MyModule, trong đó MyModule là tên của module muốn cung cấp service đó.
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;

  private apiConfig = {
    headers: this.httpUtilService.createHeader(),
  }
  constructor(
    private http: HttpClient,
    private httpUtilService: HttpUtilService
  ) { }

  register(registerDTO: RegisterDTO): Observable<any>{
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any> {    
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }
}
