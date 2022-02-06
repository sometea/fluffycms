import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { webhook } from "./webhook";

admin.initializeApp();

export const webHook = functions
  .region("europe-west3")
  .firestore.document("root_collection/fluffy/{resource}/{resourceId}")
  .onWrite(() => webhook(admin.firestore()));
