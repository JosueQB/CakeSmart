"use client";
import { useFetch } from "../useFetch"

export default function RecipePage() {
    const { data, loading } = useFetch("http://127.0.0.1:8000/api/recetas/profit/");

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }


    return (
        <div>
            <h2>Recetas</h2>
            <span>En base al Profit</span>

            {data.map((item, index) => (
                <h1 key={index}>{item.recipe}</h1>
            ))}


        </div>
    );
}
