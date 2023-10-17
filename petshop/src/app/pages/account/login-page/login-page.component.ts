import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';
import { Security } from 'src/app/utils/security.util';
import { CustomValidator } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public busy = false;

  constructor(
    private router: Router,
    private data: DataService,
    private fb: FormBuilder    
    ) { 
      this.form = this.fb.group({
        username: ['', Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf()
        ])],
        password: ['', Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required          
        ])]
      });
    }

  ngOnInit(): void {
    const token = Security.getToken();    
    if (token) {
      this.busy = true;
      this.data
      .refreshToken()
      .subscribe(
        {
          next: (value: any) => this.setUser(value.customer, value.token),
          error: () => Security.clear(),
          complete: () => this.busy = false
        }      
      );      
    }
  }

  submit() {
    this.busy = true;
    this.data
    .authenticate(this.form.value)
    .subscribe(
      {
        next: (value: any) => this.setUser(value.customer, value.token),
        error: (err) => console.log(err),
        complete: () => this.busy = false
      }      
    );
  }

  setUser(user: User, token: string) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }
}
