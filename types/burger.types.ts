// types/burger.types.ts
export type IngredientType = 'pan-inferior' | 'carne' | 'queso' | 'lechuga' | 'pan-superior';

export interface Ingredient {
  id: string;
  type: IngredientType;
  position: number; // Posición Y en el stack
  timestamp: number;
}

export interface IngredientDefinition {
  type: IngredientType;
  name: string;
  color: string; // Para el botón
  icon: string; // Emoji o nombre de ícono
  modelPath: string;
  height: number; // Altura del ingrediente para calcular apilamiento
}

export interface BurgerState {
  ingredients: Ingredient[];
}