import * as functions from "firebase-functions";

export async function webhook(firestore: FirebaseFirestore.Firestore): Promise<void> {
  functions.logger.info("Web hook called!");
  const collections = firestore.collection('root_collection/fluffy/webhooks');
  const webhooks = await collections.listDocuments();
  webhooks.forEach(async hook => functions.logger.info((await hook.get()).data()));
}
