import {
  getBooks,
  createBook,
  findBook,
  updateBook,
  deleteBook
} from '../models/bookModel.js';

export async function list(req, res, next) {
  try {
    let books = await getBooks();

    // /books?genre=Fantasy&page=1&limit=10
    const { genre, page = 1, limit = 10 } = req.query;

    if (genre) books = books.filter(b => b.genre.toLowerCase() === genre.toLowerCase());

    // Pagination
    const start = (page - 1) * limit;
    const paginated = books.slice(start, start + +limit);

    res.json({ count: books.length, results: paginated });
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const book = await findBook(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const newBook = await createBook(req.body, req.user.id);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const result = await updateBook(req.params.id, req.body, req.user.id);
    if (result === 'forbidden') return res.status(403).json({ message: 'Not your book' });
    if (!result) return res.status(404).json({ message: 'Book not found' });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const result = await deleteBook(req.params.id, req.user.id);
    if (result === 'forbidden') return res.status(403).json({ message: 'Not your book' });
    if (!result) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
}
