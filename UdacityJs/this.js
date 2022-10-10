const mockingbird = {
  title: 'To Kill a Mockingbird',
  describe: function () {
    console.log(`${this.title} is a classic novel`);
  },
};

console.log(mockingbird.describe());

const pride = {
  title: 'The women of Owu',
};

console.log('the one for call', mockingbird.describe.call(pride));
ne = mockingbird.describe.apply(pride);
console.log('the other for apply', ne);

console.log(
  '==================================================================='
);
const cat = {
  name: 'Bailing',
};
function sayHello(message) {
  console.log(`${message}, ${this.name}`);
}

console.log(sayHello.apply(cat, ['How are you doing?']));

console.log(
  '==================================================================='
);
function invokeTwice(cb) {
  cb();
  cb();
}

const dog = {
  age: 5,
  growOneYear: function () {
    this.age += 1;
  },
};

dog.growOneYear();
// (this works as expected)

dog.age;
// 6

invokeTwice(function () {
  dog.growOneYear();
}); // this is called annoymous closure
// undefined

console.log(dog.age);
// 6
const myGrow = dog.growOneYear.bind(dog); // use the dog as this when using it in this function and set it to myGrow
invokeTwice(myGrow);
console.log(dog.age);

// function Dog(age, weight, name) {
//   this.age = age;
//   this.weight = weight;
//   this.name = name;
//   this.bark = function () {
//     console.log(`${this.name} says woof!`);
//   };
// }

function Dog(age, weight, name) {
  this.age = age;
  this.weight = weight;
  this.name = name;
}

Dog.prototype.bark = function () {
  console.log(`${this.name} says woof!`);
};

const dog1 = new Dog(2, 60, 'Java');

const dog2 = new Dog(4, 55, 'Jodi');

dog1.bark();

dog2.bark();
