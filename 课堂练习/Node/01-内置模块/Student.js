const Person = require('./Person.js');

class Student extends Person {
    constructor(username, age, sex) {
        super(username, age);
        this.sex = sex;
    }
}


let s1 = new Student('张三', 20, '男');
s1.sayHello();