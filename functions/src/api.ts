import express from "express";
import { config } from "./apiConfig";

export function getApiApp(firestore: FirebaseFirestore.Firestore): ReturnType<typeof express> {
  const apiApp = express();
  const collection = firestore.collection('root_collection/fluffy/posts');

  apiApp.use((req, res, next) => {
    if (req.headers['authorization'] === `Bearer ${config.apiKey}`) {
      return next();
    }
    return res.status(401).send();
  });

  function mapPost(dbPost: FirebaseFirestore.DocumentData) {
    return {
      id: dbPost.id,
      slug: dbPost.slug,
      title: dbPost.title,
      teaser: dbPost.teaser || '',
      date: (dbPost.lastupdate?.['_seconds'] || 0) * 1000,
      image: (dbPost.pictures?.length || 0) > 0 ? dbPost.pictures[0].src : '',
    };
  }

  apiApp.get('/', async (req, res) => {
    if (typeof req.query['slug'] === 'string') {
      const post = await getBySlug(req.query['slug']);
      if (post === null) {
        return res.sendStatus(404);
      }
      return res.send(post);
    }
    const posts = await collection.get();
    const mappedPosts = posts.docs
      .map(post => post.data())
      .map(mapPost);
    return res.send({
      documents: mappedPosts,
    });
  });

  async function getBySlug(slug: string) {
    const foundPosts = (await collection.where('slug', '==', slug).get()).docs;
    if (foundPosts.length === 0) {
      return null;
    }
    return foundPosts[0].data();
  }

  apiApp.get('/:id', async (req, res) => {
    const post = await collection.doc(req.params.id).get();
    res.send(post.data());
  });

  return apiApp;
}
