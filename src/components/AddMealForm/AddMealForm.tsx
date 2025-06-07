import React, { useState } from "react";

interface AddMealFormProps {
  onAdd: (meal: { name: string; ingredients: string[] }) => void;
  onCancel: () => void;
}

const AddMealForm: React.FC<AddMealFormProps> = ({ onAdd, onCancel }) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !ingredients) return;
    onAdd({
      name,
      ingredients: ingredients.split(",").map(i => i.trim())
    });
    setName("");
    setIngredients("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded p-4 mb-4 shadow-lg">
      <h2 className="font-semibold mb-2">Nueva comida</h2>
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Nombre de la comida"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <textarea
        className="border p-2 mb-2 w-full"
        placeholder="Ingredientes (separados por coma)"
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >Añadir</button>
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          onClick={onCancel}
        >Cancelar</button>
      </div>
    </form>
  );
};

export default AddMealForm;
