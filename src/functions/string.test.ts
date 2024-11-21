import { describe, it, expect } from "vitest";
import { camelize } from "./string.ts";

describe("toCamelCase", () => {
  const testCases: [string, string][] = [
    ["Hello-world", "helloWorld"],
    ["hello_world", "helloWorld"],
    ["hello world", "helloWorld"],
    ["hello-world_example test", "helloWorldExampleTest"],
    ["helloworld", "helloworld"],
    ["", ""],
    ["alreadyCamelCase", "alreadyCamelCase"],
    ["-hello-world", "helloWorld"],
    ["_hello_world", "helloWorld"],
    ["hello-world-", "helloWorld"],
    ["hello_world_", "helloWorld"],
  ];

  testCases.forEach(([input, expected]) => {
    it(`should convert "${input}" to "${expected}"`, () => {
      expect(camelize(input)).toBe(expected);
    });
  });
});


