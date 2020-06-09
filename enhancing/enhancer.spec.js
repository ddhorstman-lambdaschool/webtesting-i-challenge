const enhancer = require("./enhancer.js");

const initialItem = { durability: 0 };

describe("enhancer", () => {
  describe("repair", () => {
    it("repairs an item that's passed in", () => {
      const repairedItem = enhancer.repair(initialItem);
      expect(repairedItem.durability).toBe(100);
    });
    it("returns null if no input is supplied", () => {
      const returned = enhancer.repair();
      expect(returned).toBe(null);
    });
  });
});
