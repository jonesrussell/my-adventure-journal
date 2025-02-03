print("////////////////////");
print("========================================");
print("////////////////////");
print("////////////////////");
print("STARTING MONGO INIT SCRIPT");
print("////////////////////");
print("////////////////////");
print("========================================");

// Print all environment variables for debugging
print("Environment Variables:");
print("DB_ROOT_USER: " + process.env.DB_ROOT_USER);
print("DB_ROOT_PASSWORD: " + process.env.DB_ROOT_PASSWORD);
print("DB_NAME: " + process.env.DB_NAME);
print("DB_USER: " + process.env.DB_USER);
print("DB_PASSWORD: " + process.env.DB_PASSWORD);
print("////////////////////");

// Authenticate as the root user
db.getSiblingDB('admin').auth(
  process.env.DB_ROOT_USER,
  process.env.DB_ROOT_PASSWORD
);
print("////////////////////");

// Connect to the specified database
db.getSiblingDB(process.env.DB_NAME);
print("////////////////////");

// Create the user if it doesn't already exist
const userExists = db.getUsers().some(user => user.user === process.env.DB_USER);
if (!userExists) {
  db.createUser({
    user: process.env.DB_USER,
    pwd: process.env.DB_PASSWORD,
    roles: [{ role: 'dbOwner', db: process.env.DB_NAME }]
  });
  print("////////////////////");
  print("User created: " + process.env.DB_USER);
  print("////////////////////");
} else {
  print("////////////////////");
  print("User already exists: " + process.env.DB_USER);
  print("////////////////////");
}

// Create the adventures collection if it doesn't already exist
if (!db.getCollectionNames().includes('adventures')) {
  db.createCollection('adventures');
  print("////////////////////");
  print("Adventures collection created.");
  print("////////////////////");
}

// Insert initial adventure documents if the collection is empty
if (db.adventures.countDocuments() === 0) {
  db.adventures.insertMany([
    {
      name: 'Adventure 1',
      location: 'Location 1',
      description: 'Description for Adventure 1'
    },
    {
      name: 'Adventure 2',
      location: 'Location 2',
      description: 'Description for Adventure 2'
    }
  ]);
  print("////////////////////");
  print("Initial adventure documents inserted.");
  print("////////////////////");
}

print("////////////////////");
print("========================================");
print("////////////////////");
print("MONGO INIT SCRIPT COMPLETED");
print("////////////////////");
print("========================================");
print("////////////////////");
