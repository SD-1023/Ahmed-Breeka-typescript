// import fs from 'fs/promises';
const fs = require('fs').promises;

interface Ibook {
    name: string,
    author: string,
    Isbn: string
}

// Get All Books from library (books.json)
async function getBooks(filePath?:string): Promise<Ibook[]>{

    try {
        const booksPath = './books.json';
        const fileData = await fs.readFile(booksPath, 'utf8');
        return JSON.parse(fileData)['books'];
    }
    catch(err) {
        throw err
    }
}

// Add New Book
async function addBook(name:string, author:string, Isbn: string): Promise<Ibook[]> {
    try {
        const newBook: Ibook={
            name,
            author,
            Isbn
        }
        
        let booksArray = await getBooks();
        booksArray.push(newBook);
        
        const booksPath = './books.json';
        await fs.writeFile(booksPath, JSON.stringify({ books: booksArray }), 'utf8');
        
        console.log(`Books array after adding: ${booksArray}`);
        return booksArray;
        
    } catch (err) {
        throw err;
    }
}

// search function Name start with startWord
async function searchStartWith(name:string): Promise<Ibook[]> {
    try {
        let books:Ibook[] = await getBooks();
        let data = books.filter(book => book.name?.toLowerCase().startsWith(name.toLowerCase()));
        return data;
    }
    catch(err) {
        throw err;
    }
}

export default {getBooks, addBook, searchStartWith};