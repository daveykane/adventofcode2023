import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Five", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 35", async () => {
      assertEquals(part1(await getInput("day5", "input-example")), 35);
    });
    Rhum.testCase("should get 88151870", async () => {
      assertEquals(part1(await getInput("day5")), 88151870);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 46", async () => {
      assertEquals(part2(await getInput("day5", "input-example")), 46);
    });
    Rhum.testCase("should get 2008785", async () => {
      assertEquals(part2(await getInput("day5")), 2008785);
    });
  });
});

Rhum.run();
