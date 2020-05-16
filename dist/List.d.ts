import { Func } from "./CommonDelegates";
export declare class List<T> {
    array: Array<T>;
    constructor(array: Array<T>);
    readonly count: number;
    Select<RType>(func: Func<T, RType>): List<RType>;
    selectMany<RType>(func: Func<T, List<RType>>): List<RType>;
    foreach(func: Function): void;
    Any(func?: Func<T, boolean> | null): boolean;
    add(item: T): void;
    ensureItem(item: T): void;
    addRange(items: List<T> | Array<T>): void;
    where(func: Func<T, boolean>): List<T>;
    ItemAt(index: number): T;
    indexOf(item: T): number;
    removeAt(index: any): void;
    removeRange(index: number, lenght: number): void;
    removeWhere(func: Func<T, boolean>): void;
    getRange(index: number, length?: number | undefined): List<T>;
    insert(index: number, item: T): void;
    insertRange(index: number, items: List<T> | Array<T>): void;
    firstOrDefault(func: Func<T, boolean> | null): T | null;
    First(func?: Func<T, boolean> | null): T;
    lastOrDefault(func?: Func<T, boolean> | null): T | null;
    last(func?: Func<T, boolean> | null): T;
    skip(countToSkip: number): List<T>;
    take(countToTake: number): List<T>;
    contains(obj: T): boolean;
    distinct(): List<T>;
    except(excepted: List<T>): List<T>;
    clone(): List<T>;
    intersect(otherList: List<T>): List<T>;
}
//# sourceMappingURL=List.d.ts.map