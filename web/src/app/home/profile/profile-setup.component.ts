import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '../../shared/validation.service';
import { PhoneTypeEnum } from '../../shared/enum';


@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent implements OnInit {
  form: FormGroup;
  listPhoneType: any = [];

  constructor(private _fb: FormBuilder) {
    this.getPhoneType();
  }

  ngOnInit() {
    this.form =  this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: new FormControl(),
      email: ['', [Validators.required, ValidationService.emailValidator]],
      phones: new FormArray([
        this.initPhone()
      ])
    });
  }

  initPhone() {
    return this._fb.group({
      value: ['', [Validators.required, ValidationService.phoneValidator]],
      type: ['', Validators.required]
    });
  }

  getPhoneType() {
    for (let item in PhoneTypeEnum) {
      if (isNaN(Number(item))) {
        this.listPhoneType.push({name: item});
      }
    }
  }

  addPhone() {
    const control = <FormArray>this.form.controls['phones'];
    control.push(this.initPhone());
  }

  removePhone(i: number) {
    const control = <FormArray>this.form.controls['phones'];
    control.removeAt(i);
  }

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }
}
