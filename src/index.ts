import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

dotenv.config();

const PORT = Number(process.env.PORT ?? 3080);
const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
const genId = () => nanoid(16);

const seedDatabase = async () => {
  if ((await db.post.count()) === 0) {
    await db.post.createMany({
      data: [
        {
          id: genId(),
          slug: 'node-stack',
          title: 'Ultimate Node Stack 2022',
          publishedAt: new Date(),
        },
        {
          id: genId(),
          slug: 'draft',
          title: 'Draft post',
        },
      ],
    });
  }
};
seedDatabase();

const app = express();
app.use(morgan('dev'));

app.get('/', async (req, res) => {
  const posts = await db.post.findMany();

  res.json(posts);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server running at http://localhost:${PORT}`);
});
