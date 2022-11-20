import React from "react";
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField,
  ListProps,
  ShowProps,
  CreateProps,
  EditProps,
  ImageInput,
  ImageField,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

const PostFilter = (props: any) => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="title" alwaysOn />
    </Filter>
  );
};

export const PostList = (props: ListProps) => (
  <List {...props} filters={<PostFilter />}>
    <Datagrid>
      <TextField source="title" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

export const PostShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="title" />
      <TextField source="teaser" />
      <RichTextField source="body" />
      <ImageField source="pictures" src="src" title="title" />
    </SimpleShowLayout>
  </Show>
);

export const PostCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="teaser" />
      <RichTextInput source="body" />
      <ImageInput source="pictures" label="Images" multiple={true}>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const PostEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="teaser" />
      <RichTextInput source="body" />
      <ImageInput source="pictures" label="Images" multiple={true}>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
