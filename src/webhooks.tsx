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
  ListProps,
  ShowProps,
  CreateProps,
  EditProps,
} from "react-admin";

const WebhookFilter = (props: any) => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="title" alwaysOn />
    </Filter>
  );
};

export const WebhookList = (props: ListProps) => (
  <List {...props} filters={<WebhookFilter />}>
    <Datagrid>
      <TextField source="title" />
      <TextField source="url" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

export const WebhookShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="url" />
    </SimpleShowLayout>
  </Show>
);

export const WebhookCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="url" />
    </SimpleForm>
  </Create>
);

export const WebhookEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="url" />
    </SimpleForm>
  </Edit>
);
