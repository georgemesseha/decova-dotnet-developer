import { Conv } from "./Conv";
import { List } from "../index";

export class TimeSpan
{
    constructor(private _ticks:number)
    {
        
    }

   
    public static Parse(text: string): TimeSpan
    {
        text = text.trim();
        let parts: List<string> = new List<string>(text.split(/\s*\D\s*/)); 
        if((parts.count<1 || parts.count>5) || parts.Any(p=>/\D/.test(p)))
        {
            throw new Error("Invalid TimeSpan format. Valid formats should satisfy the following two conditions: (1) it should be composed of from 1 to 5 parts, starting from days through to milliseconds. (2) Parts separators could be any single non-digit characters while extra spaces arround are not significant (It's not required to have a consistent use of the single separator)."); 
        }

        let numParts = parts.Select<number>(sp=>new Number(sp).valueOf()).array;
                       
        let day         = numParts[0]; 
        let hour        = (numParts.length > 1)? numParts[1] : 0; 
        let minute      = (numParts.length > 2)? numParts[2] : 0; 
        let sec         = (numParts.length > 3)? numParts[3] : 0; 
        let milliSec    = (numParts.length > 4)? numParts[4] : 0; 
        
        let ticks = (day*Conv.DayTicks)+(hour*Conv.HourTicks)+(minute*Conv.MinuteTicks)+(sec*Conv.SecTicks)+(milliSec);
        return new TimeSpan(ticks); 
    }

    public get Ticks():number
    {
        return this._ticks;
        this.valueOf = ()=> this._ticks;
    }
    public get TotalSeconds(): number
    {
        return this.Ticks / Conv.SecTicks;
    }
    public get TotalMinutes(): number
    {
        return this.Ticks / Conv.MinuteTicks;
    }
    public get TotalHours(): number
    {
        return this.Ticks / Conv.HourTicks;
    }
    public get TotalDays(): number
    {
        return this.Ticks / Conv.DayTicks;
    }

    public get Days(): number
    {
        return Math.floor(this.Ticks / Conv.DayTicks);
    }
    public get Hours(): number
    {
        let ticks = this.Ticks % Conv.DayTicks;
        return Math.floor(ticks);
    }
    public get Minutes(): number
    {
        let ticks = this.Ticks % Conv.HourTicks;
        return Math.floor(ticks);
    }
    public get Seconds(): number
    {
        let ticks = this.Ticks % Conv.MinuteTicks;
        return Math.floor(ticks);
    }
    public get Milliseconds(): number
    {
        let ticks = this.Ticks % Conv.SecTicks;
        return Math.floor(ticks);
    }
    
    public static FromMilliSeconds(milliSec:number): TimeSpan
    {
        return new TimeSpan(milliSec);
    }
    public AddMilliSeconds(milliSec:number): TimeSpan
    {
        return new TimeSpan(this.Ticks + milliSec);
    }

    public static FromSeconds(seconds:number): TimeSpan
    {
        return new TimeSpan(seconds * 1000);
    }
    public AddSeconds(seconds:number): TimeSpan
    {
        return new TimeSpan(this.Ticks + seconds * 1000);
    }

    public static FromMinutes(minutes:number): TimeSpan
    {
        return new TimeSpan(minutes * 60 * 1000);
    }
    public AddMinutes(minutes:number): TimeSpan
    {
        return new TimeSpan(this.Ticks + minutes * 60 * 1000);
    }


    public static FromHours(hours:number): TimeSpan
    {
        return new TimeSpan(hours * 60 * 60 * 1000);
    }
    public AddHours(hours:number): TimeSpan
    {
        return new TimeSpan(this.Ticks + hours * 60 * 60 * 1000);
    }

    public static FromDays(days:number): TimeSpan
    {
        return new TimeSpan(days * 24 * 60 * 60 * 1000);
    }
    public AddDays(days:number): TimeSpan
    {
        return new TimeSpan(this.Ticks + days * 24 * 60 * 60 * 1000);
    }

    public static FromWeeks(weeks:number): TimeSpan
    {
        return new TimeSpan(weeks * 7 * 24 * 60 * 60 * 1000);
    }
    public AddWeeks(weeks:number): TimeSpan
    {
        return new TimeSpan(this.Ticks + weeks * 7 * 24 * 60 * 60 * 1000);
    } 

    public Absolute():TimeSpan
    {
        return new TimeSpan(Math.abs(this.Ticks));
    }

    public Negate(): TimeSpan
    {
        return new TimeSpan(-this.Ticks);
    }

    public Multiply(factor:number): TimeSpan
    {
        return new TimeSpan(this.Ticks*factor);
    }

    public Subtract(span:TimeSpan): TimeSpan
    {
        return new TimeSpan(this.Ticks - span.Ticks);
    }

    public CompareTo(another: TimeSpan): number
    {
        if(this.Ticks > another.Ticks) return 1;
        if(this.Ticks < another.Ticks) return -1;
        return 0;
    }

    public Add(span:TimeSpan): TimeSpan
    {
        return new TimeSpan(this.Ticks + span.Ticks);
    }

    public static get Zero()
    {
        return new TimeSpan(0);
    }

    public ToString(): string
    {
        return `${this.Days} - ${this.Hours}:${this.Minutes}:${this.Seconds}.${this.Milliseconds}`;
    }

    public get _(): string
    {
        return this.ToString();
    }
}