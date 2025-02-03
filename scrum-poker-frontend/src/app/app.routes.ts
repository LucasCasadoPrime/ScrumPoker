import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RoomComponent } from './pages/room/room.component';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'room',
    component: RoomComponent
  },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];
