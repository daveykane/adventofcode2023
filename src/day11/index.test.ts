import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Eleven", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 374", async () => {
      assertEquals(part1(await getInput("day11", "input-example")), 374);
    });
    Rhum.testCase("should get 9623138", async () => {
      assertEquals(part1(await getInput("day11")), 9623138);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 374", async () => {
      assertEquals(part2(await getInput("day11", "input-example")), 374);
    });
    Rhum.testCase("should get 1030", async () => {
      assertEquals(part2(await getInput("day11", "input-example"), 10), 1030);
    });
    Rhum.testCase("should get 8410", async () => {
      assertEquals(part2(await getInput("day11", "input-example"), 100), 8410);
    });
    Rhum.testCase("should get 726820169514", async () => {
      assertEquals(part2(await getInput("day11"), 1000000), 726820169514);
    });
  });
});

Rhum.run();
