module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  return !item
    ? null
    : {
        ...item,
        enhancement: item.enhancement === 20 ? 20 : item.enhancement + 1,
      };
}

function fail(item) {
  return { ...item };
}

function repair(item) {
  return !item ? null : { ...item, durability: 100 };
}

function get(item) {
  return { ...item };
}
