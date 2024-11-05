import Person from "./Person.js";

class Student extends Person {
    constructor(userName, gender, age) {
        super(userName, gender);
        this.age = age;
    }
}

export default Student;

