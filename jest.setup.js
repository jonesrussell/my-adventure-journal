   // jest.config.js
   import nextJest from 'next/jest';

   const createJestConfig = nextJest({
     dir: './', // Provide the path to your Next.js app
   });

   const config = {
     collectCoverage: true,
     coverageProvider: 'v8',
     testEnvironment: 'jsdom',
     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
     moduleNameMapper: {
       '^@/(.*)$': '<rootDir>/src/$1',
       '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
       '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
       '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': '<rootDir>/__mocks__/fileMock.js',
     },
     transform: {
       '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
       '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest for JS/JSX files
     },
   };

   export default createJestConfig(config);