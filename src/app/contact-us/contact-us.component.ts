import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../shared/services/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit{
  contactForm: FormGroup;
  checkLang = '';


  constructor(
    private language:LanguageService,
    private _formBuilder: FormBuilder,
    private toastr:ToastrService,
    public http : HttpService
    ){
      this.contactForm = this._formBuilder.group({
        name: ['',Validators.required],
        email: ['',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        phone_Number: ['', [Validators.pattern(/^1[0-2,5]{1}[0-9]{8}$/),
        Validators.maxLength(10)]],
        subject: ['',Validators.required],
        message: ['',Validators.required],
        check: [false, Validators.requiredTrue],
      });
    }


ngOnInit() {
  this.language.registerObserver(this.handleUpdate);
}

handleUpdate(data: any) {
  this.checkLang =  data;

  const content = document.querySelectorAll('.content');

  if(this.checkLang == 'ar'){
    content.forEach(content => {
      content.classList.add('arDiraction');
      content.classList.remove('enDiraction');
    });
  }
  else if(this.checkLang == 'en'){
    content.forEach(content => {
      content.classList.remove('arDiraction');
      content.classList.add('enDiraction');
      });
    }
  }

  sendMessage(){
    const body = {
      ...this.contactForm.value,
    };
    this.http.post('users/contact',body).subscribe((res: any) => {
      this.toastr.success('Message Sent Successfully');
      this.contactForm.reset();
    });
  }
}
