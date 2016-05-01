const evens = [0, 2, 4, 6, 8, 10];
const odds = evens.map(v => v + 1);
const powers= evens.map(v => v * v);

console.log(`evens  :${evens}`);
console.log(`odds   :${odds}`);
console.log(`powers :${powers}`);

function getUsers(first, last, age = -1) {
  const fullName = `${first} ${last}`;
  return { first, last, fullName, age};
}

const user1= getUsers('gokuu', 'son');
console.log(user1);

const user2= getUsers('yu-suke', 'urameshi', 14);
console.log(user2);

