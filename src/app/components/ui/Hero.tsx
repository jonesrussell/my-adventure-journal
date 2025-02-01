import { JSX } from 'react';

const Hero = (): JSX.Element => {
  return (
    <section
      className="relative"
      style={{
        backgroundImage: 'url("/home_splash.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
      }}
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <h1 className="text-5xl font-bold text-white text-shadow-lg">
          Adventure Journal
        </h1>
      </div>
    </section>
  );
};

export default Hero;
