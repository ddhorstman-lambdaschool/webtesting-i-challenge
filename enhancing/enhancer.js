module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  if (!item) return null;
  const { enhancement, ...i } = item;
  return {
    ...i,
    enhancement:
      enhancement < 20
        ? enhancement + 1
        : 20,
  };
}

function fail(item) {
  if (!item) return null;
  let { durability, enhancement, ...i } = item;

  durability = enhancement > 14
                ? durability - 10
                : durability - 5;

  return {
    ...i,
    durability:
      durability >=0
        ? durability
        : 0,
    enhancement:
      enhancement > 16 
        ? enhancement - 1
        : enhancement,
  };
}

function repair(item) {
  if (!item) return null;
  return { ...item, durability: 100 };
}

function get(item) {
  if (!item) return null;
  const { name, enhancement, ...i } = item;
  return {
    ...i,
    enhancement,
    name:
      enhancement !== 0
        ?  `[+${enhancement}] ${name}`
        : name,
  };
}
