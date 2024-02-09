import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";
  

  
  get f(): { [key: string]: AbstractControl } {
    return this.registerform.controls;
  }

  registerform = new FormGroup({
    firstname : new FormControl("", [Validators.required, Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    Lname : new FormControl("", [Validators.required, Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    email : new FormControl("",[Validators.required, Validators.email]),
    pwd : new FormControl("", [Validators.required, Validators.maxLength(10)]),
    
  });

  submitted = false;

  get firstName(): FormControl {
    return this.registerform.get('firstname') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerform.get('Lname') as FormControl;
  }
  get Email(): FormControl {
    return this.registerform.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.registerform.get('pwd') as FormControl;
  }
  

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registerSubmit(){
    debugger
    console.log(this.registerform.value)

    this.submitted = true;
    if(this.registerform.invalid) {
      return
    }

    console.log(this.firstName,this.Email)

    this.authService.register(this.firstName.value,this.LastName.value,this.Email.value,this.PWD.value).subscribe({
      next: data => {
        console.log(data);
        
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        
      },
      error: err => {
        
        //this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  


}
