import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from "@kolkov/ngx-gallery";
import { TabDirective, TabsetComponent } from "ngx-bootstrap/tabs";
import { Member } from "src/app/_models/member";
import { Message } from "src/app/_models/message";
import { MembersService } from "src/app/_services/members.service";
import { MessageService } from "src/app/_services/message.service";

@Component({
  selector: "app-members-detail",
  templateUrl: "./members-detail.component.html",
  styleUrls: ["./members-detail.component.css"],
})
export class MembersDetailComponent implements OnInit {
  @ViewChild('memberTabs',{static: true}) memberTabs: TabsetComponent;

  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTabs: TabDirective
  messages: Message[] = []

  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute,
    private messageService : MessageService
  ) {
  }
  ngOnInit(): void {
    this.route.data.subscribe({
      next: data =>{
        this.member = data["member"];
      }
    })
    this.galleryOptions = [{
      width: "100%",
      height: "600px",
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false,
    }];
    this.galleryImages = this.getImages();
    this.route.queryParams.subscribe({
      next: (p) => {
        p?.['tab'] ? this.selectTab(p?.['tab']) : this.selectTab(0)
      }
    })
  }
  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photos of this.member.photos) {
      imageUrls.push({
        small: photos?.url,
        medium: photos?.url,
        big: photos?.url,
      });
    }
    return imageUrls;
  }
  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get("username"))
      .subscribe({
        next: (member) => {
          this.member = member;

        },
        error: (err) => console.log(err),
      });
  }
  loadMessages() {
    this.messageService.getMessageThread(this.member.username).subscribe({
      next: (res) => {
        this.messages = res;
      },
    });
  }
  onTabActivateed(data : TabDirective){
    this.activeTabs = data
    if (this.activeTabs.heading == 'Message' && this.messages.length === 0) {
      this.loadMessages()
    }
  }
  selectTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true
  }
}
