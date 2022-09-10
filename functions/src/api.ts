import express from "express";
import { config } from "./apiConfig";

export function getApiApp(firestore: FirebaseFirestore.Firestore) {
  const apiApp = express();
  const collection = firestore.collection('root_collection/fluffy/posts');

  apiApp.use((req, res, next) => {
    if (req.headers['authorization'] === `Bearer ${config.apiKey}`) {
      return next();
    }
    return res.status(401).send();
  });

  apiApp.get('/', async (req, res) => {
    const posts = await collection.get();
    const mappedPosts = posts.docs
      .map(post => post.data())
      .map(post => ({
        id: post.id,
        title: post.title,
    }));
    res.send({
      message: 'hello',
      documents: mappedPosts,
    });
  });

  apiApp.get('/:id', async (req, res) => {
    const post = await collection.doc(req.params.id).get();
    res.send(post.data());
  });

  return apiApp;
}
