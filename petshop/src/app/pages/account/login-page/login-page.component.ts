import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CustomValidator } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public busy = false;

  constructor(
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
    const token = localStorage.getItem('petshop.token');
    if (token) {
      this.busy = true;
      this.data
      .refreshToken()
      .subscribe(
        {
          next: (value: any) => localStorage.setItem('petshop.token', value.token),
          error: () => localStorage.clear(),
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
        next: (value: any) => localStorage.setItem('petshop.token', value.token),
        error: (err) => console.log(err),
        complete: () => this.busy = false
      }      
    );
  }
}
