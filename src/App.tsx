import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Admin, Resource } from "react-admin";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
  RAFirebaseOptions,
} from "react-admin-firebase";
import { firebaseConfig } from "./firebaseConfig";
import { PostCreate, PostEdit, PostList, PostShow } from "./posts";


const options: RAFirebaseOptions = {
  logging: true,
  rootRef: "root_collection/posts",
};

const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authProvider = FirebaseAuthProvider(firebaseConfig, options);

function App() {
  return <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="posts" list={PostList} create={PostCreate} show={PostShow} edit={PostEdit} />
  </Admin>;
}

export default App;
