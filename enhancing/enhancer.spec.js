const enhancer = require("./enhancer.js");

describe("enhancer", () => {
  const initialItem = { name: "Bow of Truth", durability: 10, enhancement: 16 };

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
      if (!(initialItem.enhancement < 20)) {
        throw new Error(
          "initialItem must have enhancement less than 20 for this test to work"
        );
      }
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
    if(!(initialItem.durability >=10)){
      throw new Error("initialItem must have durability at least 10 for this test to work")
    }

    it("correctly alters items with enhancement greater than 16", () => {
      const initialItemHigh = { ...initialItem, enhancement: 19 };
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
      expect(failedDurability).toEqual(initDurability - 10);
      expect(failedEnhancement).toEqual(initEnhancement - 1);
    });
    it("correctly alters items with enhancement 15 or 16", () => {
      const initialItemSixteen = { ...initialItem, enhancement: 16 };
      const { durability: failedDSixteen, ...failedSixteen } = enhancer.fail(
        initialItemSixteen
      );
      const {
        durability: initialDSixteen,
        ...initialSixteen
      } = initialItemSixteen;
      expect(failedSixteen).toEqual(initialSixteen);
      expect(failedDSixteen).toBe(initialDSixteen - 10);

      const initialItemFifteen = { ...initialItem, enhancement: 15 };
      const { durability: failedDFifteen, ...failedFifteen } = enhancer.fail(
        initialItemFifteen
      );
      const {
        durability: initialDFifteen,
        ...initialFifteen
      } = initialItemFifteen;
      expect(failedFifteen).toEqual(initialFifteen);
      expect(failedDFifteen).toBe(initialDFifteen - 10);
    });
    it("correctly alters items with enhancement less than 15", () => {
      const initialItemLow = { ...initialItem, enhancement: 14 };
      const {
        enhancement: initEnhancement,
        durability: initDurability,
        ...initItem
      } = initialItemLow;
      const {
        enhancement: failedEnhancement,
        durability: failedDurability,
        ...failedItem
      } = enhancer.fail(initialItemLow);

      expect(failedItem).toEqual(initItem);
      expect(failedDurability).toEqual(initDurability - 5);
    });
    it("correctly alters items with low durability", () => {
      const initialItemVeryLow = {
        ...initialItem,
        durability: 1,
      };
      const {
        enhancement: initEnhancement,
        durability: initDurability,
        ...initItem
      } = initialItemVeryLow;
      const {
        enhancement: failedEnhancement,
        durability: failedDurability,
        ...failedItem
      } = enhancer.fail(initialItemVeryLow);

      expect(failedItem).toEqual(initItem);
      expect(failedDurability).toEqual(0);
    });

    it("returns null if no input is supplied", () => {
      const returned = enhancer.fail();
      expect(returned).toBe(null);
    });
  });
  describe("get", () => {
    it("doesn't modify items with enhancement of zero", () => {
      const initialItemZero = { ...initialItem, enhancement: 0 };
      const returned = enhancer.get(initialItemZero);
      expect(returned).toEqual(initialItemZero);
    });
    it("correctly modifies the name of enhanced items", () => {
      if (!(initialItem.enhancement > 0)) {
        throw new Error(
          "initialItem must have nonzero enhancement for this test to work"
        );
      }
      const { name: newName, ...returnedItem } = enhancer.get(initialItem);
      const { name: originalName, ...initItem } = initialItem;

      expect(returnedItem).toEqual(initItem);
      expect(newName).toEqual(
        expect.stringContaining(initItem.enhancement.toString())
      );
      expect(newName).toEqual(expect.stringContaining("+"));
    });

    it("returns null if no input is supplied", () => {
      const returned = enhancer.get();
      expect(returned).toBe(null);
    });
  });
});
