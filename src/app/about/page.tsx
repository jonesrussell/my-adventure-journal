import { FC } from 'react';
import type { Metadata } from 'next';

// Page-specific metadata
export const metadata: Metadata = {
  title: 'About Us - Adventure Journal',
  description: 'Learn more about our adventure journal and our mission.',
};

const AboutPage: FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        Welcome to our adventure journal! We are passionate about exploring the great outdoors and sharing our experiences with others. Our mission is to inspire people to embark on their own adventures and create lasting memories.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
      <p className="mb-4">
        Our journey began when a group of friends decided to document their hiking trips. What started as a simple blog quickly grew into a community of adventure enthusiasts. We believe that every adventure, big or small, deserves to be celebrated.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Join Us</h2>
      <p>
        Whether you&apos;re an experienced explorer or just starting out, we invite you to join our community. Share your stories, tips, and photos with us, and let&apos;s inspire each other to explore the world around us!
      </p>
    </div>
  );
};

export default AboutPage; 