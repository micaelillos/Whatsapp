import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss']
})
export class ContactListItemComponent implements OnInit {

  @Input() profilePic?: string | null;
  @Input() name?: string | null;
  @Input() chatId?: string 

  constructor() { }

  ngOnInit(): void {
  }

}
