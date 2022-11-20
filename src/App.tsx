import React from "react";
import "./App.css";

import slugify from "slugify";

import { Admin, Resource } from "react-admin";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
  RAFirebaseOptions,
} from "react-admin-firebase";
import { firebaseConfig } from "./firebaseConfig";
import { PostCreate, PostEdit, PostList, PostShow } from "./posts";
import { WebhookCreate, WebhookEdit, WebhookList, WebhookShow } from "./webhooks";


const options: RAFirebaseOptions = {
  logging: true,
  rootRef: "root_collection/fluffy",
  transformToDb(resourceName, documentData, documentId) {
    if (documentData.title) {
      documentData.slug = slugify(documentData.title, { lower: true });
    }
    if (typeof documentData.pictures === 'undefined') {
      documentData.pictures = [];
    }
    return documentData;
  },
};

const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authProvider = FirebaseAuthProvider(firebaseConfig, options);

function App() {
  return <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="posts" list={PostList} create={PostCreate} show={PostShow} edit={PostEdit} />
    <Resource name="webhooks" list={WebhookList} create={WebhookCreate} show={WebhookShow} edit={WebhookEdit} />
  </Admin>;
}

export default App;
