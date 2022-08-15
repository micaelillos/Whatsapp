import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/common/services/api.service';
import { Chat } from 'src/app/common/types/chat.model';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.less']
})
export class ContactDialogComponent implements OnInit {

  stream: Subscription[] = []
  chats: Chat[] = [];
  selectedChat: Chat | undefined;
  search = ''
  constructor(private api: ApiService) { }

  onSelect = (chat: Chat) => {
    this.selectedChat = chat;
  }
  onSearchChange = (event: any) => {
    this.search = event.target.value
  }

  ngOnInit(): void {
    this.stream = [
      this.api.getAllChats().subscribe(res => this.chats = res)
    ]
  }

}


