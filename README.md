# futil

```ts
import { makeContainer } from "https://esm.sh/gh/gnlow/futil/mod.ts"
```

```ts
const container = makeContainer({})

container("hello")
    .length
    .pipe(x => x * 2)
    .get() // 10

container("hello")
    .repeat(3)
    .get() // "hellohellohello"
```

```ts
const container = makeContainer({
    double: (x: number) => x * 2,
})
container(123)
    .double()
    .get() // 246
```