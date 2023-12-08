import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Eight", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 2", async () => {
      assertEquals(part1((await getInput("day8", "input-example1")).split("\n\n")), 2);
    });
    Rhum.testCase("should get 6", async () => {
      assertEquals(part1((await getInput("day8", "input-example2")).split("\n\n")), 6);
    });
    Rhum.testCase("should get 21409", async () => {
      assertEquals(part1((await getInput("day8")).split("\n\n")), 21409);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 6", async () => {
      assertEquals(part2((await getInput("day8", "input-example3")).split("\n\n")), 6);
    });
    Rhum.testCase("should get 21165830176709", async () => {
      assertEquals(part2((await getInput("day8")).split("\n\n")), 21165830176709);
    });
  });
});

Rhum.run();
