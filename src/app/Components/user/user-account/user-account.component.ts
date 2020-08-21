import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../user.service';
import { AuthService } from '../../auth/auth.service';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent implements OnInit, OnDestroy {
  user: any;
  form: FormGroup;
  isLoading = false;
  private authStatusSub: Subscription;
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      firstName: new FormControl(null, { validators: [Validators.required] }),
      lastName: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null),
      phoneNumber: new FormControl(null),
    });
    this.isLoading = true;
    this.userService.getUser().subscribe((userData) => {
      this.isLoading = false;
      this.user = {
        id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        state: userData.state,
        country: userData.country,
      };
      console.log('user', this.user);
      if (this.user.address == undefined) {
        var emptyStringaddress = '';
      } else {
        emptyStringaddress = this.user.address;
      }
      if (this.user.phoneNumber == undefined) {
        var emptyStringnumber = '';
      } else {
        emptyStringnumber = this.user.phoneNumber;
      }

      this.form.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        address: emptyStringaddress,
        phoneNumber: emptyStringnumber,
        // address: this.user.address,
        // phonenumber: this.user.phonenumber
      });
    });
  }

  onUpdateUser() {
    console.log('invalid ', this.form.invalid);
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    this.userService.updateUser(
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.address,
      this.form.value.phoneNumber
    );

    this.form.reset();
  }

  onPasswordChange(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.changePassword(
      form.value.passwordCurrent,
      form.value.password,
      form.value.passwordConfirm
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
