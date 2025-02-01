
import Link from 'next/link';
import { IAdventurePlain } from '@/models/Adventure';
import { assembleSlug } from '@/utils/slug';

interface AdventuresListProps {
  adventures: IAdventurePlain[];
}

const AdventuresList = ({ adventures }: AdventuresListProps) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {adventures?.map((adventure) => (
        <li
          key={adventure._id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <Link href={`/adventures/${assembleSlug(adventure)}`}>
            <h2 className="text-lg font-semibold mb-2">{adventure.name}</h2>
            <p className="text-gray-600">{adventure.location}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AdventuresList;
