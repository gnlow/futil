type Fn = (...args: any[]) => any

type Container<A> = {
    pipe<B>(f: (a: A) => B): Container<B>
    get(): A
} & {
    [ K in keyof A ]: A[K] extends (...args: infer I) => infer O
        ? (...args: I) => Container<O>
        : Container<A[K]>
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
        get(target, prop) {
            const v = a[prop as keyof A]
            return 0
                || target[prop as keyof typeof target]
                || (typeof v == "function"
                    ? (...args: unknown[]) => container(v.bind(a)(args))
                    : container(v))
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

console.log(
    container<String>("hello")
        .repeat(3)
        .get()
)