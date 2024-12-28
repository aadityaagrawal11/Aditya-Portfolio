import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globalconstant } from 'src/app/shared/global-constant';
import emailjs from '@emailjs/browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: any = FormGroup;

  constructor(private fb: FormBuilder) {}
  private _snackBar = inject(MatSnackBar);
 

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [null, [Validators.pattern(Globalconstant.nameRegex)]],
      email: [null, [Validators.pattern(Globalconstant.emailRegex)]],
      number: [
        null,
        [
          Validators.pattern(Globalconstant.contactNumberRegex),
          Validators.maxLength(10),
        ],
      ],
      message: [null, [Validators.minLength(20)]],
    });
  }

  ContactInfo(contactForm: any) {
    console.log(contactForm.value);
    emailjs.init('reLgEp9Fzz9bbtqvR');
    emailjs
      .send('service_xfu1n98', 'template_mvbmuqx', {
        from_name: contactForm.value.name,
        to_name: 'Aditya Agrawal',
        contact_number: contactForm.value.number,
        email: contactForm.value.email,
        message: contactForm.value.message,
      })
      .then((res) => {
        console.log('Mail is sent');
        this.contactForm.reset();
        this._snackBar.open('message has been sent', 'OK');
      });
  }
}
