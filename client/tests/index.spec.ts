import { test, expect } from "vitest"
import { add } from "./add"

// npx vitest run
// 只执行一次

test("first test", () => {
  expect(1 + 1).toBe(2)
})

test("add", () => {
  expect(add(1, 1)).toBe(2)
})
