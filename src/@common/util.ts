import { ObjectId } from 'mongodb';

export const generateObjectId = (id?: string | ObjectId) => {
  return new ObjectId(id).toString();
};

export const equalObjectId = (
  first: string | ObjectId,
  second: string | ObjectId,
) => {
  if (!first || !second) {
    return false;
  }
  return new ObjectId(first).equals(new ObjectId(second));
};
