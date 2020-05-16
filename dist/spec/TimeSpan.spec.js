"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
describe('TimeSpan', () => {
    it('Parse() to work correctly', () => {
        expect(index_1.TimeSpan.Parse(' 7 ').Ticks)
            .toEqual(index_1.TimeSpan.FromDays(7).Ticks);
        expect(index_1.TimeSpan.Parse(' 7 48').Ticks)
            .toEqual(index_1.TimeSpan.FromDays(9).Ticks);
        expect(index_1.TimeSpan.Parse('5 28 30').Ticks)
            .toEqual(index_1.TimeSpan.FromDays(6).AddHours(4).AddMinutes(30).Ticks);
        expect(index_1.TimeSpan.Parse('5 28 70').Ticks)
            .toEqual(index_1.TimeSpan.FromDays(6).AddHours(5).AddMinutes(10).Ticks);
        expect(index_1.TimeSpan.Parse('1 2 30').Ticks)
            .toEqual(index_1.TimeSpan.FromDays(1).AddHours(2).AddMinutes(30).Ticks);
        expect(index_1.TimeSpan.Parse('1 2 30 50 456').Ticks)
            .toEqual(index_1.TimeSpan.FromDays(1).AddHours(2).AddMinutes(30).AddSeconds(50).AddMilliSeconds(456).Ticks);
    });
});
//# sourceMappingURL=TimeSpan.spec.js.map