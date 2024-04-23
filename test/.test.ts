import { assertEquals } from "https://deno.land/std@0.223.0/assert/mod.ts"

import { makeContainer } from "../mod.ts"

Deno.test("basics", () => {
    const container = makeContainer({})
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

Deno.test("custom function", () => {
    const container = makeContainer({
        double: (x: number) => x * 2,
    })
    assertEquals(
        container(123)
            .double()
            .get(),
        246,
    )

    container("123")
        // @ts-expect-error: Err<"Type", number, "is not assignable to type", string>
        .double()
        .get()
})