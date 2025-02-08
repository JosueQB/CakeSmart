"use client";

/****************************************************
 * MÓDULO: InventoryManagement
 * Descripción: Permite visualizar, crear, editar, eliminar
 *   e incluso buscar ingredientes, con opción de subir imagen
 *   al realizar la creación/edición.
 ****************************************************/

import { useState, useRef } from "react";
import { Card, CardContent } from "../../Components/card";
import { Button } from "../../Components/button";
import { Input } from "../../Components/input";
import { useFetch } from "../useFetch";
import LoadingScreen from "../../Components/recipe/loading";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Modal from "../../Components/modal";
import Image from "next/image";

/****************************************************
 * ESQUEMA DE VALIDACIÓN
 * Usamos Zod para verificar que los campos
 * obligatorios lleguen con el formato esperado
 ****************************************************/
const ingredientSchema = z.object({
  description: z.string().min(3, "La descripción debe tener al menos 3 caracteres"),
  quantity: z.number().positive("La cantidad debe ser un número positivo"),
  creation_user: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
  unit: z.string().nonempty("La unidad es obligatoria"),
  cost: z.number().positive("El costo debe ser un número positivo"),
});

const InventoryManagement = () => {
  // Datos obtenidos de la API
  const { data, loading } = useFetch("http://127.0.0.1:8000/api/ingredients/");

  // Campos del formulario
  const [form, setForm] = useState({
    description: "",
    quantity: "",
    creation_user: "",
    unit: "",
    cost: "",
  });

  // Imagen para previsualización
  const [imagePreview, setImagePreview] = useState("");
  // Archivo de imagen real (File)
  const [imageFile, setImageFile] = useState(null);

  // Estado para controlar la ventana modal
  const [modal, setModal] = useState({ show: false, message: "", type: "success" });

  // Guardamos temporalmente el ingrediente que estamos editando
  const [editingIngredient, setEditingIngredient] = useState(null);

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Referencia para el panel de scroll horizontal
  const scrollContainerRef = useRef(null);

  // Para navegación (aunque no se usa demasiado en este ejemplo)
  const router = useRouter();

  /****************************************************
   * FUNCIONALIDAD: SCROLL HORIZONTAL
   ****************************************************/
  // Desplaza el contenedor de stock hacia la izquierda
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  // Desplaza el contenedor de stock hacia la derecha
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  /****************************************************
   * FUNCIONALIDAD: CAMPOS DE TEXTO, BUSCAR
   ****************************************************/
  // Actualiza los valores del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Actualiza el valor del searchTerm para filtrar ingredientes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Genera una lista filtrada según el término de búsqueda
  const filteredData = data.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /****************************************************
   * FUNCIONALIDAD: IMAGEN
   ****************************************************/
  // Maneja la selección del archivo de imagen
  // y crea la previsualización
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview("");
    }
  };

  /****************************************************
   * FUNCIONALIDAD: CREAR / ACTUALIZAR (FormData)
   ****************************************************/
  // Prepara los datos y realiza la llamada a la API
  // en formato multipart/form-data
  const createOrUpdateIngredient = async (url, method, extraData = {}) => {
    // Validar campos de texto/número con zod
    const validatedData = ingredientSchema.parse({
      description: form.description,
      quantity: parseFloat(form.quantity),
      creation_user: form.creation_user,
      unit: form.unit,
      cost: parseFloat(form.cost),
    });

    // Construir FormData
    const formData = new FormData();
    formData.append("description", validatedData.description);
    formData.append("quantity", validatedData.quantity);
    formData.append("creation_user", validatedData.creation_user);
    formData.append("unit", validatedData.unit);
    formData.append("cost", validatedData.cost);

    // Adjuntar archivo si existe
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Agregar datos extra si es necesario (por ejemplo, cantidad nueva)
    Object.keys(extraData).forEach((key) => {
      formData.append(key, extraData[key]);
    });

    // Llamada a la API
    const response = await fetch(url, {
      method,
      body: formData,
    });

    return response;
  };

  // Maneja la creación o actualización si ya existe
  const handleAdd = async () => {
    try {
      // Verifica si existe un producto por descripción
      const existingProduct = data.find(
        (item) => item.description.toLowerCase() === form.description.toLowerCase()
      );

      if (existingProduct) {
        // Actualizar sumando la cantidad
        const newQuantity = existingProduct.quantity + parseFloat(form.quantity);
        const response = await createOrUpdateIngredient(
          `http://127.0.0.1:8000/api/ingredients/${existingProduct.id}/`,
          "PUT",
          { quantity: newQuantity.toString() }
        );

        if (response.ok) {
          setModal({
            show: true,
            message: "Ingrediente actualizado satisfactoriamente!",
            type: "success",
          });
          resetForm();
        } else {
          setModal({
            show: true,
            message: "Error al actualizar el ingrediente existente. Intenta de nuevo.",
            type: "error",
          });
        }
      } else {
        // Crear nuevo ingrediente
        const response = await createOrUpdateIngredient(
          "http://127.0.0.1:8000/api/ingredients/",
          "POST"
        );

        if (response.ok) {
          setModal({
            show: true,
            message: "Ingrediente añadido satisfactoriamente!",
            type: "success",
          });
          resetForm();
        } else {
          setModal({ show: true, message: "Error al agregar el ingrediente.", type: "error" });
        }
      }
    } catch (error) {
      setModal({
        show: true,
        message: error.errors?.[0]?.message || "Entrada inválida",
        type: "error",
      });
    }
  };

  /****************************************************
   * FUNCIONALIDAD: ELIMINAR
   ****************************************************/
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/ingredients/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        setModal({ show: true, message: "Ingrediente eliminado satisfactoriamente!", type: "success" });
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setModal({ show: true, message: "Error al eliminar el ingrediente. Intenta de nuevo.", type: "error" });
      }
    } catch (error) {
      setModal({ show: true, message: "Ocurrió un error al eliminar el ingrediente.", type: "error" });
    }
  };

  /****************************************************
   * FUNCIONALIDAD: EDITAR
   ****************************************************/
  const handleEditClick = (item) => {
    setEditingIngredient(item);
    setForm({
      description: item.description,
      quantity: item.quantity.toString(),
      creation_user: item.creation_user,
      unit: item.unit,
      cost: item.cost.toString(),
    });
    setImagePreview(item.image || "");
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async () => {
    try {
      if (!editingIngredient) return;

      const response = await createOrUpdateIngredient(
        `http://127.0.0.1:8000/api/ingredients/${editingIngredient.id}/`,
        "PUT"
      );

      if (response.ok) {
        setModal({ show: true, message: "Ingrediente actualizado satisfactoriamente!", type: "success" });
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setModal({ show: true, message: "Error al actualizar el ingrediente.", type: "error" });
      }
    } catch (error) {
      setModal({ show: true, message: error.errors?.[0]?.message || "Entrada inválida", type: "error" });
    }
  };
  const cancelEdit = () => {
    setEditingIngredient(null);
    resetForm();
  };

  // Restablece el formulario y previsualizaciones
  const resetForm = () => {
    setForm({ description: "", quantity: "", creation_user: "", unit: "", cost: "" });
    setImagePreview("");
    setImageFile(null);
    setEditingIngredient(null);
    setTimeout(() => window.location.reload(), 1500);
  };

  /****************************************************
   * RENDER: SI ESTÁ CARGANDO
   ****************************************************/
  if (loading) return <LoadingScreen />;

  // Calcular stock general
  const totalStock = data.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="p-4 bg-gray-200 min-h-screen mb-8 rounded">
      <Modal
        show={modal.show}
        message={modal.message}
        type={modal.type}
        onClose={() => setModal({ show: false })}
      />
      <div className="text-4xl font-bold text-blue-800 text-center mb-4">
        <h1>Inventario de Ingredientes</h1>
      </div>
      <h2 className="text-center text-2xl text-gray-600 mb-4">
        Se mostrarán los ingredientes que existen
      </h2>

      {/****************************************************
       * BÚSQUEDA DE INGREDIENTES
       ****************************************************/}
      <div className="flex justify-center mb-4">
        <Input
          type="text"
          placeholder="🔎 Buscar ingrediente..."
          className="w-1/2 shadow-lg bg-violet-300 text-black"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/****************************************************
       * PANEL DE STOCK (SCROLL HORIZONTAL)
       ****************************************************/}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-gradient-to-r hover:from-violet-600 hover:to-blue-600 p-6 rounded-xl mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-xl font-bold">
            Stock General: <span className="text-2xl text-black bg-yellow-500 rounded-full p-2 ">{totalStock}</span>
          </h3>
          <div>
            <button
              onClick={scrollLeft}
              className="text-white p-2 bg-white bg-opacity-20 rounded-full mr-2 hover:bg-opacity-40"
            >
              ‹
            </button>
            <button
              onClick={scrollRight}
              className="text-white p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40"
            >
              ›
            </button>
          </div>
        </div>
        <div ref={scrollContainerRef} className="overflow-x-auto mt-4">
          <div className="flex space-x-4">
            {data.map((item) => (
              <Card key={item.id} className="flex-shrink-0 w-64 bg-white p-4 rounded-xl shadow-lg">
                <h3 className="font-bold text-blue-600">{item.description}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Stock: {item.quantity} {item.unit}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/****************************************************
       * LAYOUT DOS COLUMNAS: FORM / LISTADO
       ****************************************************/}
      <div className="flex flex-col md:flex-row gap-4">
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div className="w-full md:w-1/3">
          <div className="bg-gradient-to-r from-green-700 to-blue-500 hover:from-blue-300 hover:to-green-500 shadow rounded-xl p-4 mb-4">
            <div className="bg-white shadow rounded-xl p-8">
              <h3 className="text-lg font-bold mb-2">
                {editingIngredient ? "✏️ Editar Ingrediente" : "➕ Añadir Nuevo Ingrediente"}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Input
                  type="text"
                  name="description"
                  placeholder="Nombre del producto"
                  value={form.description}
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  name="quantity"
                  placeholder="Cantidad"
                  value={form.quantity}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="creation_user"
                  placeholder="Usuario"
                  value={form.creation_user}
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  name="cost"
                  placeholder="Costo"
                  value={form.cost}
                  onChange={handleChange}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {/* Previsualización de la imagen */}
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="rounded"
                  />
                )}
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="p-2 border rounded"
                >
                  <option value="">Selecciona Unidad</option>
                  <option value="unidades">Unidades</option>
                  <option value="kilograms">Kilogramos</option>
                  <option value="grams">Gramos</option>
                  <option value="liters">Litros</option>
                  <option value="milliliters">Mililitros</option>
                </select>
                {/* Botones: Actualizar vs Añadir */}
                {editingIngredient ? (
                  <>
                    <Button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600 text-white">
                      Actualizar
                    </Button>
                    <Button onClick={cancelEdit} className="bg-gray-500 hover:bg-red-600 text-white">
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white">
                    Añadir
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: LISTADO DE INGREDIENTES */}
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((item) => (
              <Card key={item.id} className="flex flex-col mx-auto items-center p-6">
                {/* Imagen del ingrediente, si existe en el backend */}
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-32 h-32 object-cover rounded-full mb-4 mx-auto"
                />
                <CardContent className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.description}</h3>
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600">Cantidad:</span>
                    <Input
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="w-20 border border-gray-300 rounded-md text-center"
                    />
                    <span className="text-sm text-gray-600">{item.unit}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Costo:</span> ${item.cost}
                  </div>
                </CardContent>
                <div className="flex gap-2 mt-4 w-full">
                  <Button
                    onClick={() => handleEditClick(item)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                    className="flex-1"
                  >
                    Eliminar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;















