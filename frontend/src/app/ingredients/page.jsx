

"use client"
import React, { useState } from "react";
import { Card, CardContent } from "../../Components/card";
import { Button } from "../../Components/button";
import { Input } from "../../Components/input";
import { useFetch } from "../useFetch"


const InventoryManagement = () => {
    const { data, loading } = useFetch("http://127.0.0.1:8000/api/ingredients/")
    
    if(loading){
        return (
            <div>Loading...</div>
        )
    }

    return (
      <div className="p-4 bg-gray-100 min-h-screen mb-8">
        <div className="text-4xl font-bold text-blue-800 text-center">
          <h1>Inventory Management</h1>
        </div>
        <h2 className="text-center text-2xl text-gray-600">
          Displaying inventory ingredients
        </h2>
        <div className="mt-4 p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-bold mb-2">➕ Add New Ingredient</h3>
          <div className="flex gap-4 items-center">
            <Input
              type="text"
              placeholder="Product Name"

              className="flex-2"
            />
            <Input
              type="number"
              placeholder="Quantity"

              className="w-24"
            />
            <Input
              type="text"
              placeholder="Image URL"

              className="flex-1"
            />
            <select
              value="unidades"

              className="p-2 border rounded"
            >
              <option value="unidades">Units</option>
              <option value="kg">Kilograms</option>
              <option value="g">Grams</option>
              <option value="l">Liters</option>
              <option value="ml">Milliliters</option>
            </select>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Add
            </Button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
            <Card key={item.id} className="flex flex-col items-center p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-full mb-4"
              />
              <CardContent className="text-center">
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <div className="flex justify-center items-center gap-2">
                  <span>Quantity:</span>
                  <Input
                    type="number"
                    value={item.quantity}
                    className="w-20"
                  />
                  <span>{item.unit}</span>
                </div>
              </CardContent>
              <Button
                variant="destructive"
                className="mt-4 w-full"
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
      </div>
    );
  
  };
  
export default InventoryManagement;

