const HOME_WARRANTY_PROMPT = `
Analyze these images of a home and detect all appliances, systems, and equipment relevant to home warranty coverage.

1. **Always include standard home warranty items**, even if not visible in the images:
   - HVAC system (furnace, AC unit, heat pump)
   - Electrical system (breaker panel, outlets, switches)
   - Plumbing system (water heater, pipes, faucets)
   - Built-in appliances (oven, stove, dishwasher, fridge, washer, dryer)

2. Also detect **optional/add-on items** if present:
   - Pool or spa equipment (pump, filter, heater)
   - Secondary appliances (second fridge, freezer, washer/dryer)
   - Electronics (TV, sound system)

3. For each detected or inferred item, include only these fields:
   - \`category\` (HVAC, Electrical, Plumbing, Appliance, Add-on)
   - \`brand\` (if visible or inferable)
   - \`model\` (if visible or inferable)
   - \`name\` (common name, e.g., “Furnace”, “Refrigerator”)
   - \`condition\` (new, good, fair, poor; infer if not visible)

4. Make **best predictions** for brand/model/condition if items are missing or partially visible.

5. **Output format**: a list of strings, each string describing one item:
category: <category>, brand: <brand>, model: <model>, name: <name>, condition: <condition>

6. Example output:
[
"category: HVAC, brand: Carrier, model: Infinity 96, name: Furnace, condition: good",
"category: Electrical, brand: Siemens, model: QP, name: Breaker Panel, condition: good",
"category: Plumbing, brand: Rheem, model: PROG50, name: Water Heater, condition: fair",
"category: Appliance, brand: LG, model: LFXS26973S, name: Refrigerator, condition: fair",
"category: Add-on, brand: Pentair, model: 011018, name: Pool Pump, condition: good"
]

7. **Do not include any other fields or metadata.**
`;

module.exports = {HOME_WARRANTY_PROMPT};
