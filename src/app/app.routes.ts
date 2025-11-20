import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../chess/chess_board_component').then(m => m.ChessBoardComponent),
  },
  { path: '**', redirectTo: '' },
];
