const HOME_WARRANTY_PROMPT = `
Analyze the provided images of a home and detect all appliances, systems, and equipment relevant to home warranty coverage.

1. Always include standard home warranty items, even if not visible:
   - HVAC system
   - Electrical system
   - Plumbing system
   - Built-in appliances (oven, stove, dishwasher, fridge, washer, dryer)

2. Detect optional/add-on items if present:
   - Pool/spa equipment
   - Secondary appliances
   - Electronics (TV, sound system)

3. For each item (detected or inferred), create a JavaScript dictionary entry:
   - Key: type/category of the item (e.g., HVAC, Electrical, Plumbing, Appliance, Add-on)
   - Value: a plain descriptive string describing the item (brand, model, name, condition)
     - No special formatting or punctuation required

4. Include all standard items even if not shown; make best guesses for brand/model/condition if missing.

5. Example output:

{
  "HVAC": "Furnace Carrier Infinity 96 good condition",
  "Electrical": "Breaker panel Siemens QP good condition",
  "Plumbing": "Water heater Rheem fair condition",
  "Fridge": "Refrigerator LG fair condition",
  "Pool": "Pool pump Pentair good condition"
}

7. **Do not include any other fields or metadata.**
`;

module.exports = {HOME_WARRANTY_PROMPT};
