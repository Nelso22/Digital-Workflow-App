import { Client, Account, Databases } from "appwrite";

export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;
export const VITE_SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
export const VITE_TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
export const VITE_PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export default client;
