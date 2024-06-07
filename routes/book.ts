import express, { Response, Request } from 'express';
import {Book} from "../model";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const {
        current = 1,
        pageSize = 10,
        name,
        author,
        category
    } = req.query;
    const data = await Book.find({
        ...(name && { name }),
        ...(author && { author }),
        ...(category && { category })
    })
        .skip((Number(current) - 1) * Number(pageSize))
        .limit(pageSize);
    const total = await Book.countDocuments();
    return res.status(200).json({ data, total });
});

router.post('/', (req: Request, res: Response) => {
    const body = req.body;
    const bookModel = new Book({...body});
    bookModel.save();
    return res.json({ success: true })
});

export default router
