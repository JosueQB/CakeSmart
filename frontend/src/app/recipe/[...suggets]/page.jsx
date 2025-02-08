"use client";
import { useState, useEffect } from "react";

export default function ProductIngredientsCrud() {

  // Lista de "product-ingredients" (nuestras recetas o ingredientes asignados)
  const [items, setItems] = useState([]);
 
  const [productsById, setProductsById] = useState({});

  // Estados de carga y mensajes
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Formulario CRUD
  const [formData, setFormData] = useState({
    id: null,           // null => crear, si existe => editar
    product: "",        // aquí guardamos el ID del producto (o su nombre, según tu modelo)
    ingredient_name: "",
    needed_quantity: "",
    unit: "",
  });

  // Búsqueda por nombre de ingrediente
  const [searchTerm, setSearchTerm] = useState("");

  // ---------------------------
  // 2. USE EFFECT (CARGAR DATOS)
  // ---------------------------
  useEffect(() => {
    fetchAllData();
  }, []);

  // Cargamos todos los datos (product-ingredients y products) en paralelo
  const fetchAllData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      await Promise.all([fetchProductIngredients(), fetchProducts()]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // 3. FETCHES
  // ---------------------------

  // 3.1. Cargar la lista de product-ingredients
  const fetchProductIngredients = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/product-ingredients/");
    if (!res.ok) {
      throw new Error("Error al cargar la lista de product-ingredients");
    }
    const data = await res.json();
    setItems(data);
  };

  // 3.2. Cargar la lista de productos para mostrar nombres en lugar de IDs
  const fetchProducts = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/products/");
    if (!res.ok) {
      throw new Error("Error al cargar la lista de productos");
    }
    const data = await res.json();

    // Creamos un objeto { productoId: { id, name, ... } }
    const tempDict = {};
    data.forEach((prod) => {
      tempDict[prod.id] = prod;
    });
    setProductsById(tempDict);
  };

  // ---------------------------
  // 4. HANDLERS CRUD
  // ---------------------------

  // 4.1 Manejar cambios de los inputs en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 4.2 Validar formulario sencillo
  const validateForm = () => {
    if (!formData.product) {
      setErrorMessage("El campo 'product' (ID) es obligatorio");
      return false;
    }
    if (!formData.ingredient_name.trim()) {
      setErrorMessage("El campo 'ingredient_name' es obligatorio");
      return false;
    }
    return true;
  };

  // 4.3 Crear o Editar (POST o PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validaciones
    if (!validateForm()) return;

    try {
      let method = "POST";
      let url = "http://127.0.0.1:8000/api/product-ingredients/";

      // Si tenemos formData.id, significa que editamos
      if (formData.id) {
        method = "PUT";
        url = `http://127.0.0.1:8000/api/product-ingredients/${formData.id}/`;
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: formData.product,
          ingredient_name: formData.ingredient_name,
          needed_quantity: formData.needed_quantity,
          unit: formData.unit,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al guardar el producto-ingredient");
      }

      // Si todo salió bien
      await fetchAllData();
      setSuccessMessage(
        formData.id
          ? "Receta (product-ingredient) actualizada con éxito!"
          : "Receta (product-ingredient) creada con éxito!"
      );

      // Limpiar formulario
      setFormData({
        id: null,
        product: "",
        ingredient_name: "",
        needed_quantity: "",
        unit: "",
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // 4.4 Eliminar (DELETE)
  const handleDelete = async (id) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/product-ingredients/${id}/`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        throw new Error("Error al eliminar");
      }
      setSuccessMessage("Receta eliminada con éxito");
      await fetchAllData();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // 4.5 Preparar formulario para edición
  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      product: item.product,              // es un número o string (según tu backend)
      ingredient_name: item.ingredient_name,
      needed_quantity: item.needed_quantity,
      unit: item.unit,
    });
  };

  // ---------------------------
  // 5. AGRUPACIÓN POR PRODUCT
  // ---------------------------

  // Filtrar items por el término de búsqueda (ingredient_name)
  const filteredItems = items.filter((it) =>
    it.ingredient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Agrupar los items filtrados por su campo 'product' (ID)
  const groupedByProduct = filteredItems.reduce((acc, current) => {
    const productId = current.product;
    if (!acc[productId]) {
      acc[productId] = [];
    }
    acc[productId].push(current);
    return acc;
  }, {});

  // Convertimos ese objeto a un array de pares [productId, [items...]]
  const groupedArray = Object.entries(groupedByProduct);

  // ---------------------------
  // 6. RENDER
  // ---------------------------
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        CRUD + Agrupación de Product-Ingredients
      </h1>

      {/* Errores y Mensajes */}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-2 mb-2 rounded">
          {successMessage}
        </div>
      )}

      {/* FORMULARIO (crear o editar) */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {formData.id ? "Editar Receta" : "Crear Receta"}
        </h2>

        {/* PRODUCT ID */}
        <div className="mb-4">
          <label htmlFor="product" className="block font-medium mb-1">
            Producto (ID)
          </label>
          <input
            type="number"
            name="product"
            id="product"
            value={formData.product}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Por ejemplo 1, 2, etc."
          />
          <p className="text-sm text-gray-600 mt-1">
            Si en tu backend, 'product' es un ID. De lo contrario, ajusta aquí.
          </p>
        </div>

        {/* INGREDIENT NAME */}
        <div className="mb-4">
          <label htmlFor="ingredient_name" className="block font-medium mb-1">
            Ingrediente
          </label>
          <input
            type="text"
            name="ingredient_name"
            id="ingredient_name"
            value={formData.ingredient_name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Ej. Leche, Harina..."
          />
        </div>

        {/* NEEDED QUANTITY */}
        <div className="mb-4">
          <label htmlFor="needed_quantity" className="block font-medium mb-1">
            Cantidad
          </label>
          <input
            type="number"
            name="needed_quantity"
            id="needed_quantity"
            value={formData.needed_quantity}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Ej. 100"
          />
        </div>

        {/* UNIT */}
        <div className="mb-4">
          <label htmlFor="unit" className="block font-medium mb-1">
            Unidad
          </label>
          <input
            type="text"
            name="unit"
            id="unit"
            value={formData.unit}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Ej. gramos, litros..."
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {formData.id ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* BUSCADOR */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por ingrediente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      {/* MOSTRAR DATOS AGRUPADOS POR PRODUCT */}
      {loading ? (
        <p>Cargando datos...</p>
      ) : groupedArray.length === 0 ? (
        <p>No hay recetas (product-ingredients) que coincidan.</p>
      ) : (
        <div className="space-y-4">
          {groupedArray.map(([productId, ingredients]) => {
            // Usamos el diccionario "productsById" para obtener datos del producto
            const productInfo = productsById[productId];
            // Si existe, tomamos "name", si no, usamos un fallback
            const productName = productInfo
              ? productInfo.name
              : `Producto #${productId}`;

            return (
              <div key={productId} className="bg-white shadow p-4 rounded">
                <h2 className="text-xl font-semibold mb-2">{productName}</h2>
                <ul className="divide-y">
                  {ingredients.map((item) => (
                    <li key={item.id} className="py-2 flex justify-between">
                      <div>
                        <p>
                          <strong>Ingrediente:</strong> {item.ingredient_name}
                        </p>
                        <p>
                          <strong>Cantidad:</strong>{" "}
                          {item.needed_quantity} {item.unit}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

