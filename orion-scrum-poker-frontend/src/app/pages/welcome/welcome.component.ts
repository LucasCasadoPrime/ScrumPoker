import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from "@angular/forms";
import { SharedDataService } from "../../services/shared-data.service";
import { WebsocketService } from "../../services/websocket.service";
import {MessageJoin} from "../../model/message-join";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  public name!: string;
  public messageJoin: MessageJoin = {
    source: 'localhost',
    tag: 'join',
    name: ''
  }

  constructor(
    public sharedDataService: SharedDataService,
    public WebsocketService: WebsocketService,
    public router: Router
  ) {
  }

  public onSubmit(): void {
    this.sharedDataService.currentUser = {name: this.name};
    this.messageJoin.name = this.name;
    this.WebsocketService.messages.next(this.messageJoin);
    this.router.navigate(['room']).then();
  }

}
