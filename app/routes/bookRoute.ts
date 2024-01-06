import { Router, Request, Response } from "express";
import booksController from "../controllers/booksController";
import { validateBookData } from '../middlewares/validation';

const router = Router();

// Home Page
router.get("/",async (req:Request, res:Response)=>{
    try{
        res.render('home');
    }
    catch(err){
        res.render('error',{status: 404, err});
    }
});

// Get all books
router.get("/books",async (req:Request, res:Response)=>{
    try{
        let data = await booksController.getBooks();
        res.render('books', {"books": data});
    }
    catch(err){
        res.render('error',{status: 404, err});
    }
});

// Add Books
router.post('/books', validateBookData, async (req:Request, res:Response) =>{
    console.log("add books function here");
    try {
        const bookName   = req.body.name;
        const bookAuthor = req.body.author;
        const bookIsbn   = req.body.Isbn;
        
        let books = await booksController.addBook(bookName, bookAuthor, bookIsbn);
        
        res.render('books',{"books": books})
    }
    catch (err) {
        res.render('error',{status:500, err: (err as Error).message});
    }
    
})

// serch start with
router.get('/search/:name', async(req:Request, res:Response)=>{
    try {
        let books = [];
        const startwith = req.params.name;

        if (!startwith) {
            const errorMessage = `Please Enter the first word of the book's name to search`;
            res.render('error',{status:400, err: errorMessage});
        }

        books = await booksController.searchStartWith(startwith as string);
        res.render('serchBooks', { books });

    } catch (error) {
        res.render('error',{status:400, err: error});
    }
});


// Page Not fount
router.use((req:Request, res:Response) => {
    let err:Error = new Error('Page not fount !');;
    res.render('error',{status:404,err});
});

export default router;