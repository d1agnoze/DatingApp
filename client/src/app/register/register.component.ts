import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AccountService } from "../_services/account.service";
import { ToastrService } from "ngx-toastr";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { getDate } from "ngx-bootstrap/chronos/utils/date-getters";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  validationErrors: string[] = []
  @Output()
  registerForm: FormGroup;
  cancelRegister = new EventEmitter();
  maxDate: Date
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router : Router
  ) {
  }
  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18)
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ["", [
        Validators.required,
      ]],
      gender: ["male"],
      knownAs: ["", [
        Validators.required,
      ]],
      dateOfBirth: ["", [
        Validators.required,
      ]],
      city: ["", [
        Validators.required,
      ]],
      country: ["", [
        Validators.required,
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]],
      confirmedPassword: ["", [
        Validators.required,
        this.matchValues("password"),
      ]],
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value == control?.parent?.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/members')
      },
      error: (err) => {
       this.validationErrors = err
      },
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
