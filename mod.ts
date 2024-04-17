type Container<A> = {
    pipe<B>(f: (a: A) => B): Container<B>
    get(): A
} & {
    [ K in keyof A ]: Container<A[K]>
}

const container =
<A>
(a: A): Container<A> => {
    const target = {
        pipe<B>(f: (a: A) => B) {
            return container(f(a))
        },
        get() { return a }
    }
    const proxy = new Proxy(target, {
        get(target, prop, receiver) {
            return 0
                || target[prop as keyof typeof target]
                || container(a[prop as keyof A])
        }
    }) as Container<A>

    return proxy
}

console.log(
    container(1)
        .pipe(x => x * 2)
        .get()
)

console.log(
    container<String>("hello")
        .length
        .get()
)