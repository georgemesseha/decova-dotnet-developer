"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Conv_1 = require("./Conv");
const index_1 = require("../index");
class TimeSpan {
    constructor(_ticks) {
        this._ticks = _ticks;
    }
    static Parse(text) {
        text = text.trim();
        let parts = new index_1.List(text.split(/\s*\D\s*/));
        if ((parts.count < 1 || parts.count > 5) || parts.Any(p => /\D/.test(p))) {
            throw new Error("Invalid TimeSpan format. Valid formats should satisfy the following two conditions: (1) it should be composed of from 1 to 5 parts, starting from days through to milliseconds. (2) Parts separators could be any single non-digit characters while extra spaces arround are not significant (It's not required to have a consistent use of the single separator).");
        }
        let numParts = parts.Select(sp => new Number(sp).valueOf()).array;
        let day = numParts[0];
        let hour = (numParts.length > 1) ? numParts[1] : 0;
        let minute = (numParts.length > 2) ? numParts[2] : 0;
        let sec = (numParts.length > 3) ? numParts[3] : 0;
        let milliSec = (numParts.length > 4) ? numParts[4] : 0;
        let ticks = (day * Conv_1.Conv.DayTicks) + (hour * Conv_1.Conv.HourTicks) + (minute * Conv_1.Conv.MinuteTicks) + (sec * Conv_1.Conv.SecTicks) + (milliSec);
        return new TimeSpan(ticks);
    }
    get Ticks() {
        return this._ticks;
        this.valueOf = () => this._ticks;
    }
    get TotalSeconds() {
        return this.Ticks / Conv_1.Conv.SecTicks;
    }
    get TotalMinutes() {
        return this.Ticks / Conv_1.Conv.MinuteTicks;
    }
    get TotalHours() {
        return this.Ticks / Conv_1.Conv.HourTicks;
    }
    get TotalDays() {
        return this.Ticks / Conv_1.Conv.DayTicks;
    }
    get Days() {
        return Math.floor(this.Ticks / Conv_1.Conv.DayTicks);
    }
    get Hours() {
        let ticks = this.Ticks % Conv_1.Conv.DayTicks;
        return Math.floor(ticks);
    }
    get Minutes() {
        let ticks = this.Ticks % Conv_1.Conv.HourTicks;
        return Math.floor(ticks);
    }
    get Seconds() {
        let ticks = this.Ticks % Conv_1.Conv.MinuteTicks;
        return Math.floor(ticks);
    }
    get Milliseconds() {
        let ticks = this.Ticks % Conv_1.Conv.SecTicks;
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
    static get Zero() {
        return new TimeSpan(0);
    }
    ToString() {
        return `${this.Days} - ${this.Hours}:${this.Minutes}:${this.Seconds}.${this.Milliseconds}`;
    }
    get _() {
        return this.ToString();
    }
}
exports.TimeSpan = TimeSpan;
//# sourceMappingURL=TimeSpan.js.map