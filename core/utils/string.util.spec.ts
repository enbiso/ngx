import { HyphenToCapitalizedSpace } from "./string.util";

describe("String.Util", () => {
    it("#HyphenToCapitalizedSpace should return correct value", () => {
        let value = HyphenToCapitalizedSpace("one-two-three")
        expect(value).toEqual("One Two Three");
    });
});