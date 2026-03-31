// biome-ignore lint/suspicious/noExplicitAny: (x)
export type Constructor<Class> = new (...args: any[]) => Class;
