const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/doctorproche';

// Mock data configuration
const mockUsers = [
  // Admin user
  {
    email: 'admin@doctoproche.com',
    password: 'Admin123!',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    phoneNumber: faker.phone.number(),
  },
  // Two doctors
  {
    email: faker.internet.email(),
    password: 'Doctor123!',
    role: 'doctor',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
    specialization: 'Cardiologist',
    availableSlots: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
    ]
  },
  {
    email: faker.internet.email(),
    password: 'Doctor123!',
    role: 'doctor',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
    specialization: 'Pediatrician',
    availableSlots: [
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00' },
    ]
  },
  // Two patients
  {
    email: faker.internet.email(),
    password: 'Patient123!',
    role: 'patient',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
  },
  {
    email: faker.internet.email(),
    password: 'Patient123!',
    role: 'patient',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Insert mock users
    const users = await User.create(mockUsers);
    console.log('Created mock users:');
    users.forEach(user => {
      console.log(`- ${user.role}: ${user.email} (${user.firstName} ${user.lastName})`);
    });

    console.log('\nSeeding completed successfully!');
    console.log('\nYou can use these credentials to login:');
    console.log('Admin - email: admin@doctoproche.com, password: Admin123!');
    console.log('Doctors/Patients - check the emails above, passwords: Doctor123!/Patient123!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
  }
}

// Run the seed function
seedDatabase(); 