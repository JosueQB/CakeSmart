from typing import List

class CakeUnitConverter:
    def __init__(self):

        self.conversions = {
            'grams_to_kilograms': 0.001,
            'kilograms_to_grams': 1000,
            'milliliters_to_liters': 0.001,
            'liters_to_milliliters': 1000,
            'tablespoons_to_ml': 15,  # 1 tablespoon ≈ 15 ml
            'ml_to_tablespoons': 1 / 15,
            'cups_to_ml': 240,  # 1 cup ≈ 240 ml
            'ml_to_cups': 1 / 240,
            'ounces_to_grams': 28.3495,
            'grams_to_ounces': 1 / 28.3495
        }

    def convert(self, value, from_unit, to_unit):
        key = f"{from_unit}_to_{to_unit}"
        if key in self.conversions:
            return value * self.conversions[key]
        else:
            raise ValueError(f"Unsupported conversion: from {from_unit} to {to_unit}")


recetas = [
    {
        'name': 'Pastel de vainilla',
        'ingredients': [
            {                                      
                'desc': 'harina',
                'quantity': 200,   #2
                'unit': 'grams'
            },
            {
                'desc': 'azúcar',
                'quantity': 100,   #2
                'unit': 'grams'
            },
            {
                'desc': 'huevo',
                'quantity': 2,  #3
                'unit': 'unidades'
            },
            {
                'desc': 'leche',
                'quantity': 1,  #2
                'unit': 'liters'
            },
            {
                'desc': 'manteca',
                'quantity': 50,
                'unit': 'grams'
            }

        ],
        'pvp': 35.5

    },
    {
        'name': 'Panqueques',
        'ingredients': [
            {
                'desc': 'harina',
                'quantity': 150,
                'unit': 'grams'
            },
            {
                'desc': 'huevo',
                'quantity': 2,
                'unit': 'unidades'
            },
            {
                'desc': 'leche',
                'quantity': 1,
                'unit': 'liters'
            },
            {
                'desc':'manteca',
                'quantity': 30,
                'unit': 'grams'
            }
        ],
        'pvp': 22
    }
]

inventory = [
    {
        'desc': 'harina',
        'quantity': 1000,    #5       #3
        'unit': 'grams',
        'cost': 22.5
    },
    {
        'desc': 'azúcar',
        'quantity': 400,  #4
        'unit': 'grams',
        'cost': 15.0
    },
    {
        'desc': 'huevo',
        'quantity': 6,    #3        #3
        'unit': 'unidades',
        'cost': 3.0
    },
    {
        'desc': 'leche',
        'quantity': 2000,   #4         #2
        'unit': 'milliliters',
        'cost': 2.7
    },
    {
        'desc':'manteca',
        'quantity': 100,  #2        #1
        'unit': 'grams',
        'cost': 10.0     #53.2     #38.2
    }
]



def suggest_product(input_recipe_name):
    suggestions = []  
    for recipe in recetas:
        quantity = 0
        quantity_product_make = []
        recipe_cost = 0
        
        for ingredient in recipe["ingredients"]: 
            for item in inventory:
                if (ingredient["desc"] == item["desc"]) and (item["unit"] != ingredient["unit"]):
                    cakeUnitConvert = CakeUnitConverter()
                    quantity_convert = cakeUnitConvert.convert(item['quantity'], item['unit'], ingredient['unit'])
                    if(quantity_convert >= ingredient["quantity"]):
                        quantity += 1
                        quantity_product_make.append(item['quantity']//ingredient['quantity'])
                        recipe_cost += item['cost']
                        break
                elif (ingredient["desc"] == item["desc"]) and (item["quantity"] >= ingredient["quantity"]):
                    quantity += 1
                    quantity_product_make.append(item['quantity']//ingredient['quantity'])
                    recipe_cost += item['cost']
                    break
        if quantity == len(recipe["ingredients"]):
            recipe_cost_unit = recipe_cost / min(quantity_product_make)
            suggestions.append({"recipe": recipe['name'], "quantity_make": min(quantity_product_make), "cost_unit": recipe_cost_unit, "cost": recipe_cost, "pvp": recipe['pvp']})
            continue
    for recipe_name in suggestions:
        if (recipe_name['recipe'] == input_recipe_name):
            return suggestions
        
    return "No hay resultados para la receta"
    
        


print(suggest_product("Panqueques"))


#p1 8.9
#p2 9.27






#for suggest in suggest_product():
  #  print(f"""Puedes hacer los siguientes productos {suggest['recipe']}\n
   # Cantidades a hacer: {suggest['quantity_make']} \n
   # Costo por unidad: ${suggest['cost_unit']} \n
   # Costo total: ${suggest['cost']} \n
#""")