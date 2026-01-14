// types/dice.types.ts
export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface DiceRoll {
  value: DiceValue;
  timestamp: number;
}

export interface DiceState {
  currentValue: DiceValue;
  isRolling: boolean;
  history: DiceRoll[];
}