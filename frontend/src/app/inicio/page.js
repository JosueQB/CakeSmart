import RecetasRecomendadas from '../../components/RecetasRecomendadas';
import Dashboard from '../../components/dashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Encabezado */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800">Produccion Actual</h1>
        <h2 className="text-2xl text-gray-600">Se mostrara un dashboard</h2>
      </header>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-10">
        {/* Sección de Receta Aleatoria (Izquierda) */}
        <div>
          <h3 className="text-2xl font-bold text-blue-800 mb-4 rounded">Receta Recomendada</h3>
          <RecetasRecomendadas />
        </div>

        {/* Sección de Dashboard (Derecha) */}
        <div>
        <h3 className="text-2xl font-bold text-blue-800 mb-4 rounded">Dashboard 📈</h3>
          <Dashboard />
        </div>
      </div>
    </div>
  );
}