import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  @Output()
  triggerBackdrop = new EventEmitter();
  registerMode = false;
  constructor() {
  }
  ngOnInit(): void {
  }
  registerToggle() {
    this.registerMode = !this.registerMode;
    if (this.registerMode === true) {
      this.triggerBackdrop.emit(true);
    }
  }
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
    this.triggerBackdrop.emit(event);
  }
}
