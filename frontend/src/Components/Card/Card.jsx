export default function Card({data}){
    return (
        <>
        {data.map((item, index)=>
            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <div className="px-6 py-4">
                    <div className="text-gray-700 font-bold text-xl mb-2">{item.name}</div>
                </div>
                <div className="px-6 py-4 flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Tiempo de preparación: 20 min</span>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm">Ver receta</a>
                </div>
                <div className="px-6 py-4">
                    <h3 className="font-semibold text-gray-800">Ingredientes</h3>
                    <ul className="list-disc pl-5 text-gray-600 text-sm">
                        {item.ingredients.map((item, index)=><li key={index}>{item.quantity} {item.unit} - {item.description} </li>)}

                    </ul>
                </div>
            </div>
        )}
        </>
        
    )
}