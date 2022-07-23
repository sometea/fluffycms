import express from "express";

export function getApiApp(firestore: FirebaseFirestore.Firestore) {
  const apiApp = express();

  apiApp.get('/', async (req, res) => {
    const collection = firestore.collection('root_collection/fluffy/posts');
    const posts = await collection.listDocuments();
    const resolvedPosts = await Promise.all(posts.map(async post => (await post.get()).data()));
    res.send({
      message: 'hello',
      documents: resolvedPosts,
    });
  });

  apiApp.get('/:id', (req, res) => {
    res.send({
      message: `id requested: ${req.params.id}`,
    });
  });

  return apiApp;
}
