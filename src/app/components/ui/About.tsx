import { FC } from 'react';
import { JSX } from 'react';

const About: FC = (): JSX.Element => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">About Adventure Journal</h2>
      <p className="text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        convallis justo ut felis consequat, et tristique nisi sagittis.
      </p>
    </section>
  );
};

export default About;
