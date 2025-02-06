"use client"
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  // Datos quemados de recetas
  const recetas = [
    {
      name: 'Pastel de vainilla',
      ingredients: [
        { desc: 'harina', quantity: 200, unit: 'g' },
        { desc: 'azúcar', quantity: 100, unit: 'g' },
        { desc: 'huevo', quantity: 2, unit: 'unit' },
        { desc: 'leche', quantity: 1, unit: 'L' },
        { desc: 'manteca', quantity: 50, unit: 'g' },
      ],
      pvp: 35.5,
      image: '/vainilla.jpg', // Ruta de la imagen en la carpeta public
    },
    {
      name: 'Pastel de chocolate',
      ingredients: [
        { desc: 'harina', quantity: 150, unit: 'g' },
        { desc: 'azúcar', quantity: 120, unit: 'g' },
        { desc: 'huevo', quantity: 3, unit: 'unit' },
        { desc: 'leche', quantity: 0.5, unit: 'L' },
        { desc: 'cacao', quantity: 80, unit: 'g' },
      ],
      pvp: 40.0,
      image: '/chocolate.jpg', // Ruta de la imagen en la carpeta public
    },
    {
      name: 'Pastel de fresa',
      ingredients: [
        { desc: 'harina', quantity: 180, unit: 'g' },
        { desc: 'azúcar', quantity: 90, unit: 'g' },
        { desc: 'huevo', quantity: 2, unit: 'unit' },
        { desc: 'leche', quantity: 0.8, unit: 'L' },
        { desc: 'fresas', quantity: 200, unit: 'g' },
      ],
      pvp: 38.0,
      image: '/fresa.jpg', // Ruta de la imagen en la carpeta public
    },
  ];

  // Estado para el filtro de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar recetas por nombre
  const filteredRecetas = recetas.filter((receta) =>
    receta.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <h1 className="text-5xl font-bold text-center text-blue-800 mb-8">🥣 Recetas Disponibles</h1>

      {/* Filtro de búsqueda */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="🔎Buscar receta por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Lista de recetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecetas.map((receta, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Imagen de la receta */}
            <div className="relative h-48 mb-4">
              <Image
                src={receta.image}
                alt={receta.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            {/* Nombre y PVP */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{receta.name}</h2>
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-medium">PVP:</span> ${receta.pvp}
            </p>

            {/* Lista de ingredientes */}
            <h3 className="text-xl font-medium text-gray-700 mb-2">Ingredientes:</h3>
            <ul className="list-disc list-inside">
              {receta.ingredients.map((ingrediente, i) => (
                <li key={i} className="text-gray-600">
                  {ingrediente.desc}: {ingrediente.quantity} {ingrediente.unit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}