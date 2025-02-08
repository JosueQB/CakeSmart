// components/Dashboard.js
import Image from 'next/image';

export default function Dashboard() {
  return (
    <div className="container bg-white p-6 mb-auto rounded-lg shadow-md">
      {/* Imagen del dashboard */}
      <div className="relative h-48 mb-4">
        <Image
          src="/dashboard.png" // Ruta de la imagen en la carpeta public
          alt="Dashboard"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div>
        <div className='contents content-center'>
          <h4 className="text-xl font-medium text-gray-700">Ventas del Mes</h4>
          <p className="text-gray-600 text-center px-3 py-2 rounded hover:bg-green-500 hover:text-center hover:font-bold hover:text-white">$15,000</p>
        </div>

      </div>

      {/* Información adicional */}
      <div className="space-x-1 content-between">
        <div>
          <h4 className="text-xl font-medium text-gray-700">Recetas Más Vendidas</h4>
          <ul className="list-disc list-inside">
            <li className="text-gray-600">Pastel de Chocolate</li>
            <li className="text-gray-600">Pastel de Vainilla</li>
            <li className="text-gray-600">Pastel de Fresa</li>
          </ul>
        </div>
      </div>
    </div>
  );
}