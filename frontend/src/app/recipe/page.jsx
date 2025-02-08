"use client"
import React, { useState, useEffect } from 'react';
import { Card } from '../../Components/ui/card';
import { Input } from '../../Components/ui/input';
import { Button } from '../../Components/ui/button';
import { CardContent } from "../../Components/ui/cardContent";

export default function RecipePage() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch default profit data on load
    fetch("http://127.0.0.1:8000/api/recetas/profit/")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setSelectedRecipe(data[0]);
        }
      })
      .catch((error) => console.error('Error fetching profit data:', error));
  }, []);

  const fetchIngredients = (recipeName) => {
    fetch(`http://127.0.0.1:8000/api/product-ingredients/?recipe=${recipeName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setIngredients(data);
        } else {
          alert('Ingredientes no encontrados para esta receta');
        }
      })
      .catch((error) => console.error('Error fetching ingredients:', error));
  };

  const handleSearch = () => {
    fetch("http://127.0.0.1:8000/api/recetas/profit/")
      .then((response) => response.json())
      .then((data) => {
        const foundRecipe = data.find(
          (recipe) => recipe.recipe.toLowerCase() === searchQuery.toLowerCase()
        );
        if (foundRecipe) {
          setSelectedRecipe(foundRecipe);
          fetchIngredients(foundRecipe.recipe);
        } else {
          alert('Receta no encontrada');
        }
      })
      .catch((error) => console.error('Error fetching recipes:', error));
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Left Sidebar */}
      <div className="col-span-1">
        {selectedRecipe && (
          <>
            <Card className="mb-4">
              <CardContent>
                <h2 className="text-xl font-bold">Detalles de la Receta</h2>
                <p><strong>Cantidad:</strong> {selectedRecipe.quantity_make}</p>
                <p><strong>Costo Unitario:</strong> ${selectedRecipe.cost_unit}</p>
                <p><strong>Ganancia:</strong> ${selectedRecipe.profit}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="text-xl font-bold">Ingredientes</h2>
                <ul className="list-disc pl-5">
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.name}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Right Interaction Panel */}
      <div className="col-span-2">
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold">Buscar Receta</h2>
            <div className="flex gap-2">
              <Input
                placeholder="Escribe el nombre de la receta"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={handleSearch}>Buscar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
