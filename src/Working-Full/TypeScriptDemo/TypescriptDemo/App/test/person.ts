interface IPerson{
    firstName: string;
    lastName: string;
    age: number;
}

class Person implements IPerson {
    // fields
    //firstName: string;
    //lastName: string;
    age = 0;

    // constructor
    constructor(public firstName: string, public lastName: string, age?: number) {
        //this.firstName = firstName;
        //this.lastName = lastName;
        this.age = age;

        this.getBirthYear = () => new Date().getFullYear() - this.age;
    }

    // property
    get fullName() {
        return this.firstName + " " + this.lastName;
    }

    // functions
    introduce() {
        console.log("Hello, my name is: " + this.fullName);
    }

    getBirthYear: () => number;
}

// inheritance
class Employee extends Person{
    title: string;

    constructor(firstName: string, lastName: string, age: number, title: string) {
        super(firstName, lastName, age);
        this.title = title;
    }

    introduce() {
        console.log("Hello, my name is: " + this.fullName + ". My title is: " + this.title);
    }
}


// functions
var getBirthYear: (person: IPerson) => number;
getBirthYear = person => new Date().getFullYear() - person.age;



var person = new Person("Steve", "Michelotti");
person.age = 30;
person.introduce();

//var birthYear = getBirthYear(person);
//var birthYear = person.getBirthYear();
var birthYear = getBirthYear({ firstName: "John", lastName: "Smith", age: 21 });

console.log("Birth year is: " + birthYear);

var emp = new Employee("Joe", "Blow", 50, "Developer");
emp.introduce();
