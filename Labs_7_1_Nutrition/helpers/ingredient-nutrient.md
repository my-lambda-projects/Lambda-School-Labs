| Ingredient/Nutrient List   | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| ndbno(IntergerField)       | Number for the ingredient's db position. Used as a key to be pushed to the recipe DB |
| name(CharField)*           | Ingredient name                                              |
| measure(CharField)*        | The required measure represented by the nutrient value element |
| nutrients(CharField)       | List of the nutrient attached to the ingredient              |
| nutrient_id(IntergerField) | Nutrient number in the DB                                    |
| unit(CharField)            | unit of measurement                                          |
| gm(IntergerField)          | The 100 gram equivalent value for the nutrient               |
| value(IntergerField)       | Value of the nutrient for this food; sum total of all = calorie count |

*will be rendered on the Ingredient card from ingredient mode



Will render:

```{
- ndbno: "09427",

- name: "Abiyuch, raw",

- weight: 114,

- measure: "0.5 cup",

- nutrients:

  [

  - 

    {

    - nutrient_id: "208",
    - nutrient: "Energy",
    - unit: "kcal",
    - value: "79",
    - gm: 69

    },

  - 

    {

    - nutrient_id: "269",
    - nutrient: "Sugars, total",
    - unit: "g",
    - value: "9.75",
    - gm: 8.55

    },

  - 

    {

    - nutrient_id: "204",
    - nutrient: "Total lipid (fat)",
    - unit: "g",
    - value: "0.11",
    - gm: 0.1

    },

  - 

    {

    - nutrient_id: "205",
    - nutrient: "Carbohydrate, by difference",
    - unit: "g",
    - value: "20.06",
    - gm: 17.6

    }

  ]

},
```