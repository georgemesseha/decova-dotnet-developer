"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class List {
    constructor(array) {
        this.array = array;
    }
    get count() {
        return this.array.length;
    }
    Select(func) {
        var newArr = this.array.map(item => func(item));
        return new List(newArr);
    }
    selectMany(func) {
        let result = new List([]);
        for (let x = 0; x < this.array.length; x++) {
            let itemResult = func((this.array[x]));
            if (itemResult == undefined)
                throw `@[List.SelectMany(func) func returned undefined value!]`;
            result.addRange(itemResult);
        }
        return result;
    }
    foreach(func) {
        this.array.map(item => func(item));
    }
    Any(func = null) {
        if (func == null)
            return this.array.length > 0;
        for (let x = 0; x < this.array.length; x++) {
            if (func(this.array[x]) == true) {
                return true;
            }
        }
        return false;
    }
    add(item) {
        this.array.push(item);
    }
    ensureItem(item) {
        if (this.contains(item) === false) {
            this.add(item);
        }
    }
    addRange(items) {
        if (items == undefined)
            throw `@[List.AddRange(items)] NullArgumentException`;
        if (items.constructor === Array) {
            this.array = this.array.concat(items);
        }
        else {
            this.array = this.array.concat(items.array);
        }
    }
    where(func) {
        let result = this.array.filter(e => func(e));
        return new List(result);
    }
    ItemAt(index) {
        return this.array[index];
    }
    indexOf(item) {
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i] === item)
                return i;
        }
        return -1;
    }
    removeAt(index) {
        this.array.splice(index, 1);
    }
    removeRange(index, lenght) {
        if (index + lenght > this.array.length)
            throw new Error("Range to remove is out of the List range!");
        this.array.splice(index, lenght);
    }
    removeWhere(func) {
        for (let x = 0; x < this.array.length; x++) {
            if (func(this.array[x])) {
                this.removeAt(x);
                x--;
            }
        }
    }
    getRange(index, length = undefined) {
        if (length === undefined) {
            length = this.array.length - index;
        }
        if (index + length > this.array.length)
            throw new Error("range is out of List's range");
        return new List(this.array.slice(index, index + length));
    }
    insert(index, item) {
        this.array.splice(index, 0, item);
    }
    insertRange(index, items) {
        let inputArr;
        if (items.constructor == List) {
            inputArr = items.array;
        }
        else {
            inputArr = items;
        }
        let before = this.getRange(0, index);
        let after = this.getRange(index);
        let output = before.clone();
        output.addRange(new List(inputArr));
        output.addRange(after);
        this.array = output.array;
    }
    firstOrDefault(func) {
        if (func == null) {
            if (this.array.length == 0) {
                return null;
            }
            else {
                return this.array[0];
            }
        }
        for (let x = 0; x < this.array.length; x++) {
            if (func(this.array[x]) === true) {
                return this.array[x];
            }
        }
        return null;
    }
    First(func = null) {
        let result = this.firstOrDefault(func);
        if (result == null) {
            throw "No elements found";
        }
        else {
            return result;
        }
    }
    lastOrDefault(func = null) {
        if (this.array.length == 0)
            return null;
        if (func == null)
            return this.array[this.array.length - 1];
        for (let x = this.array.length - 1; x >= 0; x--) {
            if (func(this.array[x]) == true) {
                return this.array[x];
            }
        }
        return null;
    }
    last(func = null) {
        let result = this.lastOrDefault(func);
        if (result == null) {
            throw "No elements found";
        }
        else {
            return result;
        }
    }
    skip(countToSkip) {
        if (countToSkip > this.array.length)
            throw new Error("countToSkip is out of range!");
        return new List(this.array.slice(countToSkip));
    }
    take(countToTake) {
        if (countToTake > this.array.length)
            throw new Error("countToTake is out of range!");
        return new List(this.array.slice(0, countToTake));
    }
    contains(obj) {
        return this.Any(o => o === obj);
    }
    distinct() {
        let result = new List(new Array());
        for (let x = 0; x < this.array.length; x++) {
            let item = this.array[x];
            if (!result.contains(item)) {
                result.add(item);
            }
        }
        return result;
    }
    except(excepted) {
        let result = new List(new Array());
        for (let x = 0; x < this.array.length; x++) {
            if (!excepted.contains(this.array[x])) {
                result.add(this.array[x]);
            }
        }
        return result;
    }
    clone() {
        let result = new List(new Array());
        result.addRange(this.array);
        return result;
    }
    intersect(otherList) {
        let result = new List(new Array());
        let otherListCopy = otherList.clone();
        let thisListCopy = this.clone();
        while (thisListCopy.Any() && otherListCopy.Any()) {
            let item = thisListCopy.array[0];
            let common = otherListCopy.firstOrDefault(i => i === item);
            if (common == null) {
                thisListCopy.removeWhere((i) => i == item);
            }
            else {
                result.add(item);
                thisListCopy.removeWhere((i) => i === item);
                otherListCopy.removeWhere((i) => i === item);
            }
        }
        return result;
    }
}
exports.List = List;
//# sourceMappingURL=List.js.map