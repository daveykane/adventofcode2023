import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Twelve", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 21", async () => {
      assertEquals(part1((await getInput("day12", "input-example")).split("\n")), 21);
    });
    Rhum.testCase("should get 7922", async () => {
      assertEquals(part1((await getInput("day12")).split("\n")), 7922);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 525152", async () => {
      assertEquals(part2((await getInput("day12", "input-example")).split("\n")), 525152);
    });
    Rhum.testCase("should get 18093821750095", async () => {
      assertEquals(part2((await getInput("day12")).split("\n")), 18093821750095);
    });
  });
});

Rhum.run();
