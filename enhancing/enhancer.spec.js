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
    it.todo("decreases durability by the appropriate step");
    it("decreases enhancement if applicable", () => {
      const { enhancement: failedEnhancement, ...failedItem } = enhancer.fail(
        initialItem
      );
      const failedLowEnhancement = enhancer.fail({
        ...initialItem,
        enhancement: 16,
      });
      const {
        enhancement: initialEnhancement,
        ...initItemExcludingEnhancement
      } = initialItem;

      expect(failedEnhancement).toBe(initialEnhancement - 1);
      expect(failedItem).toEqual(initItemExcludingEnhancement);

      expect(failedLowEnhancement).toEqual({ ...initialItem, enhancement: 16 });
    });
    it("returns null if no input is supplied", () => {
      const returned = enhancer.fail();
      expect(returned).toBe(null);
    });
  });
});
