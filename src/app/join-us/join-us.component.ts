import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LanguageService } from '../shared/services/language.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss'],
  animations: [
    trigger('contentAnimation', [
      state('hidden', style({
        with: '0',
        height:'0',
        opacity: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        width: '*',
        height:'*',
        opacity: '1',
        overflow: 'auto'
      })),
      transition('hidden <=> visible', animate('300ms ease-in-out'))
    ]),
  ]
})
export class JoinUsComponent implements OnInit{
  heritages = [
    'Ancient Egyptian',
    'Bedouin',
    'Eastern Desert',
    'Egyptian',
    'Folksy',
    'Islamic',
    'Modern',
    'Newbies',
    'Oasis',
    'Pharaonic',
    'Rural',
    'Sinai',
    'Siwi',
  ];
  businessTypes = ['Company', 'Individual', 'NGO', 'Cluster'];
  carfterVisible = true;
  registerVisible = false;

  checkLang = '';
  nominateForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private language:LanguageService,
    private _formBuilder: FormBuilder,
    private toastr:ToastrService,
    public http : HttpService
    ){
      this.nominateForm = this._formBuilder.group({
        nominee_Name: ['',Validators.required],
        nominee_Number: ['',Validators.required],
        nominee_Job: ['', [Validators.required]],
        nominee_Email: ['',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        nominee_Craft: ['',Validators.required],
        nominee_Craft_Name: ['', Validators.required],
        business_Number: ['',Validators.required],
        website_Social_Link: ['', Validators.required],
      });
      this.registerForm = this._formBuilder.group({
        full_Name: ['', Validators.required],
        phone_Number: [
          '',
          [
            Validators.required,
            Validators.pattern('^(/+201|01|00201)[0-2,5]{1}[0-9]{8}'),
          ],
        ],
        job: ['', Validators.required],
        email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        brand_Name: ['', Validators.required],
        craft_Type: ['', Validators.required],
        product_You_Create: ['', Validators.required],
        heritage: ['', Validators.required],
        business_Type: ['', Validators.required],
        business_Address: ['', Validators.required],
        how_Many_Employee: ['', Validators.required],
        web_Site: ['', [Validators.pattern("https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}")]],
        social_Media: ['', [ Validators.pattern("https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}")]],
        business_Number: ['', [Validators.pattern("^(/+201|01|00201)[0-2,5]{1}[0-9]{8}")]],
        business_Email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        market: ['', Validators.required],
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


toggleCrafter() {
  if(this.carfterVisible){
    this.registerVisible = false;
  }
  else{
    this.carfterVisible = true;
    this.registerVisible = false;
  }
}

toggleRegister() {
  if(this.registerVisible){
    this.carfterVisible = false;
  }
  else{
    this.registerVisible = true;
    this.carfterVisible = false;
  }
}

  submitNominate(){
    const body = {
      ...this.nominateForm.value,
    };
    this.http.post('users/nominateCrafter',body).subscribe((res: any) => {
      this.toastr.success('Register nominate Crafter Successfully');
      this.nominateForm.reset();
    });
  }

  submitBusiness(){
    const body = {
      ...this.registerForm.value,
    };
    this.http.post('users/registerBusiness',body).subscribe((res: any) => {
      this.toastr.success('Business Register Successfully');
      this.registerForm.reset();
    });
  }
}
