import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service'
import { Router } from '@angular/router';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  

  LoginForm = new FormGroup({
    email : new FormControl("",[Validators.required, Validators.email]),
    pwd : new FormControl("", [Validators.required, Validators.maxLength(10)])
  });

  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  get Email(): FormControl {
    return this.LoginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.LoginForm.get('pwd') as FormControl;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.LoginForm.controls;
  }

  constructor(private authService: AuthService, private storageService: StorageService,private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }


  LoginSubmit(){

    this.router.navigate(['/cust']);

    this.submitted = true;
   
    if(this.LoginForm.invalid) {
      return
    }

    this.authService.login(this.Email, this.PWD).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
  }


