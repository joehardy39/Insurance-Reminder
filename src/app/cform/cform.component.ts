import { Component } from '@angular/core';
import { NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { CustService } from '../_services/customer.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-cform',
  templateUrl: './cform.component.html',
  styleUrl: './cform.component.scss'
})
export class CformComponent {

  get f(): { [key: string]: AbstractControl } {
    return this.CustomerForm.controls;
  }

  CustomerForm = new FormGroup({
    firstname : new FormControl("", [Validators.required, Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    Lname : new FormControl("", [Validators.required, Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    email : new FormControl("",[Validators.required, Validators.email]),
    phone : new FormControl("", [Validators.required, Validators.maxLength(10)]),
    father : new FormControl("", [Validators.required, Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    mother : new FormControl("", [Validators.required, Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    type : new FormControl("", [Validators.required]),
    stat : new FormControl("", [Validators.required]),
    padd : new FormControl("", [Validators.required]),
    sadd : new FormControl("", [Validators.required]),
    sphone : new FormControl("", [Validators.required,Validators.maxLength(10)]),
    spouse : new FormControl("", [Validators.required,Validators.pattern("[a-zA-Z].*")]),
    kids : new FormControl("", [Validators.required,Validators.pattern("[a-zA-Z].*")]),
    ifsc : new FormControl("", [Validators.required]),
    comp : new FormControl("", [Validators.required]),
    agent : new FormControl("", [Validators.required]),
  });

  submitted =false;

  constructor(private custService: CustService,private router: Router) { }

  CustSubmit(){
    this.submitted = true;

    this.router.navigate(['/dash']);

    console.log(this.f['type'])
   
    this.custService.register(this.f['firstname'].value,this.f['Lname'].value,this.f['email'].value,this.f['type'].value).subscribe({
      next: data => {
        console.log(data);
        debugger
      },
      error: err => {
        
        //this.errorMessage = err.error.message;
        
      }
      
    });
    
  }

}
