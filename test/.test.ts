import { assertEquals } from "https://deno.land/std@0.223.0/assert/mod.ts"

import { container } from "../mod.ts"

Deno.test("basics", () => {
    assertEquals(
        container(1)
            .pipe(x => x * 2)
            .get(),
        2,
    )
    assertEquals(
        container("hello")
            .length
            .pipe(x => x * 2)
            .get(),
        10,
    )
})