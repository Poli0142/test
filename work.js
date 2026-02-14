function getActiveUsers(users) {
  return users.filter(user => user.isActive); 
}

const getUserNames = (users) => {
  return users.map(user => user.name);
}

function findUserById(users, id) {
  const foundUser = users.find(user => user.id === id);
  return foundUser || null;
}

function getUsersStatistics(users) {
  const total = users.length;
  const active = users.filter(user => user.isActive).length;
  const inactive = total - active;
  return {
    total: total,
    active: active,
    inactive: inactive
  };
}

function getAverageAge(users) {
  if (users.length === 0) {
    return 0;
  }
  const totalAge = users.reduce((sum, user) => sum + user.age, 0);
  const averageAge = totalAge / users.length;
  return averageAge;
}

function groupUsersByCity(users) {
  const grouped = {};
  users.forEach(user => {
    const city = user.city;
    if (!grouped[city]) {
      grouped[city] = [];
    }
    grouped[city].push({...user});
  });
  
  return grouped;
}


const users = [
  { id: 1, name: "Anna", age: 22, city: "Moscow", isActive: true },
  { id: 2, name: "Oleg", age: 17, city: "Kazan", isActive: false },
  { id: 3, name: "Ivan", age: 30, city: "Moscow", isActive: true },
  { id: 4, name: "Maria", age: 25, city: "Sochi", isActive: false }
];

console.log(getActiveUsers(users));
console.log(getUserNames(users));
console.log(findUserById(users, 2));
console.log(findUserById(users, 99));
console.log(getUsersStatistics(users));
console.log(getAverageAge(users));
console.log(groupUsersByCity(users));