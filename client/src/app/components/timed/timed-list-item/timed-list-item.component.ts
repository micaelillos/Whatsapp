import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timed-list-item',
  templateUrl: './timed-list-item.component.html',
  styleUrls: ['./timed-list-item.component.less']
})
export class TimedListItemComponent implements OnInit {

  @Input() name! : string;
  @Input() date!: string;
  @Input() message!: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
