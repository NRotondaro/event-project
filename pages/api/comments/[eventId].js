import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    'mongodb+srv://noskin:noskin34@noskin.2tzwqbk.mongodb.net/events '
  );

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    // add server-side validation
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();

    const result = await db.collection('comments').insertOne(newComment);

    console.log(result);

    res.status(201).json({ message: 'Added comment.', comment: newComment });
  }

  if (req.method === 'GET') {
    const dummyList = [
      {
        id: 'c1',
        name: 'Nikson',
        text: 'A first comment!',
      },
      {
        id: 'c2',
        name: 'Gabriel',
        text: 'A second comment!',
      },
    ];

    res.status(200).json({ comments: dummyList });
  }

  client.close();
}

export default handler;
