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
    enhancement: enhancement === 20 ? 20 : enhancement + 1,
  };
}

function fail(item) {
  if (!item) return null;
  const { durability, enhancement, ...i } = item;
  return {
    ...i,
    durability:
      enhancement > 14 
        ? durability - 10
        : durability < 5
          ? 0 
          : durability - 5,
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
    name: enhancement !== 0 ?  `[+${enhancement}] ${name}` : name,
  };
}
