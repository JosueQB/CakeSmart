from typing import List


recetas = [
    {
        'name': 'Pastel de vainilla',
        'ingredients': [
            {                                      
                'desc': 'harina',
                'quantity': 200,   #2
                'unit': 'gramos'
            },
            {
                'desc': 'azúcar',
                'quantity': 100,   #2
                'unit': 'gramos'
            },
            {
                'desc': 'huevo',
                'quantity': 2,  #3
                'unit': 'unidades'
            },
            {
                'desc': 'leche',
                'quantity': 0.5,  #2
                'unit': 'litros'
            },
            {
                'desc': 'manteca',
                'quantity': 50,
                'unit': 'gramos'
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
                'unit': 'gramos'
            },
            {
                'desc': 'huevo',
                'quantity': 2,
                'unit': 'unidades'
            },
            {
                'desc': 'leche',
                'quantity': 0.5,
                'unit': 'litros'
            },
            {
                'desc':'manteca',
                'quantity': 30,
                'unit': 'gramos'
            }
        ],
        'pvp': 22
    }
]

inventory = [
    {
        'desc': 'harina',
        'quantity': 1000,    #5       #3
        'unit': 'gramos',
        'cost': 22.5
    },
    {
        'desc': 'azúcar',
        'quantity': 400,  #4
        'unit': 'gramos',
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
        'quantity': 2,   #4         #2
        'unit': 'litros',
        'cost': 2.7
    },
    {
        'desc':'manteca',
        'quantity': 100,  #2        #1
        'unit': 'gramos',
        'cost': 10.0     #53.2     #38.2
    }
]


def suggest_product():
    suggestions = []
    for recipe in recetas:
        quantity = 0
        quantity_product_make = []
        recipe_cost = 0
        
        for ingredient in recipe["ingredients"]: 
            for item in inventory:
                if (ingredient["desc"] == item["desc"]) and (item["quantity"] >= ingredient["quantity"]):
                    quantity += 1
                    quantity_product_make.append(item['quantity']//ingredient['quantity'])
                    recipe_cost += item['cost']
                    break
        if quantity == len(recipe["ingredients"]):
            recipe_cost_unit = recipe_cost / min(quantity_product_make)
            suggestions.append({"recipe": recipe['name'], "quantity_make": min(quantity_product_make), "cost_unit": recipe_cost_unit, "cost": recipe_cost, "pvp": recipe['pvp']})
            continue
    return suggestions


def calculate_profit(pvp: float, cost_unit: float):
    return pvp - cost_unit



def suggest_profitable_product(list_suggest_product: List) -> List:
    list_suggest_profit_product = []
    for recipe in list_suggest_product:
        profit = calculate_profit(recipe['pvp'], recipe['cost_unit'])
        recipe['profit'] = profit
    product_profit = max(list_suggest_product, key=lambda product: product['profit'])
    list_suggest_profit_product.append(product_profit)
    return list_suggest_profit_product

print("Productos QUe puedes hacer")
result = suggest_product()

print(result)

print("Productos con mayor rentabilidad")

print(suggest_profitable_product(result))