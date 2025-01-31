// Connect to the admin database and create the admin user
db = db.getSiblingDB('admin');
db.createUser({
   user: "myadmin",
   pwd: "foobar123my",
   roles: [{ role: "root", db: "admin" }]
});

// Connect to the "myjournal" database and create a user for it
db = db.getSiblingDB('myjournal');
db.createUser({
   user: "journaluser",
   pwd: "securepassword123",
   roles: [{ role: "dbOwner", db: "myjournal" }]
});

