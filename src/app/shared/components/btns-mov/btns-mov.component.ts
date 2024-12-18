import { Component, Input, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';

@Component({
  selector: 'app-btns-mov',
  templateUrl: './btns-mov.component.html',
  styleUrls: ['./btns-mov.component.scss']
})
export class BtnsMovComponent implements OnInit {

  @Input() toolTip: string[] = [];
  @Input() link: string[] = [];
  @Input() visible?: boolean[] = [true, false, true];
  @Input() disable?: boolean[] = [false, false, false];
  @Input() captions?: string[] = ['', '', ''];

  constructor(
    private routeStateService: RouteStateService
  ) { }

  ngOnInit(): void {
  }

  sendBack() {
    this.routeStateService.add(this.toolTip[0].toLowerCase(), this.link[0], null, false);
  }

  sendReturn() {
    this.routeStateService.add(this.toolTip[1].toLowerCase(), this.link[1], null, false);
  }

  sendNext() {
    this.routeStateService.add(this.toolTip[2].toLowerCase(), this.link[2], null, false);
  }

}
