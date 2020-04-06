export default class Singleton {
    private static instance: Singleton

    public static getInstance<T extends Singleton>(): T {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton()
        }

        return Singleton.instance as T
    }
}