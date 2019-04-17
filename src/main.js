"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var fs_1 = require("fs");
var Message = /** @class */ (function () {
    function Message(value) {
        this.value = value;
    }
    Message.none = new Message(null);
    return Message;
}());
// class Concatenate implements Filter{
//     constructor(public readonly a: Filter, public readonly b: Filter) { }
//     do(): Message {
//         return new Message(this.a.do().value.toString() + this.b.do().value.toString())
//     }
// }
// class ConstantString implements Filter {
//     constructor(public readonly c: string) {}
//     do(): Message {
//         return new Message(this.c)
//     }
// }
var ToUpperCase = /** @class */ (function () {
    function ToUpperCase(f) {
        this.f = f;
    }
    ToUpperCase.prototype.next = function () {
        return new Message(this.f.next().value.toUpperCase());
    };
    ToUpperCase.prototype.hasNext = function () {
        return this.f.hasNext();
    };
    return ToUpperCase;
}());
var Writer = /** @class */ (function () {
    function Writer(f) {
        this.f = f;
    }
    Writer.prototype.next = function () {
        console.log(this.f.next().value.toString());
        return Message.none;
    };
    Writer.prototype.hasNext = function () {
        return this.f.hasNext();
    };
    return Writer;
}());
var FileLineReader = /** @class */ (function () {
    function FileLineReader(fileName) {
        this.fileName = fileName;
        this.lines = fs_1.readFileSync(fileName, 'utf-8').split('\n');
    }
    FileLineReader.prototype.next = function () {
        return new Message(this.lines.shift());
    };
    FileLineReader.prototype.hasNext = function () {
        return this.lines.length > 0;
    };
    return FileLineReader;
}());
var SlowFileLineReader = /** @class */ (function (_super) {
    __extends(SlowFileLineReader, _super);
    function SlowFileLineReader(fileName) {
        var _this = _super.call(this, fileName) || this;
        _this.fileName = fileName;
        return _this;
    }
    SlowFileLineReader.prototype.delay = function (millis) {
        var date = new Date();
        var curDate = null;
        do {
            curDate = new Date();
        } while (curDate.getTime() - date.getTime() < millis);
    };
    SlowFileLineReader.prototype.next = function () {
        this.delay(2000);
        return new Message(this.lines.shift());
    };
    return SlowFileLineReader;
}(FileLineReader));
var Join = /** @class */ (function () {
    function Join() {
        var fs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fs[_i] = arguments[_i];
        }
        this.currentFilter = 0;
        this.fs = fs;
    }
    Join.prototype.next = function () {
        var f = this.fs[this.currentFilter];
        this.currentFilter = (this.currentFilter + 1) % this.fs.length;
        if (f.hasNext())
            return f.next();
        else
            return this.next();
    };
    Join.prototype.hasNext = function () {
        return this.fs.filter(function (f) { return f.hasNext(); }).length > 0;
    };
    return Join;
}());
function iterate(f) {
    while (f.hasNext()) {
        f.next();
    }
}
var f1 = new SlowFileLineReader('./best15.txt');
var f2 = new FileLineReader('./best-mieic.txt');
console.log("HELLO RUNING THIS.");
var r1 = new Writer(new ToUpperCase(new Join(f1, f2)));
iterate(r1);
