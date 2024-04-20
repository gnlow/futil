# futil

```ts
container("hello")
    .length
    .pipe(x => x * 2)
    .get() // 10

container("hello")
    .repeat(3)
    .get() // "hellohellohello"
```