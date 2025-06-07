import React, { useState } from "react";
import { WEEK_DAYS, WeekDay } from "./data/weekDays";
import { DEFAULT_MEALS } from "./data/defaultMeals";
import { Meal, WeekPlan } from "./types";
import MealSelector from "./components/MealSelector";
import MealList from "./components/MealList";
import AddMealForm from "./components/AddMealForm";
import ShoppingListModal from "./components/ShoppingListModal";

function getInitialWeekPlan(): WeekPlan {
  return WEEK_DAYS.reduce(
    (acc, day) => ({ ...acc, [day]: { lunch: null, dinner: null } }),
    {} as WeekPlan
  );
}

const App: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>(DEFAULT_MEALS);
  const [weekPlan, setWeekPlan] = useState<WeekPlan>(getInitialWeekPlan);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);

  // Añadir o quitar comidas en el plan semanal
  function updateMeal(day: WeekDay, type: "lunch" | "dinner", mealId: number) {
    setWeekPlan(plan => ({
      ...plan,
      [day]: { ...plan[day], [type]: mealId }
    }));
  }
  function removeMeal(day: WeekDay, type: "lunch" | "dinner") {
    setWeekPlan(plan => ({
      ...plan,
      [day]: { ...plan[day], [type]: null }
    }));
  }

  // Añadir nueva comida
  function handleAddMeal(newMeal: { name: string; ingredients: string[] }) {
    setMeals(prev => [
      ...prev,
      {
        ...newMeal,
        id: prev.length ? Math.max(...prev.map(m => m.id)) + 1 : 1,
      },
    ]);
    setShowAddMeal(false);
  }

  // Calcular lista de la compra
  // Devuelve un array de objetos: { nombre ingrediente, cantidad }
function getShoppingListDetailed() {
  const usedIds: number[] = [];
  Object.values(weekPlan).forEach(({ lunch, dinner }) => {
    if (lunch) usedIds.push(lunch);
    if (dinner) usedIds.push(dinner);
  });
  const allIngredients = usedIds
    .map(id => meals.find(m => m.id === id)?.ingredients || [])
    .flat();

  // Contamos cuántas veces aparece cada ingrediente
  const ingredientCount: Record<string, number> = {};
  allIngredients.forEach(ingredient => {
    ingredientCount[ingredient] = (ingredientCount[ingredient] ?? 0) + 1;
  });

  // Lo convertimos en un array para mostrarlo fácilmente
  return Object.entries(ingredientCount).map(([name, count]) => ({
    name,
    count,
  }));
}


  return (
    <div className="max-w-2xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center">Planificador Semanal de Comidas</h1>
      <table className="w-full border mb-4">
        <thead>
          <tr>
            <th className="border p-2">Día</th>
            <th className="border p-2">Almuerzo</th>
            <th className="border p-2">Cena</th>
          </tr>
        </thead>
        <tbody>
          {WEEK_DAYS.map(day => (
            <tr key={day}>
              <td className="border p-2 font-semibold">{day}</td>
              <td className="border p-2">
                <MealSelector
                  meals={meals}
                  selectedMealId={weekPlan[day].lunch}
                  onSelect={mealId => updateMeal(day, "lunch", mealId)}
                  onRemove={() => removeMeal(day, "lunch")}
                />
              </td>
              <td className="border p-2">
                <MealSelector
                  meals={meals}
                  selectedMealId={weekPlan[day].dinner}
                  onSelect={mealId => updateMeal(day, "dinner", mealId)}
                  onRemove={() => removeMeal(day, "dinner")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setShowAddMeal(true)}
          className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >Añadir nueva comida</button>
        <button
          onClick={() => setShowShoppingList(true)}
          className="bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded"
        >Lista de la compra</button>
      </div>

      {showAddMeal && (
        <AddMealForm
          onAdd={handleAddMeal}
          onCancel={() => setShowAddMeal(false)}
        />
      )}

      {showShoppingList && (
        <ShoppingListModal
          ingredients={getShoppingListDetailed()}
          onClose={() => setShowShoppingList(false)}
        />
      )}


      <MealList meals={meals} />
    </div>
  );
};

export default App;
