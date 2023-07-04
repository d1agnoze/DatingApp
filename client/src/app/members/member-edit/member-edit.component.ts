import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { take } from "rxjs";
import { Member } from "src/app/_models/member";
import { User } from "src/app/_models/user";
import { AccountService } from "src/app/_services/account.service";
import { MembersService } from "src/app/_services/members.service";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"],
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editForm")
  editForm: NgForm;
  member: Member;
  user: User;
  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event): any {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService,
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => this.user = user,
    });
  }
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe({
      next: (member) => this.member = member,
    });
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe({
      next: () => {
        this.toastr.success("Profile Updated");
        this.editForm.reset(this.member);
      },
    });
  }
}
