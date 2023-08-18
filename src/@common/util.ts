import { ObjectId } from 'mongodb';

export const generateObjectId = () => {
  return new ObjectId().toString();
};
