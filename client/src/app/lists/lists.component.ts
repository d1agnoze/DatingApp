import { Component, OnInit } from "@angular/core";
import { Member } from "../_models/member";
import { MembersService } from "../_services/members.service";
import { Pagination } from "../_models/pagination";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.css"],
})
export class ListsComponent implements OnInit {
  member: Partial<Member[]>;
  predicate = "liked";
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;
  constructor(private memberService: MembersService) {
  }
  ngOnInit(): void {
    this.loadLikes();
  }
  loadLikes() {
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe({
        next: (res) => {
          this.member = res.result;
          this.pagination = res.pagination
        },
      });
  }
  pageChanged(event: any){
    this.pageNumber = event.page
    this.loadLikes()
  }
}
