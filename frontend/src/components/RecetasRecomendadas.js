// components/RecetaAleatoria.js
import Image from 'next/image';

const recetas = [
  {
    name: 'Pastel de vainilla',
    ingredients: [
      { desc: 'harina', quantity: 200, unit: 'g' },
      { desc: 'azúcar', quantity: 100, unit: 'g' },
      { desc: 'huevo', quantity: 2, unit: 'unidades' },
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
      { desc: 'huevo', quantity: 3, unit: 'unidades' },
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
      { desc: 'huevo', quantity: 2, unit: 'unidades' },
      { desc: 'leche', quantity: 0.8, unit: 'L' },
      { desc: 'fresas', quantity: 200, unit: 'g' },
    ],
    pvp: 38.0,
    image: '/fresa.jpg', // Ruta de la imagen en la carpeta public
  },
];

export default function RecetaAleatoria() {
  // Seleccionar una receta aleatoria
  const recetaAleatoria = recetas[Math.floor(Math.random() * recetas.length)];

  return (
    <div className="
    bg-gradient-to-r from-purple-400 to-blue-400 
    p-6 rounded-lg shadow-md 
    hover:shadow-lg transition-shadow duration-300 
    hover:bg-gradient-to-r 
    hover:from-blue-400 hover:to-purple-400">
      {/* Imagen de la receta */}
      <div className="relative h-48 mb-4">
        <Image
          src={recetaAleatoria.image}
          alt={recetaAleatoria.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Nombre y PVP */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{recetaAleatoria.name}</h2>
      <p className="text-lg text-gray-700 mb-4">
        <span className="font-medium ">PVP:</span> ${recetaAleatoria.pvp}
      </p>

      {/* Lista de ingredientes */}
      <h3 className="text-xl font-medium text-gray-700 mb-2">Ingredientes:</h3>
      <ul className="list-disc list-inside">
        {recetaAleatoria.ingredients.map((ingrediente, i) => (
          <li key={i} className="text-gray-600">
            {ingrediente.desc}: {ingrediente.quantity} {ingrediente.unit}
          </li>
        ))}
      </ul>
    </div>
  );
}