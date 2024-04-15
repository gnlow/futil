type Container<A> = {
    pipe<B>(f: (a: A) => B): Container<B>
    get(): A
}

const container =
<A>
(a: A): Container<A> => {
    return {
        pipe<B>(f: (a: A) => B) {
            return container(f(a))
        },
        get() { return a }
    }
}

console.log(
    container(1)
        .pipe(x => x * 2)
        .get()
)