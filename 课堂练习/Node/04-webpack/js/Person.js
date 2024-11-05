class Person {
    constructor(userName, gender) {
        this.userName = userName;
        this.gender = gender;
    }
    sayHi() {
        console.log(`大家好我是${this.userName}是${this.gender}`);

    }
}

export default Person;