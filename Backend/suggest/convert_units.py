

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

cake = CakeUnitConverter()

result = cake.convert(6000,  "milliliters", "liters")
print(result)