import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';

const usersPath = path.resolve('data/users.json');

export async function getUsers() {
  const raw = await fs.readFile(usersPath, 'utf-8');
  return JSON.parse(raw);
}

export async function saveUsers(users) {
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
}

export async function createUser({ email, password }) {
  const users = await getUsers();
  if (users.find(u => u.email === email)) {
    throw new Error('User already exists');
  }
  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: crypto.randomUUID(), email, password: hashed };
  users.push(newUser);
  await saveUsers(users);
  return newUser;
}

export async function findUserByEmail(email) {
  const users = await getUsers();
  return users.find(u => u.email === email);
}

export async function findUserById(id) {
  const users = await getUsers();
  return users.find(u => u.id === id);
}
