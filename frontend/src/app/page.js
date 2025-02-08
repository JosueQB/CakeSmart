"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [productIngredients, setProductIngredients] = useState([]);
  const [products, setProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // 1. Cargar la lista de 'product-ingredients'
    const fetchProductIngredients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/product-ingredients/");
        const data = await response.json();
        setProductIngredients(data);
      } catch (error) {
        console.error("Error al cargar product-ingredients:", error);
      }
    };

    // 2. Cargar la lista de productos completos
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/product/");
        const data = await response.json();

        // Creamos un objeto donde la clave sea product.id
        // por ejemplo productsById[1] = { id: 1, name: "Pizza", ... }
        const productsById = {};
        data.forEach((prod) => {
          productsById[prod.id] = prod;
        });

        setProducts(productsById);
      } catch (error) {
        console.error("Error al cargar products:", error);
      }
    };

    fetchProductIngredients();
    fetchProducts();
  }, []);

  // Filtrar por nombre de producto (si ya tenemos los detalles)
  const filteredItems = productIngredients.filter((item) => {
    const productInfo = products[item.product]; // Detalles del producto con ID item.product
    if (!productInfo) return false; // si todavía no cargó, lo excluimos o mostramos placeholder

    return productInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Agrupamos por product (que es ID)
  const groupedByProductId = filteredItems.reduce((acc, current) => {
    const { product, ingredient_name, needed_quantity, unit } = current;

    if (!acc[product]) {
      acc[product] = {
        productId: product,
        ingredients: [],
      };
    }

    acc[product].ingredients.push({ ingredient_name, needed_quantity, unit });
    return acc;
  }, {});

  const groupedProductsArray = Object.values(groupedByProductId);

  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <h1 className="text-5xl font-bold text-center text-blue-800 mb-8">
        🥣 Recetas Disponibles
      </h1>

      {/* Campo de búsqueda */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="🔎 Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Mapeamos cada grupo (un producto y sus ingredientes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupedProductsArray.map((group, index) => {
          const { productId, ingredients } = group;
          const productInfo = products[productId];

          // Si todavía no se han cargado los detalles de este producto,
          // podrías mostrar un "Loading..." o algo similar
          if (!productInfo) {
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-2">Cargando...</h2>
              </div>
            );
          }

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Imagen del producto */}
              <div className="relative h-48 mb-4">
                <Image
                  src={productInfo.image}
                  alt={productInfo.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>

              {/* Nombre y PVP */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {productInfo.name}
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                <span className="font-medium">PVP:</span> ${productInfo.pvp}
              </p>

              {/* Ingredientes */}
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Ingredientes:
              </h3>
              <ul className="list-disc list-inside mb-4">
                {ingredients.map((item, idx) => (
                  <li key={idx} className="text-gray-600">
                    {item.ingredient_name || "N/A"}:{" "}
                    {item.needed_quantity} {item.unit}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
