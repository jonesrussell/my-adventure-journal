// Connect to the admin database and create the admin user
db = db.getSiblingDB('admin');
db.createUser({
  user: 'myadmin',
  pwd: 'foobar123my',
  roles: [{ role: 'root', db: 'admin' }]
});

// Connect to the "myjournal" database and create a user for it
db = db.getSiblingDB('myjournal');
db.createUser({
  user: 'journaluser',
  pwd: 'securepassword123',
  roles: [{ role: 'dbOwner', db: 'myjournal' }]
});

db.createUser({
  user: 'myUserAdmin',
  pwd: 'abc123',
  roles: [
    { role: 'readWrite', db: 'myjournal' },
    { role: 'dbAdmin', db: 'myjournal' }
  ]
});

db.createCollection('adventures');
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

