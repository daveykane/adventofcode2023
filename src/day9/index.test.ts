import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Nine", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 114", async () => {
      assertEquals(part1((await getInput("day9", "input-example")).split("\n")), 114);
    });
    Rhum.testCase("should get 1798691765", async () => {
      assertEquals(part1((await getInput("day9")).split("\n")), 1798691765);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 2", async () => {
      assertEquals(part2((await getInput("day9", "input-example")).split("\n")), 2);
    });
    Rhum.testCase("should get 1104", async () => {
      assertEquals(part2((await getInput("day9")).split("\n")), 1104);
    });
  });
});

Rhum.run();
