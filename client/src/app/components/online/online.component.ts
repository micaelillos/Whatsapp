import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'src/app/common/decorators/autoUnsub.decorator';
import { ApiService} from 'src/app/common/services/api.service';
import { Contact } from 'src/app/common/types/contact.model';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.less']
})

@AutoUnsubscribe
export class OnlineComponent implements OnInit {
  stream: Subscription[] = []
  contacts: Contact[] = []

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getOnline()
    this.stream = [
      this.api.contacts$.subscribe(res => this.contacts = res)
    ]
  }
}
