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
    durability,
    enhancement: enhancement > 16 ? enhancement - 1 : enhancement,
  };
}

function repair(item) {
  return !item ? null : { ...item, durability: 100 };
}

function get(item) {
  return { ...item };
}
