import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Four", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 13", async () => {
      assertEquals(part1((await getInput("day4", "input-example")).split("\n")), 13);
    });
    Rhum.testCase("should get 28750", async () => {
      assertEquals(part1((await getInput("day4")).split("\n")), 28750);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 30", async () => {
      assertEquals(part2((await getInput("day4", "input-example")).split("\n")), 30);
    });
    Rhum.testCase("should get 10212704", async () => {
      assertEquals(part2((await getInput("day4")).split("\n")), 10212704);
    });
  });
});

Rhum.run();
