"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const List_1 = require("../List");
const DateFormat_1 = require("./DateFormat");
const WeekDay_1 = require("./WeekDay");
const TimeSpan_1 = require("./TimeSpan");
class DateTime {
    constructor(_Ticks = 0) {
        this._Ticks = _Ticks;
        if (_Ticks > 864000000000000)
            throw new Error('Value exceeds DateTime.Max.');
        if (_Ticks < 0)
            throw new Error('Value is less than DateTime.Min');
        this.valueOf = () => this.Ticks;
    }
    get Ticks() {
        return this._Ticks;
    }
    ToString() {
        return `${this.Year}-${this.Month}-${this.DayOfMonth} ${this.Hour}:${this.Minute}:${this.Second}.${this.MilliSecond}`;
    }
    get _() {
        return this.ToString();
    }
    static get Min() {
        return new DateTime(0);
    }
    static get Max() {
        return new DateTime(864000000000000);
    }
    static get Now() {
        return new DateTime(Date.now().valueOf());
    }
    AsLocalToUtc() {
        let utc = new Date(2020, 0, 1).valueOf();
        let local = Date.UTC(2020, 0, 1).valueOf();
        return new DateTime(this._Ticks - (local - utc));
    }
    AsUtcToLocal() {
        let utc = new Date(2020, 0, 1).valueOf();
        let local = Date.UTC(2020, 0, 1).valueOf();
        return new DateTime(this._Ticks - (utc - local));
    }
    static TryParse(text, refResult, format = DateFormat_1.DateFormat.yyyy_MM_dd) {
        text = text.trim();
        let parts = new List_1.List(text.split(/\s*\D\s*/));
        if (new List_1.List([3, 6, 7]).contains(parts.count) == false
            || parts.Any(p => /\D/.test(p))) {
            if (refResult != null) {
                refResult.ErrorMessage = "Invalid DateTime format. Valid formats should satisfy the following two conditions: (1) it should be composed of [3, 5, 6, or 7] parts. 3 parts for date only, 6 parts for date and time excluding millisec part, and 7 prats for the whole date and time including the milliseconds part. (2) Parts separators could be any single non-digit characters while extra spaces arround are not significant. (It's not required to have a consistent use of the single separator)";
            }
            return false;
        }
        else {
            let numParts = parts.Select(sp => new Number(sp).valueOf()).array;
            let year = 0, month = 0, day = 0, hour = 0, minute = 0, sec = 0, milliSec = 0;
            switch (format) {
                case DateFormat_1.DateFormat.yyyy_MM_dd:
                    year = numParts[0];
                    month = numParts[1];
                    day = numParts[2];
                    break;
                case DateFormat_1.DateFormat.MM_dd_yyyy:
                    year = numParts[2];
                    month = numParts[0];
                    day = numParts[1];
                    break;
                case DateFormat_1.DateFormat.dd_MM_yyy:
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
                let ticks = Date.parse(`${year}-${month}-${day} ${hour}:${minute}:${sec}.${milliSec}`);
                let fuckenJsDate = new DateTime(ticks);
                if (fuckenJsDate.MilliSecond != milliSec) {
                    refResult.ErrorMessage = `Wrong millisecond part: ${milliSec}`;
                    return false;
                }
                if (fuckenJsDate.Second != sec) {
                    refResult.ErrorMessage = `Wrong second part: ${sec}`;
                    return false;
                }
                else if (fuckenJsDate.Minute != minute) {
                    refResult.ErrorMessage = `Wrong minute part: ${minute}`;
                    return false;
                }
                else if (fuckenJsDate.Hour != hour) {
                    refResult.ErrorMessage = `Wrong hour part: ${hour}`;
                    return false;
                }
                else if (fuckenJsDate.DayOfMonth != day) {
                    refResult.ErrorMessage = `Wrong hour part: ${day}`;
                    return false;
                }
                else if (fuckenJsDate.Month != month) {
                    refResult.ErrorMessage = `Wrong month part: ${month}`;
                    return false;
                }
                else if (fuckenJsDate.Year != year) {
                    refResult.ErrorMessage = `Wrong year part: ${year}`;
                    return false;
                }
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
    static Parse(dateTimeInText, format = DateFormat_1.DateFormat.yyyy_MM_dd) {
        let refResult = { Result: DateTime.Min, ErrorMessage: "null" };
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
        return Object.getPrototypeOf(WeekDay_1.WeekDay)[dayOfWeek];
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
    SubtractDate(another) {
        return new TimeSpan_1.TimeSpan(this.Ticks - another.Ticks);
    }
    SubtractSpan(timeSpan) {
        return new DateTime(this.Ticks - timeSpan.Ticks);
    }
    Equals(another) {
        return this.Ticks === another.Ticks;
    }
    get TimeOfDay() {
        return new TimeSpan_1.TimeSpan(this.Ticks - this.Date.Ticks);
    }
}
exports.DateTime = DateTime;
//# sourceMappingURL=DateTime.js.map