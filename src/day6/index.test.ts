import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Six", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 288", async () => {
      assertEquals(part1((await getInput("day6", "input-example")).split("\n")), 288);
    });
    Rhum.testCase("should get 5133600", async () => {
      assertEquals(part1((await getInput("day6")).split("\n")), 5133600);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 71503", async () => {
      assertEquals(part2((await getInput("day6", "input-example")).split("\n")), 71503);
    });
    Rhum.testCase("should get 40651271", async () => {
      assertEquals(part2((await getInput("day6")).split("\n")), 40651271);
    });
  });
});

Rhum.run();
