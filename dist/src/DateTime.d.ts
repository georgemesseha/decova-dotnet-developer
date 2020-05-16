export declare enum WeekDay {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
export declare enum DateFormat {
    yyyy_MM_dd = "yyyy_MM_dd",
    dd_MM_yyy = "dd_MM_yyy",
    MM_dd_yyyy = "MM_dd_yyyy"
}
export declare class TimeSpan {
    private _ticks;
    constructor(_ticks: number);
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
export declare class DateTime {
    private _Ticks;
    readonly Ticks: number;
    constructor(_Ticks?: number);
    ToString(): string;
    readonly _: string;
    static readonly Min: DateTime;
    static readonly Max: DateTime;
    static readonly Now: DateTime;
    AsLocalToUtc(): DateTime;
    AsUtcToLocal(): DateTime;
    static TryParse(dateTimeInText: string, refResult: {
        Result: DateTime;
        ErrorMessage: string;
    }, format?: DateFormat): boolean;
    static Parse(dateTimeInText: string, format?: DateFormat): DateTime;
    readonly Year: number;
    readonly Month: number;
    readonly DayOfMonth: number;
    readonly DayOfWeek: WeekDay;
    readonly Hour: number;
    readonly Minute: number;
    readonly Second: number;
    readonly MilliSecond: number;
    AddDays(daysToAdd: number): DateTime;
    AddHours(hoursToAdd: number): DateTime;
    AddMinutes(minutesToAdd: number): DateTime;
    AddSeconds(secondsToAdd: number): DateTime;
    AddMilliseconds(millisecondsToAdd: number): DateTime;
    Compare(otherDateTime: DateTime): 1 | 0 | -1;
    readonly Date: DateTime;
    SubtractDate(another: DateTime): TimeSpan;
    SubtractSpan(timeSpan: TimeSpan): DateTime;
    Equals(another: DateTime): boolean;
    readonly TimeOfDay: TimeSpan;
}
//# sourceMappingURL=DateTime.d.ts.map