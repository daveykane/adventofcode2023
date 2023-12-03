import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Three", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 4361", async () => {
      assertEquals(part1((await getInput("day3", "input-example")).split("\n")), 4361);
    });
    Rhum.testCase("should get 557705", async () => {
      assertEquals(part1((await getInput("day3")).split("\n")), 557705);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 467835", async () => {
      assertEquals(part2((await getInput("day3", "input-example")).split("\n")), 467835);
    });
    Rhum.testCase("should get 84266818", async () => {
      assertEquals(part2((await getInput("day3")).split("\n")), 84266818);
    });
  });
});

Rhum.run();
