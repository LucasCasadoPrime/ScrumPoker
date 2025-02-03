import {Component, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {VoteValueEnum} from "../../model/enum/vote-value.enum";
import {MessageVote} from "../../model/message-vote";
import { SharedDataService } from "../../services/shared-data.service";
import { WebsocketService } from "../../services/websocket.service";

@Component({
  selector: 'app-fibonacci-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './fibonacci-cards.component.html',
  styleUrls: ['./fibonacci-cards.component.scss'],
})
export class FibonacciCardsComponent {

  @Output() valueSelected: EventEmitter<VoteValueEnum> = new EventEmitter<VoteValueEnum>();

  values: VoteValueEnum[] = Object.values(VoteValueEnum);
  public selectedValue?: VoteValueEnum;


  constructor(
    private elem: ElementRef,
    private sharedDataService: SharedDataService,
    private websocketService: WebsocketService
  ) {
  }

  // @HostListener('document:click', ['$event'])
  // DocumentClick(event: Event) {
  //
  //   const message: MessageVote = {
  //     source: 'localhost',
  //     tag: 'vote',
  //     name: this.sharedDataService.currentUser?.name,
  //     vote: undefined
  //   }
  //   if (this.selectedValue != undefined) {
  //     if (!this.elem.nativeElement.contains(event.target)) {
  //       this.selectedValue = undefined
  //       this.websocketService.messages.next(message);
  //     }
  //   }
  // }

  public selectValue(value: VoteValueEnum) {
    this.selectedValue = value;
    this.valueSelected.emit(value);
  }

}
