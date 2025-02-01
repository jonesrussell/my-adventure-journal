import { IAdventurePlain } from '@/models/Adventure';
import slugify from 'slugify';

export const assembleSlug = (data: IAdventurePlain): string => {
  // Example assembly logic: "_id-name-location"
  return slugify(`${data._id}-${data.name}-${data.location}`);
};

export const disassembleSlug = (slug: string): { _id: string; name: string; location: string } | null => {
  const parts = slug.split('-');

  // Check if the slug has at least three parts
  if (parts.length < 3) return null;

  // Assuming the first part is the _id, and the rest are concatenated as name and location
  const [_id, ...restParts] = parts;
  let name = '';
  let location = '';

  // Concatenate the remaining parts as name and location
  restParts.forEach(part => {
    if (name === '') {
      name = part;
    } else {
      location += '-' + part;
    }
  });

  // Return the disassembled slug parts
  return { _id, name, location };
};
