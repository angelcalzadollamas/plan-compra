import React from "react";

interface ShoppingListModalProps {
  ingredients: { name: string; count: number }[];
  onClose: () => void;
}

const ShoppingListModal: React.FC<ShoppingListModalProps> = ({ ingredients, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <h2 className="font-bold mb-3 text-lg">Lista de la compra</h2>
      <ul className="mb-4">
        {ingredients.length === 0
          ? <li>No hay ingredientes.</li>
          : ingredients.map((ing, i) => (
              <li key={i}>
                - {ing.name}
                <span className="font-mono ml-2">x{ing.count}</span>
              </li>
            ))
        }
      </ul>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={onClose}
      >Cerrar</button>
    </div>
  </div>
);

export default ShoppingListModal;
