import { DateFormat } from "./DateFormat";
import { WeekDay } from "./WeekDay";
import { TimeSpan } from "./TimeSpan";
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
    static TryParse(text: string, refResult: {
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