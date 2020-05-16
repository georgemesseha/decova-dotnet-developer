import { TimeSpan } from "../src/index";

describe('TimeSpan', () => 
{
    it('Parse() to work correctly', ()=>
    {
        expect(TimeSpan.Parse(' 7 ').Ticks)
        .toEqual(TimeSpan.FromDays(7).Ticks);

        expect(TimeSpan.Parse(' 7 48').Ticks)
        .toEqual(TimeSpan.FromDays(9).Ticks);

        expect(TimeSpan.Parse('5 28 30').Ticks)
        .toEqual(TimeSpan.FromDays(6).AddHours(4).AddMinutes(30).Ticks);

        expect(TimeSpan.Parse('5 28 70').Ticks)
        .toEqual(TimeSpan.FromDays(6).AddHours(5).AddMinutes(10).Ticks);

        expect(TimeSpan.Parse('1 2 30').Ticks)
        .toEqual(TimeSpan.FromDays(1).AddHours(2).AddMinutes(30).Ticks);

        expect(TimeSpan.Parse('1 2 30 50 456').Ticks)
        .toEqual(TimeSpan.FromDays(1).AddHours(2).AddMinutes(30).AddSeconds(50).AddMilliSeconds(456).Ticks);

    })  
});
