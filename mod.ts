/* I don't know why this is needed */
type ToInterface<T> =
    T extends string
        ? String
        : T

export type Container<A, Fs> = {
    pipe<B>(f: (a: A) => B): Container<B, Fs>
    get(): A
} & {
    [ K in keyof ToInterface<A> ]:
        ToInterface<A>[K] extends (...args: infer I) => infer O
            ? (...args: I) => Container<O, Fs>
            : Container<ToInterface<A>[K], Fs>
} & {
    [ K in keyof Fs ]:
        Fs[K] extends (a: A) => infer B
            ? () => Container<B, Fs>
            : never
}

export const makeContainer =
<Fs>
(fs: Fs) => {
    const container =
    <A>
    (a: A): Container<A, Fs> => {
        const target = {
            pipe<B>(f: (a: A) => B) {
                return container(f(a))
            },
            get() { return a }
        }
        const proxy = new Proxy(target, {
            get(target, prop) {
                if (fs[prop as keyof Fs]) {
                    return () => container((fs[prop as keyof Fs] as any)(a))
                }
                const v = a[prop as keyof A]
                return 0
                    || target[prop as keyof typeof target]
                    || (typeof v == "function"
                        ? (...args: unknown[]) => container(v.bind(a)(args))
                        : container(v))
            }
        }) as Container<A, Fs>
    
        return proxy
    }

    return container
}
