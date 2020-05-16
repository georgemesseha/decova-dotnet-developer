export declare class TimeSpan {
    private _ticks;
    constructor(_ticks: number);
    static Parse(text: string): TimeSpan;
    readonly Ticks: number;
    readonly TotalSeconds: number;
    readonly TotalMinutes: number;
    readonly TotalHours: number;
    readonly TotalDays: number;
    readonly Days: number;
    readonly Hours: number;
    readonly Minutes: number;
    readonly Seconds: number;
    readonly Milliseconds: number;
    static FromMilliSeconds(milliSec: number): TimeSpan;
    AddMilliSeconds(milliSec: number): TimeSpan;
    static FromSeconds(seconds: number): TimeSpan;
    AddSeconds(seconds: number): TimeSpan;
    static FromMinutes(minutes: number): TimeSpan;
    AddMinutes(minutes: number): TimeSpan;
    static FromHours(hours: number): TimeSpan;
    AddHours(hours: number): TimeSpan;
    static FromDays(days: number): TimeSpan;
    AddDays(days: number): TimeSpan;
    static FromWeeks(weeks: number): TimeSpan;
    AddWeeks(weeks: number): TimeSpan;
    Absolute(): TimeSpan;
    Negate(): TimeSpan;
    Multiply(factor: number): TimeSpan;
    Subtract(span: TimeSpan): TimeSpan;
    CompareTo(another: TimeSpan): number;
    Add(span: TimeSpan): TimeSpan;
    static readonly Zero: TimeSpan;
    ToString(): string;
    readonly _: string;
}
//# sourceMappingURL=TimeSpan.d.ts.map