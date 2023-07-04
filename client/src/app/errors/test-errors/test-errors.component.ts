import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-test-errors",
  templateUrl: "./test-errors.component.html",
  styleUrls: ["./test-errors.component.css"],
})
export class TestErrorsComponent implements OnInit {
  baseUrl = "https://localhost:7045/api/";
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  get404() {
    this.http.get(this.baseUrl + "buggy/not-found").subscribe({
      next: (res) => {
        console.table(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  get400() {
    this.http.get(this.baseUrl + "buggy/bad-request").subscribe({
      next: (res) => {
        console.table(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  get500() {
    this.http.get(this.baseUrl + "buggy/server-error").subscribe({
      next: (res) => {
        console.table(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
