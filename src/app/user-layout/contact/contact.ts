import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../../services/message-service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  standalone:true
})
export class Contact {

  private contactService = inject(MessageService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
      /*usernameCtrl :new FormControl('', Validators.required),
      emailCtrl :new FormControl('', [Validators.required, Validators.email]),
      subjectCtrl :new FormControl('', Validators.required),
      messageCtrl :new FormControl('', [Validators.required, Validators.minLength(1)])*/
      usernameCtrl : ['', Validators.required],
      emailCtrl : ['', [Validators.required, Validators.email]],
      subjectCtrl : ['', Validators.required],
      messageCtrl : ['', [Validators.required, Validators.minLength(1)]]
  });

  sendMessage() {
    if (this.form.valid) {
      this.contactService.addMessage(this.form.value);
      
    } else {
      console.log('Form is invalid');
      /*
      Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && control.invalid) {
        console.log(`- ${key}:`, control.errors);
      
      });}*/

    }
  }

}
