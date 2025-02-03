import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from "../../model/user";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { WebsocketService } from "../../services/websocket.service";
import {MessageReveal} from "../../model/message-reveal";
import {Message} from "../../model/message";
import {GifAssetsEnum} from "../../model/enum/gif-assets.enum";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {

  @Input() public userInRoom?: User[] = [];
  @Input() public isRevealed?: boolean;

  public selectedGif: string = '';

  constructor(
    private webSocketService: WebsocketService
  ) {
  }

  public flipCard() {

    const message: MessageReveal = {
      source: 'localhost',
      tag: 'reveal',
      isRevealed: this.isRevealed
    }

    this.webSocketService.messages.next(message);
  }

  public reset() {

      const message: Message = {
        source: 'localhost',
        tag: 'reset'
      }

      this.webSocketService.messages.next(message);
  }

  public everyBodyHasVoted(): boolean | undefined{
    return this.userInRoom?.every(user => user.vote !== undefined);
  }

  public shouldShowImage(): string {
    const gifTable = [GifAssetsEnum.SIGMA, GifAssetsEnum.YES, GifAssetsEnum.FIREWORKS, GifAssetsEnum.POUCE, GifAssetsEnum.PARROT, GifAssetsEnum.NOICE];

    return gifTable[Math.floor(Math.random() * gifTable.length)];
  }

}
