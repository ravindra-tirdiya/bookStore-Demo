import fs from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

const booksPath = path.resolve('data/books.json');

export async function getBooks() {
  const raw = await fs.readFile(booksPath, 'utf-8');
  return JSON.parse(raw);
}

export async function saveBooks(books) {
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
}

export async function createBook(data, userId) {
  const books = await getBooks();
  const newBook = { id: uuid(), ...data, userId };
  books.push(newBook);
  await saveBooks(books);
  return newBook;
}

export async function findBook(id) {
  const books = await getBooks();
  return books.find(b => b.id === id);
}

export async function updateBook(id, data, userId) {
  const books = await getBooks();
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return null;
  if (books[idx].userId !== userId) return 'forbidden';
  books[idx] = { ...books[idx], ...data };
  await saveBooks(books);
  return books[idx];
}

export async function deleteBook(id, userId) {
  const books = await getBooks();
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return null;
  if (books[idx].userId !== userId) return 'forbidden';
  const [removed] = books.splice(idx, 1);
  await saveBooks(books);
  return removed;
}
