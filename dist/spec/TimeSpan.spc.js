"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
describe('TimeSpan', () => {
    it('Parse() to work correctly', () => {
        expect(index_1.TimeSpan.Parse('1 2 30').Ticks)
            .toEqual(index_1.TimeSpan.FromDays(1).AddHours(2).AddMinutes(30).Ticks);
    });
});
//# sourceMappingURL=TimeSpan.spc.js.map