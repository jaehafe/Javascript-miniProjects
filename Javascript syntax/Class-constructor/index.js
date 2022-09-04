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
