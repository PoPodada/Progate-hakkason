import { FirestoreDataConverter, WithFieldValue } from "firebase/firestore";

// Schema

// Converter
const converter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>): WithFieldValue<T> => {
    return data;
  },
});
