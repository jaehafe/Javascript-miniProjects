// 생성자 함수
function User(name, age) {
  // this = {}

  this.name = name;
  this.age = age;

  // return this
}
new User();

// 생성자 함수: 싱품 객체 생성
function Item(title, name) {
  // this = {}
  this.title = title;
  this.name = name;
  this.showPrice = function () {
    console.log(`가격은 ${price}원 입니다.`);
  };
  // return this
}

const item1 = new Item('인형', 3000);
const item2 = new Item('가방', 4000);
const item3 = new Item('지갑', 9000);
console.log(item1, item2, item3);

item3.showPrice(); // 가격은 9000원 입니다.

// 1.
const User = function (name, age) {
  this.name = name;
  this.age = age;
  this.showName = function () {
    console.log(this.name);
  };
};

const mike = new User('Mike', 30);

// 2.
class User2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  showName() {
    console.log(this.name);
  }
}

const tom = new User2('Tom', 19);

mike.showName(); // 1.
tom.showName(); // 2.

//
// 생성자 함수
function Monster(name, hp, att, xp) {
  this.name = name;
  this.hp = hp;
  this.att = att;
  this.xp = xp;
}
const monster1 = new Monster('슬라임', 25, 10, 11);
const monster2 = new Monster('슬라임', 26, 10, 10);

// class 함수
class Monster {
  constructor(name, hp, att, xp) {
    this.name = name;
    this.hp = hp;
    this.att = att;
    this.xp = xp;
  }
  attack(monster) {
    monster.hp -= this.att;
    this.hp -= monster.att;
  }
  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  }
}
const monster1 = new Monster('슬라임', 25, 10, 11);
const monster2 = new Monster('슬라임', 26, 10, 10);
const monster3 = new Monster('슬라임', 25, 11, 11);

// 오버라이딩
class Car {
  constructor(color) {
    // {} <- constructor는 임의 객체 생성
    this.color = color;
    this.wheels = 4;
  }
  drive() {
    console.log('drive..');
  }
  stop() {
    console.log('Stop!!');
  }
}

class Bmw extends Car {
  constructor(color) {
    super(color); // super로 부모 클래스의 constructor를 실행해야함
    this.navigation = 1;
  }
  park() {
    console.log('PARK');
  }
}

const z4 = new Bmw('blue');

//

// super
// 자식 클래스에서 새로운 데이터를 추가하기 위해 constructor 를 생성하고,  부모의 constructor  인자 모두를 super()에 넣어주어야 한다
class Person {
  constructor(name, first, second) {
    this.name = name;
    this.first = first;
    this.second = second;
  }
  sum() {
    return this.first + this.second;
  }
}

class PersonPlus extends Person {
  constructor(name, first, second, third) {
    super(name, first, second);
    this.third = third;
  }

  sum() {
    return super.sum() + this.third;
  }

  avg() {
    return (this.first + this.second + this.third) / 3;
  }
}

var lee = new PersonPlus('lee', 10, 20, 30);
console.log('lee.sum()', lee.sum());
console.log('lee.avg()', lee.avg());
