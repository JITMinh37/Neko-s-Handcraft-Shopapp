import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http";

@Injectable(
    {providedIn: 'root'}
)
export class TokenService{
    private readonly TOKEN_KEY = "access_token";
    constructor(){
    }
    getToken(): string | null{
        return localStorage.getItem('access_token');
    }
    setToken(token: string) : void{
        return localStorage.setItem('access_token', token); 
    }
    removeToken() : void{
        localStorage.removeItem('access_token');
    }
}