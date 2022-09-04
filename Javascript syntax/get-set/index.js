// getter setter

const person = {
  firstName: 'Adam',
  lastName: 'Lee',
  get fullName() {
    return `${person.firstName} ${person.lastName}`;
  },
  set fullName(value) {
    const parts = value.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  },
};

// getter: 읽기 전용
console.log(person.fullName);

// setter: 새로운 value 할당 가능(mutate)
person.fullName = 'John Smith';

console.log(person);
