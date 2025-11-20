import {Component} from '@angular/core';

type Color = 'w' | 'b';
type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P';
interface Piece {
  type: PieceType;
  color: Color;
}
type Square = Piece | null;

@Component({
  selector: 'app-chess-board',
  templateUrl: 'chess_game_component.html',
  styleUrls: ['chess_board_styles.scss'],
})
export class ChessBoardComponent {
  // 8x8 board, [rank][file], rank 0 = 8th rank, file 0 = 'a'
  board: Square[][] = [];

  selected: { r: number; f: number } | null = null;
  turn: Color = 'w';

  initBoard(): void {
    const backRank: PieceType[] = ['R','N','B','Q','K','B','N','R'];
    // 8th rank (black)
    const r8: Square[] = backRank.map(t => ({ type: t, color: 'b' }));
    const r7: Square[] = Array(8).fill({ type: 'P', color: 'b' });
    const r6: Square[] = Array(8).fill(null);
    const r5: Square[] = Array(8).fill(null);
    const r4: Square[] = Array(8).fill(null);
    const r3: Square[] = Array(8).fill(null);
    const r2: Square[] = Array(8).fill({ type: 'P', color: 'w' });
    const r1: Square[] = backRank.map(t => ({ type: t, color: 'w' }));

    this.board = [r8, r7, r6, r5, r4, r3, r2, r1].map(rank => rank.map(p => p ? { ...p } : null));
    this.selected = null;
    this.turn = 'w';
  }

  squareColor(r: number, f: number): 'light' | 'dark' {
    return (r + f) % 2 === 0 ? 'light' : 'dark';
  }

  pieceChar(p: Piece | null): string {
    if (!p) return '';
    const map: Record<PieceType, string> = {
      K: p.color === 'w' ? '♔' : '♚',
      Q: p.color === 'w' ? '♕' : '♛',
      R: p.color === 'w' ? '♖' : '♜',
      B: p.color === 'w' ? '♗' : '♝',
      N: p.color === 'w' ? '♘' : '♞',
      P: p.color === 'w' ? '♙' : '♟',
    };
    return map[p.type];
  }

  onSquareClick(r: number, f: number): void {
    if (this.board[r][f] != null) {
      this.selected = { r, f };
      this.calculatePossibleMoves(r,f);
    }
  }

  isSelected(r: number, f: number): boolean {
    return this.selected?.r === r && this.selected?.f === f;
  }

  calculatePossibleMoves(r: number, f:number): [] {

    return []
  }

  protected readonly String = String;
}
