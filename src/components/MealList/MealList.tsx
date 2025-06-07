import React from "react";
import { Meal } from "../../types";

interface MealListProps {
  meals: Meal[];
}

const MealList: React.FC<MealListProps> = ({ meals }) => (
  <div className="bg-gray-50 p-3 rounded shadow">
    <h2 className="font-semibold mb-1">Comidas registradas:</h2>
    <ul>
      {meals.map(meal => (
        <li key={meal.id} className="mb-1">
          <span className="font-bold">{meal.name}</span>: {meal.ingredients.join(", ")}
        </li>
      ))}
    </ul>
  </div>
);

export default MealList;
