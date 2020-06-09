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
    const initialItemHigh = { durability: 50, enhancement: 19 };
    const initialItemLow = { durability: 50, enhancement: 14 };

    it("decreases durability by the appropriate step", () => {
      const {
        durability: failedDurability,
        enhancement: discard,
        ...failedItem
      } = enhancer.fail(initialItemHigh);
      const {
        durability: initialDurability,
        enhancement: alsoDiscard,
        ...initItem
      } = initialItemHigh;
      expect(failedItem).toEqual(initItem);
      expect(failedDurability).toBe(initialDurability - 1);

      const {
        durability: initialDurabilityLow,
        enhancement: discardAgain,
        ...initItemLow
      } = initialItemLow;
      const {
        durability: failedDurabilityLow,
        enhancement: alsoDiscardAgain,
        ...failedItemLow
      } = enhancer.fail(initialItemLow);
      expect(failedItemLow).toEqual(initialItemLow);
      expect(failedDurabilityLow).toBe(initialDurability - 5);
    });
    it("decreases enhancement if applicable", () => {
      const { enhancement: failedEnhancement, ...failedItem } = enhancer.fail(
        initialItemHigh
      );
      const {
        enhancement: initialEnhancement,
        ...initItemExcludingEnhancement
      } = initialItemHigh;

      expect(failedEnhancement).toBe(initialEnhancement - 1);
      expect(failedItem).toEqual(initItemExcludingEnhancement);

      const failedLowEnhancement = enhancer.fail(initialItemLow);
      expect(failedLowEnhancement).toEqual(initialItemLow);
    });
    it("returns null if no input is supplied", () => {
      const returned = enhancer.fail();
      expect(returned).toBe(null);
    });
  });
});
