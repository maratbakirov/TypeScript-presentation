var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Person = (function () {
    function Person(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        var _this = this;
        this.age = 0;
        this.age = age;
        this.getBirthYear = function () {
            return new Date().getFullYear() - _this.age;
        };
    }
    Object.defineProperty(Person.prototype, "fullName", {
        get: function () {
            return this.firstName + " " + this.lastName;
        },
        enumerable: true,
        configurable: true
    });
    Person.prototype.introduce = function () {
        console.log("Hello, my name is: " + this.fullName);
    };
    return Person;
})();
var Employee = (function (_super) {
    __extends(Employee, _super);
    function Employee(firstName, lastName, age, title) {
        _super.call(this, firstName, lastName, age);
        this.title = title;
    }
    Employee.prototype.introduce = function () {
        console.log("Hello, my name is: " + this.fullName + ". My title is: " + this.title);
    };
    return Employee;
})(Person);
var getBirthYear;
getBirthYear = function (person) {
    return new Date().getFullYear() - person.age;
};
var person = new Person("Steve", "Michelotti");
person.age = 30;
person.introduce();
var birthYear = getBirthYear({
    firstName: "John",
    lastName: "Smith",
    age: 21
});
console.log("Birth year is: " + birthYear);
var emp = new Employee("Joe", "Blow", 50, "Developer");
emp.introduce();
