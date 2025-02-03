import { Injectable } from '@angular/core';
import { User } from "../model/user";
import {Room} from "../model/room";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public currentUser?: User;
  public currentRoom?: Room;
}
