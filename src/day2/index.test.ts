import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Two", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 8", async () => {
      assertEquals(part1((await getInput("day2", "input-example")).split("\n")), 8);
    });
    Rhum.testCase("should get 2204", async () => {
      assertEquals(part1((await getInput("day2")).split("\n")), 2204);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 2286", async () => {
      assertEquals(part2((await getInput("day2", "input-example")).split("\n")), 2286);
    });
    Rhum.testCase("should get 71036", async () => {
      assertEquals(part2((await getInput("day2")).split("\n")), 71036);
    });
  });
});

Rhum.run();
