export interface Meal {
    id: number;
    name: string;
    ingredients: string[];
  }
  
  export interface WeekPlan {
    [day: string]: {
      lunch: number | null;
      dinner: number | null;
    };
  }
  