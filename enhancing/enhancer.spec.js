const enhancer = require("./enhancer.js");

describe("enhancer", () => {
  describe("repair", () => {
    const initialItem = { durability: 50, enhancement: 19 };

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
    const initialItem = { durability: 50, enhancement: 19 };

    it("increases enhancement by the appropriate step", () => {
      const enhancedItem = enhancer.succeed(initialItem);
      const enhancedMax = enhancer.succeed({ ...initialItem, enhancement: 20 });

      expect(enhancedItem.enhancement).toBe(initialItem.enhancement + 1);
      expect(enhancedMax.enhancement).toBe(20);
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
  describe("fail", () => {
    const initialItem = { durability: 50, enhancement: 19 };
    const initialItemMid = { ...initialItem, enhancement: 16 };
    const initialItemLow = { ...initialItem, enhancement: 14 };
    const initialItemVeryLow = { ...initialItem, enhancement: 4 };

    it("correctly alters items with durability greater than 16", () => {
      const initialItemHigh = {...initialItem, enhancement: 19};
      const {
        enhancement: initEnhancement,
        durability: initDurability,
        ...initItem
      } = initialItemHigh;
      const {
        enhancement: failedEnhancement,
        durability: failedDurability,
        ...failedItem
      } = enhancer.fail(initialItemHigh);

      expect(failedItem).toEqual(initItem);
      expect(failedDurability).toEqual(initDurability-10);
      expect(failedEnhancement).toEqual(initEnhancement-1);
    });
    it.todo("correctly alters items with durability 15 or 16");
    it.todo("correctly alters items with durability less than 15");
    it.todo("correctly alters items with durability less than 5");

    it("returns null if no input is supplied", () => {
      const returned = enhancer.fail();
      expect(returned).toBe(null);
    });
  });
});
