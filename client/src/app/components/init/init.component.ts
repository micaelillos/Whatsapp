import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'src/app/common/decorators/autoUnsub.decorator';
import { ApiService } from 'src/app/common/services/api.service';
import { Contact } from 'src/app/common/types/contact.model';
import { Status } from 'src/app/common/types/Status.model';
import { demoContacts } from '../../common/mock/mock-contacts';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})

@AutoUnsubscribe
export class InitComponent implements OnInit {
  contacts: Contact[] = []
  qr = '';
  status = false;
  loading = false;
  stream: Subscription[] = []

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.stream= [
      this.api.qrcode$.subscribe(res => this.qr = res || ''),
      this.api.status$.subscribe(res => {
        this.status = res === Status.CONNECTED
        this.api.connected = this.status
        if (res) this.loading = false
      }),
      this.api.getConnectionStatus().subscribe(res => {
        this.status = res === Status.CONNECTED
        this.api.connected = this.status
      })
    ]
  }

  start() {
    if (this.status) return this.disconnect()
    this.loading = true
    this.api.connect()
    this.api.getStatus()
    this.api.getQrCode()
  }
  disconnect() {
    //todo call disconnect api
  }

  getOnline = async () => {
    this.api.getOnline()
  }
}
