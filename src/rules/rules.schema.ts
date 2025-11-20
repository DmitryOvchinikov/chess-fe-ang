export type Direction = [number, number]; // [r, f]

export interface LeaperMoves { kind: 'leaper'; directions: Direction[]; }
export interface RiderMoves  { kind: 'rider';  directions: Direction[]; max?: number; }

export type MovesDef = LeaperMoves | RiderMoves;

export type CaptureDef =
  | 'sameAsMove'
  | 'none'
  | { directions: Direction[] };

export interface FirstMoveBonus {
  extra: number;                          // how many extra squares forward
  startsOnRank: number;                   // e.g., 6 for white pawns in your board indexing
  forward: Direction;                     // e.g., [-1,0] for white
}

export interface PieceRule {
  type: string;                           // 'P','N','B','R','Q','K', or custom like 'S'
  colorAgnostic?: boolean;                // most pieces are
  moves: MovesDef;
  capture?: CaptureDef;
  blockers?: 'stopOnBlock' | 'ignore';    // riders stop on block; leapers ignore
  firstMoveBonus?: FirstMoveBonus;        // for pawns or variants
// You can add specials later: castling, en passant, promotion, etc.
}

// Coordinate system: [file, rank] zero-based (0..7), matching default.json
export type Coord = [number, number];

// -------- Piece move primitives (aligned to default.json) --------
export type Vector = Coord;

export interface StepMove {
  type: 'step';
  vectors: Vector[];       // king-like one-step directions
  maxSteps?: number;       // usually 1 for step
  capture?: 'any' | 'none';
  blockedBy?: 'any' | 'none';
}

export interface RayMove {
  type: 'ray';
  vectors: Vector[];       // sliding directions (rook/bishop/queen)
  maxSteps?: number;       // default 7 on 8x8
  capture?: 'any' | 'none';
  blockedBy?: 'any' | 'none';
}

export interface LeapMove {
  type: 'leap';
  vectors: Vector[];       // knight jumps
  capture?: 'any' | 'none';
  blockedBy?: 'any' | 'none'; // typically 'none' for leapers
}

// Pawn-like specialized moves
export interface StepForwardMove {
  type: 'stepForward';
  color: 'w' | 'b';
  vector: Vector;          // forward 1
  maxSteps?: number;       // usually 1
  capture?: 'any' | 'none';
  blockedBy?: 'any' | 'none';
}

export interface DoubleStepFromStartMove {
  type: 'doubleStepFromStart';
  color: 'w' | 'b';
  vector: Vector;          // forward 2
  fromRank: number;        // 6 for white, 1 for black in default.json
}

export interface CaptureDiagonalMove {
  type: 'captureDiagonal';
  color: 'w' | 'b';
  vectors: Vector[];       // diagonals for capture only
}

export interface EnPassantMove {
  type: 'enPassant';
  color: 'w' | 'b';
  vectors: Vector[];       // capture vectors as if diagonally
}

export type MoveDef =
  | StepMove
  | RayMove
  | LeapMove
  | StepForwardMove
  | DoubleStepFromStartMove
  | CaptureDiagonalMove
  | EnPassantMove;

// -------- Pieces section (aligned to default.json) --------
export type PieceCode = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P';

export interface UnicodeMap {
  w: string;
  b: string;
}

export interface PieceEntry {
  name: string;
  unicode: UnicodeMap;
  moves: MoveDef[];
  value: number | null;
  constraints?: {
    oneKingPerSide?: boolean;
  };
  castleEligible?: boolean; // for rooks
  promotion?: {
    w: { to: PieceCode[]; onRank: number };
    b: { to: PieceCode[]; onRank: number };
  };
}

export type PiecesMap = Record<PieceCode, PieceEntry>;

// -------- Board and rules (aligned to default.json) --------
export interface StartPosition {
  // ranks[rank][file] -> "wP"/"bK"/null etc.
  ranks: (string | null)[][];
}

export interface BoardDef {
  files?: number; // default 8 if omitted
  ranks?: number; // default 8 if omitted
  startPosition?: StartPosition;
}

export interface TurnsDef {
  start: 'w' | 'b';
  alternate: boolean;
}

export interface ChecksDef {
  kingMustNotBeInCheckAfterMove: boolean;
  cannotEndTurnInCheck: boolean;
  checkmateEndsGame: boolean;
  stalemateIsDraw: boolean;
}

export interface CastleSideDef {
  kingFrom: { w: Coord; b: Coord };
  kingTo:   { w: Coord; b: Coord };
  rookFrom: { w: Coord; b: Coord };
  rookTo:   { w: Coord; b: Coord };
  squaresBetweenMustBeEmpty: boolean;
  kingMayNotPassThroughCheck: boolean;
  kingAndRookMustNotHaveMoved: boolean;
}

export interface CastlingDef {
  allowed: boolean;
  sides: {
    kingSide: CastleSideDef;
    queenSide: CastleSideDef;
  };
}

export interface EnPassantDef {
  allowed: boolean;
  captureOnlyImmediately: boolean;
}

export interface PromotionRuleDef {
  mustPromote: boolean;
  default: PieceCode; // default promoted piece
}

export interface RulesDef {
  turns: TurnsDef;
  checks: ChecksDef;
  castling: CastlingDef;
  enPassant: EnPassantDef;
  fiftyMoveRule?: boolean;             // default.json uses boolean
  threefoldRepetition?: boolean;       // default.json uses boolean
  insufficientMaterialDraw?: boolean;  // default.json uses boolean
  promotion: PromotionRuleDef;
  scoring?: {
    pieceValues?: Partial<Record<PieceCode, number | null>>;
  };
}

// -------- Top-level schema (aligned to default.json) --------
export interface RulesSchema {
  version: string;
  board?: BoardDef;
  pieces: PiecesMap;
  rules: RulesDef;
}
