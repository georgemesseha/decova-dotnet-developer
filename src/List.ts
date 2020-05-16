import { Func } from "./CommonDelegates";


/** It works as a proxy to the native Array<T>. It provides the methods expected by a dotnet
 * Linq like functions plus some more methods.
 */
export class List<T>
{
    constructor(public array:Array<T>)
    {
        
    }
 
    public get count():number
    {
        return this.array.length;
    }
    public Select<RType>(func:Func<T, RType>) : List<RType>
    {
        var newArr = this.array.map(item=>func(item));
        return new List<RType>(newArr);
    }
    public selectMany<RType>(func:Func<T, List<RType>>): List<RType>
    {
        let result = new List<RType>([]);
      
        for(let x=0; x<this.array.length; x++)
        {
            let itemResult:List<RType> = func(<T><unknown>(this.array[x]));
            if(itemResult == undefined) throw `@[List.SelectMany(func) func returned undefined value!]`;

            result.addRange(itemResult);
        }
        return result;
    }
    public foreach(func:Function):void
    {
        this.array.map(item=>func(item));
    }
    public Any(func:Func<T, boolean>|null=null):boolean
    {
        if(func == null) return this.array.length > 0;

        for(let x=0; x<this.array.length; x++)
        {
            if(func(this.array[x] as T) == true)
            {
                return true;
            }
        }
        return false;
    }
    public add(item:T):void
    {
        this.array.push(item);
    }
    /** Only if the item doesn't exist in the list it adds it and returns true, otherwise it returns false */
    public ensureItem(item:T): void
    {
        if(this.contains(item) === false)
        {
            this.add(item);
        }
    }
    public addRange(items:List<T>|Array<T>)
    {
        if(items == undefined) throw `@[List.AddRange(items)] NullArgumentException`;

        if(items.constructor === Array)
        {
            this.array = this.array.concat(items as Array<T>);
        }
        else
        {
            this.array = this.array.concat((items as List<T>).array);
        }
    }
    public where(func:Func<T,boolean>):List<T>
    {
        let result = this.array.filter(e=>func(e));
        return new List<T>(result);
    }
    public ItemAt(index:number):T
    {
        return this.array[index] as T;
    }
    public indexOf(item:T):number
    {
        for(let i=0; i<this.array.length; i++)
        {
            if(this.array[i] === item) return i;
        }

        return -1;
    }
    public removeAt(index:any): void
    {
        this.array.splice(index, 1);
    }
    public removeRange(index:number, lenght:number)
    {
        if(index+lenght > this.array.length) throw new Error("Range to remove is out of the List range!");

        this.array.splice(index, lenght);
    }
    public removeWhere(func:Func<T,boolean>):void
    {
        for(let x=0; x<this.array.length; x++)
        {
            if(func(this.array[x]))
            {
                this.removeAt(x);
                x --;
            }
        }
    }
    public getRange(index:number, length:number|undefined=undefined) : List<T>
    {
        if(length === undefined)
        {
            length = this.array.length - index;
        }

        if(index+length > this.array.length) throw new Error("range is out of List's range");

        return new List<T>(this.array.slice(index, index+length));
    }
    public insert(index:number, item:T)
    {
        this.array.splice(index, 0, item);
    }
    public insertRange(index:number, items:List<T>|Array<T>)
    {
        let inputArr:Array<T>;
        if(items.constructor == List)
        {
            inputArr = (items as List<T>).array;
        }
        else
        {
            inputArr = items as Array<T>;
        }

        let before = this.getRange(0, index);
        let after = this.getRange(index) as List<T>;

        let output = before.clone();
        output.addRange(new List<T>(inputArr));
        output.addRange(after);
        
        this.array =  output.array;
    }
    public firstOrDefault(func:Func<T,boolean>|null)
    {
        if(func == null)
        {
            if(this.array.length == 0)
            {
                return null;
            }
            else
            {
                return this.array[0]; 
            }
        }

        for(let x=0; x<this.array.length; x++)
        {
            if(func(this.array[x]) === true)
            {
               return this.array[x];
            }
        }
        return null;
    }
    public First(func:Func<T,boolean>|null=null):T
    {
        let result = this.firstOrDefault(func);
        if(result == null)
        {
            throw "No elements found";
        }
        else
        {
            return result;
        }       
    }
    public lastOrDefault(func:Func<T,boolean>|null=null):T|null
    {
        if(this.array.length == 0) return null;

        if(func == null) return this.array[this.array.length - 1]; 

        for(let x=this.array.length - 1; x>=0; x--)
        {
            if(func(this.array[x]) == true)
            {
               return this.array[x];
            }
        }

        return null;
    }
    public last(func:Func<T,boolean>|null=null):T
    {
        let result = this.lastOrDefault(func);
        if(result == null)
        {
            throw "No elements found";
        }
        else
        {
            return result;
        }       
    }
    public skip(countToSkip:number): List<T>
    {
        if(countToSkip > this.array.length) throw new Error("countToSkip is out of range!");
        return new List<T>(this.array.slice(countToSkip));
    }
    public take(countToTake:number): List<T>
    {
        if(countToTake > this.array.length) throw new Error("countToTake is out of range!");
        return new List<T>(this.array.slice(0,countToTake));
    }
    public contains(obj:T):boolean
    {
        return this.Any(o=>o === obj);
    }
    public distinct():List<T>
    {
        let result = new List<T>(new Array<T>());

        for(let x=0; x<this.array.length; x++)
        {
            let item = this.array[x];
            if(! result.contains(item))
            {
                result.add(item);
            }
        }

        return result;
    }
    public except(excepted:List<T>):List<T>
    {
        let result = new List<T>(new Array<T>());

        for(let x=0; x<this.array.length; x++)
        {
            if(! excepted.contains(this.array[x]))
            {
                result.add(this.array[x]);
            }
        }

        return result;
    }
    public clone():List<T>
    {
        let result = new List<T>(new Array());
        result.addRange(this.array);
        return result;
    }

    /** Returns the intersection of this list and the passed one. In case there are repitions in any
     * or in the both of them they will be ignored. i.e, distinct items returned.
     */
    public intersect(otherList:List<T>):List<T>
    {
        let result = new List<T>(new Array<T>());

        let otherListCopy = otherList.clone();
        let thisListCopy = this.clone();

        while(thisListCopy.Any() && otherListCopy.Any())
        {
           let item = thisListCopy.array[0];

           let common = otherListCopy.firstOrDefault(i=>i===item);
           if(common == null) 
           {
                thisListCopy.removeWhere((i:T)=>i == item);
           }
           else
           {
                result.add(item);
                thisListCopy.removeWhere((i:T)=>i === item);
                otherListCopy.removeWhere((i:T)=>i === item);
           }
        }

        return result;
    }


}

// }

// let x = new List<string>(['George', 'Sherine', 'Joseph', 'Sameh', 'Mohsen', 'Kimo']);

// let y = new List<string>(['Abdo', 'Mohsen', 'George', 'Abd-ElSameee', 'George', 'Abdo', 'Mohsen', 'Kimo']);

// console.log(y.intersect(x));
// console.log(x.take(2));
// console.log(y.skip(3))
// console.log(y.distinct())
// console.log(y.getRange(3,3))
// console.log(x.last())
// let clone = x.clone();
// clone.removeRange(0, 4);
// console.log("clone", clone);
// console.log();
// console.log(x);

