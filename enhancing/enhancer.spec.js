const enhancer = require("./enhancer.js");

const initialItem = { durability: 50, enhancement: 19 };

describe("enhancer", () => {
  describe("repair", () => {
    it("repairs an item that's passed in", () => {
      const repairedItem = enhancer.repair(initialItem);
      expect(repairedItem.durability).toBe(100);
    });
    it("only modifies durability", () => {
      const { durability, ...repairedItem } = enhancer.repair(initialItem);
      const { durability: discard, ...initItem } = initialItem;
      expect(repairedItem).toEqual(initItem);
    });
    it("returns null if no input is supplied", () => {
      const returned = enhancer.repair();
      expect(returned).toBe(null);
    });
  });
  describe("success", () => {
    it("doesn't modify an item's durability", () => {
      const enhancedItem = enhancer.succeed(initialItem);
      expect(enhancedItem.durability).toBe(initialItem.durability);
    });
    it("increases enhancement by the appropriate step", () => {
      const enhancedOnce = enhancer.succeed(initialItem);
      const enhancedTwice = enhancer.succeed(enhancedOnce);

      expect(enhancedOnce.enhancement).toBe(20);
      expect(enhancedTwice.enhancement).toBe(20);
    });
    it("only modifies enhancement", () => {
      const { enhancement, ...enhancedItem } = enhancer.succeed(initialItem);
      const { enhancement: discard, ...initItem } = initialItem;
      expect(enhancedItem).toEqual(initItem);
    });
    it("returns null if no input is supplied", () => {
      const returned = enhancer.succeed();
      expect(returned).toBe(null);
    });
  });
});
