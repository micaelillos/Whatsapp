import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { ApiService, Contact } from 'src/app/common/services/api.service';
import { Timed } from 'src/app/common/types/timed.model';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-timed',
  templateUrl: './timed.component.html',
  styleUrls: ['./timed.component.scss']
})
export class TimedComponent implements OnInit {

  stream: Subscription[] = []
  dir: any = 'ltr'
  selectedContact!: Contact;

  date = new Date()
  message = 'dj';
  scheduledMessages: Timed[] = []

  constructor(public dialog: MatDialog, public api: ApiService) { }


  openDialog() {
    const dialogRef = this.dialog.open(ContactDialogComponent);
    this.stream.push(dialogRef.afterClosed().subscribe(result => {
      this.selectedContact = result
    }));
  }

  toggleDir = () => {
    this.dir = this.getOppisiteDir()
  }
  getOppisiteDir = () => {
    return this.dir === 'ltr' ? 'rtl' : 'ltr'
  }

  submit = () => {
    console.log({
      contact: this.selectedContact.id._serialized,
      date: this.date.toISOString(),
      message: this.message

    })
    this.stream.push(
      this.api.setScheduledMessage({
        chatId: this.selectedContact.id._serialized,
        time: this.date.toISOString(),
        message: this.message
      }).subscribe(res => {
        console.log(res)
      })
    )


  }

  onMessageChange = (event: any) => this.message = event.target.value;
  onDateChange = (event: any) => this.date = new Date(event.target.value)

  ngOnInit(): void {
    this.stream = [
      this.api.getScheduledMessages().subscribe(res => {
        console.log(res)
        this.scheduledMessages = res;
      })
    ]
  }


}
