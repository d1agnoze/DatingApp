import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { User } from "./_models/user";
import { AccountService } from "./_services/account.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "client";
  users: any;
  backdrop: boolean;
  constructor(
    private accountService: AccountService,
  ) {
    this.backdrop = false;
  }
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem("user"));
    this.accountService.setCurrentUser(user);
  }
  backdropHandler(event:boolean){
    this.backdrop = event
  }
}
