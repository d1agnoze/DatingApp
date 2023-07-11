import { Component, OnInit } from "@angular/core";
import { AccountService } from "../_services/account.service";
import { Observable } from "rxjs";
import { User } from "../_models/user";
import { Route, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }
  login() {
    this.accountService.login(this.model).subscribe({
      next: (res) => {
        this.router.navigateByUrl("/members");
      },
    });
  }
  logOut() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
      next: (res: any) => {
        if (res) {
          console.table(res);
          this.model.username = res.userName;
        }
      },
      error: (err) => console.log(err),
    });
  }
}
