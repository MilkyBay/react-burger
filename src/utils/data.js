export const ingredientsOptions = {
  bun: { key: "bun", name: "Булки" },
  sauce: { key: "sauce", name: "Соусы" },
  main: { key: "main", name: "Начинки" },
};

export const filterData = (data) => {
  const buns = data.filter((i) => i.type === ingredientsOptions.bun.key);
  const sauces = data.filter((i) => i.type === ingredientsOptions.sauce.key);
  const mains = data.filter((i) => i.type === ingredientsOptions.main.key);

  return [
    { name: ingredientsOptions.bun.name, data: buns },
    { name: ingredientsOptions.sauce.name, data: sauces },
    { name: ingredientsOptions.main.name, data: mains },
  ];
};
