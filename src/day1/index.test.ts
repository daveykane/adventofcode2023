import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day One", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 142", async () => {
      assertEquals(part1((await getInput("day1", "input-example1")).split("\n")), 142);
    });
    Rhum.testCase("should get 54605", async () => {
      assertEquals(part1((await getInput("day1")).split("\n")), 54605);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 281", async () => {
      assertEquals(part2((await getInput("day1", "input-example2")).split("\n")), 281);
    });
    Rhum.testCase("should get 55429", async () => {
      assertEquals(part2((await getInput("day1")).split("\n")), 55429);
    });
  });
});

Rhum.run();
