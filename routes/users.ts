import express, { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import {User} from "../model";
import {SECRET_KEY} from "../constant";

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ data: user, token: token, success: true });
  } else {
    res.status(500).json({ message: '用户名或密码错误' });
  }
})

router.get('/logout', async (req: Request, res: Response) => {
  res.status(200).json({ success: true });
})

router.get('/', async (req: Request, res: Response) => {
  const {
    current = 1,
    pageSize = 10,
    name,
    status
  } = req.query;
  const data = await User.find({
    ...(name && { name }),
    ...(status && { status })
  })
      .skip((Number(current) - 1) * Number(pageSize))
      .limit(Number(pageSize));
  const total = await User.countDocuments({
    ...(name && { name }),
    ...(status && { status })
  });
  return res.status(200).json({ data, total });
});

router.post('/', async (req: Request, res: Response) => {
  const body = req.body;
  const oldUser = await User.findOne({ name: body.name });
  if (oldUser) {
    return res.status(500).json({ message: '该用户已存在' });
  } else {
    const userModel = new User({ ...req.body });
    await userModel.save();
    return res.json({ success: true, code: 200 })
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id} = req.params;
  await User.findByIdAndDelete(id);
  return res.status(200).json({ success: true })
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    res.status(200).json({ data: user, success: true });
  } else {
    res.status(500).json({ message: '该用户不存在' });
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  const body = req.body
  const { id } = req.params;
  await User.findOneAndUpdate({ _id: id }, body);
  return res.status(200).json({ success: true });
})

export default router
