import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Ten", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 4", async () => {
      assertEquals(part1((await getInput("day10", "input-example1")).split("\n")), 4);
    });
    Rhum.testCase("should get 8", async () => {
      assertEquals(part1((await getInput("day10", "input-example2")).split("\n")), 8);
    });
    Rhum.testCase("should get 6757", async () => {
      assertEquals(part1((await getInput("day10")).split("\n")), 6757);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 4", async () => {
      assertEquals(part2((await getInput("day10", "input-example3")).split("\n")), 4);
    });
    Rhum.testCase("should get 4", async () => {
      assertEquals(part2((await getInput("day10", "input-example4")).split("\n")), 4);
    });
    Rhum.testCase("should get 8", async () => {
      assertEquals(part2((await getInput("day10", "input-example5")).split("\n")), 8);
    });
    Rhum.testCase("should get 10", async () => {
      assertEquals(part2((await getInput("day10", "input-example6")).split("\n")), 10);
    });
    Rhum.testCase("should get 523", async () => {
      assertEquals(part2((await getInput("day10")).split("\n")), 523);
    });
  });
});

Rhum.run();
