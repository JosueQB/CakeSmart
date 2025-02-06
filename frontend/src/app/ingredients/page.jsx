'use client';
import { useFetch } from '@/useFetch';

export default function IngredientsPage(){
    const {data} = useFetch("http://127.0.0.1:8000/api/recetas/")

    return (
        <h2>Lista de Ingredientes</h2>
    )
}