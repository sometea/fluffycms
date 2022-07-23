import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { webhook } from "./webhook";
import { getApiApp } from "./api";

admin.initializeApp();

export const webHook = functions
  .region("europe-west3")
  .firestore.document("root_collection/fluffy/{resource}/{resourceId}")
  .onWrite(() => webhook(admin.firestore()));

export const api = functions
  .region("europe-west3")
  .https
  .onRequest(getApiApp(admin.firestore()));
