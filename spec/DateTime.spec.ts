import { DateTime, TimeSpan, DateFormat } from '../src/index';


describe("DateTime", ()=>
{
    it("Should parse correctly", ()=>
    {
        const d = DateTime.Parse('2020-02-01');
        expect(d.Year).toEqual(2020);
        expect(d.Month).toEqual(2);
        expect(d.DayOfMonth).toEqual(1);
    });
    it("Should parse correctly with MM-dd-yyyy", ()=>
    {
        const d = DateTime.Parse('02-01-2020', DateFormat.MM_dd_yyyy);
        expect(d.Year).toEqual(2020);
        expect(d.Month).toEqual(2);
        expect(d.DayOfMonth).toEqual(1);
    });
    it("Should parse correctly with dd-mm-yyyy", ()=>
    {
        const d = DateTime.Parse('01-02-2020', DateFormat.dd_MM_yyy);
        expect(d.Year).toEqual(2020);
        expect(d.Month).toEqual(2);
        expect(d.DayOfMonth).toEqual(1);
    });
    it("Subtract() should work correctly", ()=>
    {
        const d = DateTime.Parse('01-02-2020', DateFormat.dd_MM_yyy);
        expect(d.Month).toEqual(2);
        expect(d.DayOfMonth).toEqual(1);

        expect(d.SubtractDate(d).Ticks).toEqual(TimeSpan.Zero.Ticks);
        expect(d.SubtractDate(d).Ticks).toEqual(0);
    });
    it("AsLocalToUtc() should work correctly", ()=>
    {
        const local = DateTime.Parse('2020-02-01');
        const utc = local.AsLocalToUtc();
       
        const diff = local.SubtractDate(utc);

        expect(diff.TotalHours).toEqual(2);
    });
    it("AsUtcToLocal() should work correctly", ()=>
    {
        const utc = DateTime.Parse('2020-02-01');
        const local = utc.AsUtcToLocal();
       
        const diff = local.SubtractDate(utc);

        expect(diff.TotalHours).toEqual(2);
    });
    it("TryParse() should succeed", ()=>
    {
        let result = {Result:DateTime.Min, ErrorMessage:""};
        expect(DateTime.TryParse("2020/01*02 23@23#15.156", result))
        .toEqual(true);

        expect(result.ErrorMessage).toEqual("");
        expect(result.Result.Ticks).toEqual(DateTime.Parse('2020-01-02 23:23:15.156').Ticks);
    });
    it("TryParse() should fail on month=15", ()=>
    {
        let result = {Result:DateTime.Min, ErrorMessage:""};

        expect(DateTime.TryParse("2020/15*02 23@23#15.156", result))
        .toEqual(false);
    });
    it("TryParse() should fail on month=2 day=30", ()=>
    {
        let result = {Result:DateTime.Min, ErrorMessage:""};

        expect(DateTime.TryParse("2020-02-30 23:23:15.156", result))
        .toEqual(false);
    });
    it("TryParse() should fail on month=4 day=31", ()=>
    {
        let result = {Result:DateTime.Min, ErrorMessage:""};

        expect(DateTime.TryParse("2020-04-31 23:23:15.156", result))
        .toEqual(false);
    });
    it("Parse() throw on month=4 day=31", ()=>
    {
        expect(()=>DateTime.Parse("2020-04-31 23:23:15.156"))
        .toThrow();
    });

    it("Parse() should throw on month=15", ()=>
    {       
        expect(()=>{DateTime.Parse("2020/15*02 23@23#15.156")})
        .toThrowError();
    });
    it("Parse() should throw on -- as a separator", ()=>
    {
        expect(()=>DateTime.Parse("2020-04--31 23:23:15.156"))
        .toThrow();
    });
    it("Parse() should succeed on extra spaces", ()=>
    {
        expect(DateTime.Parse("2020 - 04-30 23 :23:15.156").Ticks)
        .toBeGreaterThan(0);
    });
    it("Parse() should throw on date more than maximum value", ()=>
    {
        expect(()=>new DateTime(DateTime.Max.Ticks + 1))
        .toThrow();
    });
    it("Parse() should throw on date more less than minimum value", ()=>
    {
        expect(()=>new DateTime(DateTime.Min.Ticks - 1))
        .toThrow();
    });
    it("Parse() should throw on adding to a max date", ()=>
    {
        expect(()=> DateTime.Max.AddMilliseconds(1))
        .toThrow();
    });
    it("Parse() should throw on subtracting from a min date", ()=>
    {
        expect(()=> DateTime.Min.AddMilliseconds(-1))
        .toThrow();
    });
    it("Equals() should work correctly", ()=>
    {
        let random = DateTime.Now.Ticks;
        expect(new DateTime(random).Equals(new DateTime(random))).toEqual(true);
        expect(new DateTime(random).AddDays(2).Equals(new DateTime(random).AddDays(2))).toEqual(true);
        expect(new DateTime(random).Equals(new DateTime(random).AddMilliseconds(1))).toEqual(false);     
    });
    it("TimeOfDay should return a valid TimeSpan", ()=>
    {
        let d = DateTime.Parse('2020 02 02 15 32 05 123');
        let time = TimeSpan.FromHours(15).AddMinutes(32).AddSeconds(5).AddMilliSeconds(123);

        expect(d.TimeOfDay.Ticks == time.Ticks).toEqual(true);
    });
    
    
});