import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  http = inject(HttpClient);

  addMessage(message : any){
    console.log('Form values:', message);
  }

  getMessages(){
    /*const headers = new HttpHeaders({
      "Authorization":`Bearer : ${token}`
    })
    return this.http.get("localhost:3000/users",{headers});*/
    return this.http.get("localhost:3000/users");
  }
}
