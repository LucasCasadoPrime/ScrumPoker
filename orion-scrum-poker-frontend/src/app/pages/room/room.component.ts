import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataService } from "../../services/shared-data.service";
import {Room} from "../../model/room";
import { WebsocketService } from "../../services/websocket.service";
import { FibonacciCardsComponent } from "../../components/fibonacci-cards/fibonacci-cards.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {VoteValueEnum} from "../../model/enum/vote-value.enum";
import {MessageVote} from "../../model/message-vote";
import {Vote} from "../../model/vote";
import { BoardComponent } from "../../components/board/board.component";

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, FibonacciCardsComponent, SidebarComponent, BoardComponent],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {

  public room?: Room = this.sharedDataService.currentRoom;
  public sidebarState: 'out' | 'in' = 'out';

  constructor(
    private websocketService: WebsocketService,
    private sharedDataService: SharedDataService
  ) {
    this.websocketService.messages.subscribe(msg => {
      const json: string = JSON.stringify(msg);
      this.room = JSON.parse(json);
    });
  }

  public handleSidebarState(value: 'out' | 'in'): void {
    this.sidebarState = value;
  }

  public handleCardSelected(value: VoteValueEnum): void {

    const vote: Vote = {
      value: value,
      isVoted: true
    }

    const message: MessageVote = {
      source: 'localhost',
      tag: 'vote',
      name: this.sharedDataService.currentUser?.name,
      vote: vote
    }

    this.websocketService.messages.next(message);
  }

}
