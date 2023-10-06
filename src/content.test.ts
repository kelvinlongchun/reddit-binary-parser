import { convertBinaryText } from "./utils";

describe("convertBinaryText", () => {
  it("converts valid binary character to text", () => {
    expect(convertBinaryText("01110100")).toEqual("t");
  });
  it.todo("convert whole word from binary to text");
});
