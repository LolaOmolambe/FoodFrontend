import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from "../user/user.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  isLoading = false;
  constructor(private userService: UsersService) {}

  ngOnInit(): void {}

  contactUs(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.contactUsFunction(form.value.name, form.value.email, form.value.subject, form.value.message);
  }
}
