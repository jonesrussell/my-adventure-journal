# Installation Guide for Adventure Journal

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Node.js** (version 14 or higher)
- **MongoDB** (local or cloud instance)
- **Git** (optional, for cloning the repository)

## Steps to Install

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

4. **Run the Development Server**
   Start the development server using:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the Application**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.
