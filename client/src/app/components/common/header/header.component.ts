import { Component } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {

  constructor(public api: ApiService) {}
 
}
