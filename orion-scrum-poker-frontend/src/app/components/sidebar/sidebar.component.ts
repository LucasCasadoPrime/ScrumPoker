import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from "../../model/user";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class SidebarComponent {

  @Input() userInRoom?: User[] = [];
  @Output() sidebarStateForParent: EventEmitter<'out' | 'in'> = new EventEmitter<'out' | 'in'>();
  public sidebarState: 'out' | 'in' = 'out';


  public toggleSidebar() {
    this.sidebarState = this.sidebarState === 'out' ? 'in' : 'out';
    this.sidebarStateForParent.emit(this.sidebarState);
  }

}
