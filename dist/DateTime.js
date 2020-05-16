"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const List_1 = require("./List");
var WeekDay;
(function (WeekDay) {
    WeekDay[WeekDay["Sunday"] = 0] = "Sunday";
    WeekDay[WeekDay["Monday"] = 1] = "Monday";
    WeekDay[WeekDay["Tuesday"] = 2] = "Tuesday";
    WeekDay[WeekDay["Wednesday"] = 3] = "Wednesday";
    WeekDay[WeekDay["Thursday"] = 4] = "Thursday";
    WeekDay[WeekDay["Friday"] = 5] = "Friday";
    WeekDay[WeekDay["Saturday"] = 6] = "Saturday";
})(WeekDay = exports.WeekDay || (exports.WeekDay = {}));
var DateFormat;
(function (DateFormat) {
    DateFormat["yyyy_MM_dd"] = "yyyy_MM_dd";
    DateFormat["dd_MM_yyy"] = "dd_MM_yyy";
    DateFormat["MM_dd_yyyy"] = "MM_dd_yyyy";
})(DateFormat = exports.DateFormat || (exports.DateFormat = {}));
class Conv {
}
Conv.SecTicks = 1000;
Conv.MinuteTicks = 60000;
Conv.HourTicks = 3600000;
Conv.DayTicks = 86400000;
Conv.WeekTicks = 604800000;
class TimeSpan {
    constructor(_ticks) {
        this._ticks = _ticks;
    }
    get Ticks() {
        return this._ticks;
        this.valueOf = () => this._ticks;
    }
    get TotalSeconds() {
        return this.Ticks / Conv.SecTicks;
    }
    get TotalMinutes() {
        return this.Ticks / Conv.MinuteTicks;
    }
    get TotalHours() {
        return this.Ticks / Conv.HourTicks;
    }
    get TotalDays() {
        return this.Ticks / Conv.DayTicks;
    }
    get Days() {
        return Math.floor(this.Ticks / Conv.DayTicks);
    }
    get Hours() {
        let ticks = this.Ticks % Conv.DayTicks;
        return Math.floor(ticks);
    }
    get Minutes() {
        let ticks = this.Ticks % Conv.HourTicks;
        return Math.floor(ticks);
    }
    get Seconds() {
        let ticks = this.Ticks % Conv.MinuteTicks;
        return Math.floor(ticks);
    }
    get Milliseconds() {
        let ticks = this.Ticks % Conv.SecTicks;
        return Math.floor(ticks);
    }
    static FromMilliSeconds(milliSec) {
        return new TimeSpan(milliSec);
    }
    AddMilliSeconds(milliSec) {
        return new TimeSpan(this.Ticks + milliSec);
    }
    static FromSeconds(seconds) {
        return new TimeSpan(seconds * 1000);
    }
    AddSeconds(seconds) {
        return new TimeSpan(this.Ticks + seconds * 1000);
    }
    static FromMinutes(minutes) {
        return new TimeSpan(minutes * 60 * 1000);
    }
    AddMinutes(minutes) {
        return new TimeSpan(this.Ticks + minutes * 60 * 1000);
    }
    static FromHours(hours) {
        return new TimeSpan(hours * 60 * 60 * 1000);
    }
    AddHours(hours) {
        return new TimeSpan(this.Ticks + hours * 60 * 60 * 1000);
    }
    static FromDays(days) {
        return new TimeSpan(days * 24 * 60 * 60 * 1000);
    }
    AddDays(days) {
        return new TimeSpan(this.Ticks + days * 24 * 60 * 60 * 1000);
    }
    static FromWeeks(weeks) {
        return new TimeSpan(weeks * 7 * 24 * 60 * 60 * 1000);
    }
    AddWeeks(weeks) {
        return new TimeSpan(this.Ticks + weeks * 7 * 24 * 60 * 60 * 1000);
    }
    Absolute() {
        return new TimeSpan(Math.abs(this.Ticks));
    }
    Negate() {
        return new TimeSpan(-this.Ticks);
    }
    Multiply(factor) {
        return new TimeSpan(this.Ticks * factor);
    }
    Subtract(span) {
        return new TimeSpan(this.Ticks - span.Ticks);
    }
    CompareTo(another) {
        if (this.Ticks > another.Ticks)
            return 1;
        if (this.Ticks < another.Ticks)
            return -1;
        return 0;
    }
    Add(span) {
        return new TimeSpan(this.Ticks + span.Ticks);
    }
}
exports.TimeSpan = TimeSpan;
class DateTime {
    constructor(ticks = 0) {
        this.ticks = ticks;
        this._Ticks = ticks;
        this.valueOf = () => this.Ticks;
    }
    get Ticks() {
        return this._Ticks;
    }
    static get MinValue() {
        return new DateTime(0);
    }
    static get MaxValue() {
        return new DateTime(864000000000000);
    }
    static get Now() {
        return new DateTime(Date.now().valueOf());
    }
    AsLocalToUtc() {
        let local = Date.parse('2020-01-01').valueOf();
        let utc = Date.UTC(2020, 0, 1).valueOf();
        return new DateTime(this.ticks - local + utc);
    }
    AsUtcToLocal() {
        let local = Date.parse('2020-01-01').valueOf();
        let utc = Date.UTC(2020, 0, 1).valueOf();
        return new DateTime(this.ticks - utc + local);
    }
    static TryParse(dateTimeInText, refResult, format = DateFormat.yyyy_MM_dd) {
        dateTimeInText = dateTimeInText.trim();
        let parts = new List_1.List(dateTimeInText.split(/\s*\D\s*/));
        if (new List_1.List([3, 6, 7]).contains(parts.count) == false
            || parts.Any(p => /\D/.test(p))) {
            if (refResult != null) {
                refResult.ErrorMessage = "Invalid DateTime format. Valid formats should satisfy the following two conditions: (1) it should be composed of [3, 5, 6, or 7] parts. 3 parts for date only, 6 parts for date and time excluding millisec part, and 7 prats for the whole date and time including the milliseconds part. (2) Parts separators could be either one or more spaces or any non-digit character preceded or succeeded by zero or more white spaces.";
            }
            return false;
        }
        else {
            let numParts = parts.Select(sp => new Number(sp).valueOf()).array;
            let year, month, day, hour, minute, sec, milliSec;
            switch (format) {
                case DateFormat.yyyy_MM_dd:
                    year = numParts[0];
                    month = numParts[1];
                    day = numParts[2];
                    break;
                case DateFormat.MM_dd_yyyy:
                    year = numParts[2];
                    month = numParts[0];
                    day = numParts[1];
                    break;
                case DateFormat.dd_MM_yyy:
                    year = numParts[2];
                    month = numParts[1];
                    day = numParts[0];
                    break;
            }
            hour = (numParts.length > 3) ? numParts[3] : 0;
            minute = (numParts.length > 4) ? numParts[4] : 0;
            sec = (numParts.length > 5) ? numParts[5] : 0;
            milliSec = (numParts.length > 6) ? numParts[6] : 0;
            try {
                Date.parse(`${year}-${month}-${day} ${hour}:${minute}:${sec}.${milliSec}`);
            }
            catch (er) {
                refResult.ErrorMessage = er.toString();
                return false;
            }
            if (refResult != null) {
                refResult.ErrorMessage = "";
                refResult.Result = new DateTime(Date.parse(`${year}-${month}-${day} ${hour}:${minute}:${sec}.${milliSec}`));
            }
            return true;
        }
    }
    static Parse(dateTimeInText, format = DateFormat.yyyy_MM_dd) {
        let refResult = { Result: DateTime.MinValue, ErrorMessage: "null" };
        if (DateTime.TryParse(dateTimeInText, refResult, format)) {
            return refResult.Result;
        }
        else {
            throw new Error(refResult.ErrorMessage);
        }
    }
    get Year() {
        return new Date(this.Ticks).getFullYear();
    }
    get Month() {
        return new Date(this.Ticks).getMonth() + 1;
    }
    get DayOfMonth() {
        return new Date(this.Ticks).getDate();
    }
    get DayOfWeek() {
        let dayOfWeek = new Date(this.Ticks).getDay();
        return Object.getPrototypeOf(WeekDay)[dayOfWeek];
    }
    get Hour() {
        return new Date(this.Ticks).getHours();
    }
    get Minute() {
        return new Date(this.Ticks).getMinutes();
    }
    get Second() {
        return new Date(this.Ticks).getSeconds();
    }
    get MilliSecond() {
        return new Date(this.Ticks).getMilliseconds();
    }
    AddDays(daysToAdd) {
        return new DateTime(this.Ticks + daysToAdd * 24 * 60 * 60 * 1000);
    }
    AddHours(hoursToAdd) {
        return new DateTime(this.Ticks + hoursToAdd * 60 * 60 * 1000);
    }
    AddMinutes(minutesToAdd) {
        return new DateTime(this.Ticks + minutesToAdd * 60 * 1000);
    }
    AddSeconds(secondsToAdd) {
        return new DateTime(this.Ticks + secondsToAdd * 1000);
    }
    AddMilliseconds(millisecondsToAdd) {
        return new DateTime(this.Ticks + millisecondsToAdd);
    }
    Compare(otherDateTime) {
        return this > otherDateTime ? 1 : (this < otherDateTime ? -1 : 0);
    }
    get Date() {
        return DateTime.Parse(`${this.Year}-${this.Month}-${this.DayOfMonth}`);
    }
    Minus(anotherDateTime) {
        return new TimeSpan(this.Ticks - anotherDateTime.Ticks);
    }
    get TimeOfDay() {
        return new TimeSpan(this.Ticks - this.Date.Ticks);
    }
}
exports.DateTime = DateTime;
//# sourceMappingURL=DateTime.js.map