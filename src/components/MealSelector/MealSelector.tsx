import React from "react";
import { Meal } from "../../types";

interface MealSelectorProps {
  meals: Meal[];
  selectedMealId: number | null;
  onSelect: (mealId: number) => void;
  onRemove: () => void;
}

const MealSelector: React.FC<MealSelectorProps> = ({
  meals,
  selectedMealId,
  onSelect,
  onRemove
}) => (
  <div className="flex gap-2 items-center">
    <select
      value={selectedMealId ?? ""}
      onChange={e => onSelect(Number(e.target.value))}
      className="border rounded p-1"
    >
      <option value="">Seleccionar comida</option>
      {meals.map(meal => (
        <option value={meal.id} key={meal.id}>{meal.name}</option>
      ))}
    </select>
    {selectedMealId && (
      <button
        onClick={onRemove}
        className="bg-red-200 px-2 rounded hover:bg-red-300"
      >
        Quitar
      </button>
    )}
  </div>
);

export default MealSelector;
