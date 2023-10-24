import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { CustomValidator } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {

  public form: FormGroup;
  public busy = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.required
      ])],
      document: [{ value: '', disabled: true }],
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
    });
  }

  ngOnInit(): void {
    this.busy = true;
    this
      .service
      .getProfile()
      .subscribe(
        {
          next: (data: any) => {
            this.form.controls['name'].setValue(data.name);
            this.form.controls['document'].setValue(data.document);
            this.form.controls['email'].setValue(data.email);
          },
          error: (err: any) => console.log(err),
          complete: () => this.busy = false
      });    
  }

  submit() {
    this.busy = true;
    this
      .service
      .updateProfile(this.form.value)
      .subscribe(
        {
          next: (data: any) => this.toastr.success(data.message, 'Atualização Completa!'),
          error: (err: any) => console.log(err),
          complete: () => this.busy = false
        }
      );
  }  
}