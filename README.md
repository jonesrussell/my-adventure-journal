# Adventure Journal

Adventure Journal is a web application designed for recording and sharing travel adventures. Users can create, view, update, and delete their adventures, making it easy to document and share their experiences.

## Features
- **User Authentication:** Sign up and log in to manage your adventures securely.
- **Adventure Management:** Create, edit, and delete adventures with ease.
- **Responsive Design:** Access your adventures on any device.

## Getting Started

To get started with the Adventure Journal application, follow these steps:

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/adventure-journal.git
   cd adventure-journal
   ```

2. **Install Dependencies**
   Use npm, yarn, or your preferred package manager to install the dependencies.
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add your environment variables. Example:
   ```
   MONGODB_URI=mongodb://localhost:27017/adventure-journal
   ```

### Running the Development Server
To run the development server, execute the following command:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

## Documentation

For detailed documentation, please refer to the `/docs/` folder, which includes:
- API documentation
- Installation instructions
- Usage guidelines

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Note
- The project may use [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) for font optimization, but please verify its current implementation.
