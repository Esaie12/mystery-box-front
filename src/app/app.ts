import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './user-layout/header/header';
import { Footer } from './user-layout/footer/footer';

/*
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePage],
  // template: '{{title}}', Interpollation
  template: `
  <app-home-page />
   <input #myInput (input)="onEdit(myInput.value)" type="text">
    <button (click)="increment()" >{{counter}} {{theValue}} </button>

    <div [class]="theColor" > Message </div>
    <button (click)="changeColor('success')" >Success</button>
    <button  (click)="changeColor('danger')" >Error</button>
  `,
 // templateUrl: './app.component.html', //je peux aussi faire directemnt template 
 // styleUrl: './app.css' //Je peux aussi faire styles:['h1{color:green}']
 styles:['.success{color:green} .danger{color:red}']

})
 */

@Component({
  selector: 'app-root',
  imports:[RouterOutlet, Header, Footer ],
  template: `<router-outlet></router-outlet>`,
  //styleUrl:'./app.css'
})

export class App {
  protected readonly title = signal('Gestion de pressing');
 /* counter=0;
  theValue="";
  theColor : 'success' | 'danger' = "success";

  
  increment(){
    this.counter ++;
  }

  onEdit(value: string){
    this.theValue = value;
  }

  changeColor(color: 'success' | 'danger'){
    this.theColor = color;
  }*/
}
