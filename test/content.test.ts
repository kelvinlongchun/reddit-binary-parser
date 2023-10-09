/**
 * @jest-environment jsdom
 */

import {
  getBinaryTextsArray,
  getBinaryTextArray,
  convertBinaryText,
  convertBinaryTexts,
  setSpanElementStyle,
} from "../src/content";

describe("function 'getBinaryTextsArray'", () => {
  test("get binary texts array from binary texts", () => {
    expect(
      getBinaryTextsArray("01110100 01100101 01110011 01110100")
    ).toStrictEqual(["01110100 01100101 01110011 01110100"]);
  });

  test("get binary texts array from binary texts containing normal texts", () => {
    expect(
      getBinaryTextsArray("01110100 01100101 and 01110011 01110100")
    ).toStrictEqual(["01110100 01100101", "01110011 01110100"]);
  });

  test("get binary texts array from normal texts", () => {
    expect(getBinaryTextsArray("test")).toBe(null);
  });
});

describe("function 'getBinaryTextArray'", () => {
  test("get binary char text array from binary texts", () => {
    expect(
      getBinaryTextArray("01110100 01100101 01110011 01110100")
    ).toStrictEqual(["01110100", "01100101", "01110011", "01110100"]);
  });

  test("get binary char text array from normal texts", () => {
    expect(getBinaryTextArray("test")).toBe(null);
  });
});

describe("function 'convertBinaryText'", () => {
  test("convert binary text", () => {
    expect(convertBinaryText("01110100")).toBe("t");
  });

  test("convert invaild binary text", () => {
    expect(convertBinaryText("abc")).toBe("");
  });
});

describe("function 'convertBinaryTexts'", () => {
  test("convert binary texts", () => {
    expect(convertBinaryTexts("01110100 01100101 01110011 01110100")).toBe(
      "test"
    );
  });

  test("convert invalid binary texts", () => {
    expect(convertBinaryTexts("test")).toBe("");
  });
});

describe("function 'setSpanElementStyle'", () => {
  const element = document.createElement("span");
  test("update element style", () => {
    setSpanElementStyle(element);
    expect(element.style.color).toBe("rgb(255, 255, 255)");
    expect(element.style.backgroundColor).toBe("rgb(247, 93, 89)");
    expect(element.style.fontWeight).toBe("bold");
  });
});
