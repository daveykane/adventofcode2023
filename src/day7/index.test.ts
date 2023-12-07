import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Seven", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 6440", async () => {
      assertEquals(part1((await getInput("day7", "input-example")).split("\n")), 6440);
    });
    Rhum.testCase("should get 251287184", async () => {
      assertEquals(part1((await getInput("day7")).split("\n")), 251287184);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 5905", async () => {
      assertEquals(part2((await getInput("day7", "input-example")).split("\n")), 5905);
    });
    Rhum.testCase("should get 250757288", async () => {
      assertEquals(part2((await getInput("day7")).split("\n")), 250757288);
    });
  });
});

Rhum.run();
