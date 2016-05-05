export function getUser(first, last, age = -1) {
  const fullName = `${first} ${last}`;
  return { first, last, fullName, age};
}

export function powers(nums) {
  return nums.map(v => v * v);
}
