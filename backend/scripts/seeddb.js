// Import necessary modules
require('dotenv').config();
const bcrypt = require('bcryptjs');
const Project = require('../models/Project'); // Assuming you have a Project model defined
const User = require('../models/User'); // Assuming you have a User model defined
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MongoDB_connection_string = process.env.MONGO_URI;

const newUsers = [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phoneNumber: '1234567890', password: 'Password@1' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phoneNumber: '1234567891', password: 'Password@2' },
    { firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', phoneNumber: '1234567892', password: 'Password@3' },
    { firstName: 'Bob', lastName: 'Brown', email: 'bob.brown@example.com', phoneNumber: '1234567893', password: 'Password@4' },
    { firstName: 'Charlie', lastName: 'Davis', email: 'charlie.davis@example.com', phoneNumber: '1234567894', password: 'Password@5' }
  ];

  async function resetUsers() {
    try {
      await mongoose.connect(MongoDB_connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('MongoDB connected');
  
      // Delete all users
      await User.deleteMany({});
      console.log('All users deleted.');
  
      // Hash passwords for new users
      const hashedUsers = await Promise.all(newUsers.map(async (userData) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        return { ...userData, password: hashedPassword };
      }));
  
      // Insert new users
      const users = await User.insertMany(hashedUsers);
      console.log('New users created.');
      
      // Display all users in the platform
      const allUsers = await User.find({});
      // console.log('All users:', allUsers);
  
      mongoose.connection.close();
    } catch (err) {
      console.error(err);
    }
  }


// Define project data
const projectsData = [
    {
        poster: 'uploads/ben.jpeg',
        name: 'Project Alpha',
        description: 'Project Alpha is an innovative film exploring the possibilities of future technology and its impact on humanity. It features groundbreaking visual effects and a narrative that pushes the boundaries of storytelling.',
        targetAmount: 100000,
        smallestTokenAmount: 100,
        projectStartDate: new Date('2024-01-01'),
        projectEndDate: new Date('2024-12-31'),
        country: 'Nigeria',
        tags: ['action', 'sci-fi'],
        // filmmaker: 'John Doe',
        status: 'public',
        risk: 'low',
        contributionDetails: {
          type: 'bank',
          accountName: 'John Doe',
          accountNumber: '123456789',
          swiftCode: 'ABC123',
        },
        smartContractDetails: {
          payoutDate: new Date('2024-06-30'),
          percentagePaidOut: 50,
          flopPlan: 'Plan B if project fails',
        },
      },
      {
        poster: 'uploads/Butcher.jpeg',
        name: 'Project Beta',
        description: 'Project Beta is a thrilling documentary that delves into environmental issues and conservation efforts. It showcases various aspects of nature conservation and aims to raise awareness through powerful storytelling and imagery.',
        targetAmount: 50000,
        smallestTokenAmount: 50,
        projectStartDate: new Date('2024-03-01'),
        projectEndDate: new Date('2024-09-01'),
        country: 'Kenya',
        tags: ['documentary', 'environment'],
        // filmmaker: 'Jane Smith',
        status: 'public',
        risk: 'medium',
        contributionDetails: {
          type: 'mpesa',
          phoneNumber: '0723456789',
        },
        smartContractDetails: {
          payoutDate: new Date('2024-06-01'),
          percentagePaidOut: 30,
          flopPlan: 'Refund to contributors if project fails',
        },
      },
      {
        poster: 'uploads/film_holds_key.jpg',
        name: 'Project Gamma',
        description: 'Project Gamma is a gripping drama about personal growth and redemption. The film explores complex human emotions and relationships through a series of dramatic events and character interactions.',
        targetAmount: 75000,
        smallestTokenAmount: 75,
        projectStartDate: new Date('2024-02-15'),
        projectEndDate: new Date('2024-11-15'),
        country: 'South Africa',
        tags: ['drama', 'romance'],
        // filmmaker: 'Samuel Lee',
        status: 'private',
        risk: 'high',
        contributionDetails: {
          type: 'juice',
          phoneNumber: '0712345678',
        },
        smartContractDetails: {
          payoutDate: new Date('2024-08-15'),
          percentagePaidOut: 70,
          flopPlan: 'Partial compensation for contributors',
        },
      },
      {
        poster: 'uploads/filmmaker.jpg',
        name: 'Project Delta',
        description: 'Project Delta is an action-packed adventure set in a futuristic world. The film combines high-octane action sequences with a captivating storyline that keeps the audience on the edge of their seats.',
        targetAmount: 120000,
        smallestTokenAmount: 120,
        projectStartDate: new Date('2024-04-01'),
        projectEndDate: new Date('2024-12-01'),
        country: 'Ghana',
        tags: ['action', 'sci-fi'],
        // filmmaker: 'Alex Johnson',
        status: 'public',
        risk: 'low',
        contributionDetails: {
          type: 'bank',
          accountName: 'Alex Johnson',
          accountNumber: '987654321',
          swiftCode: 'XYZ456',
        },
        smartContractDetails: {
          payoutDate: new Date('2024-09-01'),
          percentagePaidOut: 40,
          flopPlan: 'Extra incentives for early contributors',
        },
      },
      {
        poster: 'uploads/images.jpeg',
        name: 'Project Epsilon',
        description: 'Project Epsilon is a romantic comedy that explores the ups and downs of modern relationships. The film combines humor with heartfelt moments to create a compelling and entertaining story.',
        targetAmount: 60000,
        smallestTokenAmount: 60,
        projectStartDate: new Date('2024-05-01'),
        projectEndDate: new Date('2024-10-01'),
        country: 'Egypt',
        tags: ['rom-com', 'romance'],
        // filmmaker: 'Emily Davis',
        status: 'public',
        risk: 'medium',
        contributionDetails: {
          type: 'mpesa',
          phoneNumber: '0789456123',
        },
        smartContractDetails: {
          payoutDate: new Date('2024-07-01'),
          percentagePaidOut: 60,
          flopPlan: 'Refunds and incentives if needed',
        },
      },
      {
        poster: 'uploads/jobs.jpeg',
        name: 'Project Zeta',
        description: 'Project Zeta is a political thriller set in a fictional country facing a major crisis. The film delves into themes of power, corruption, and intrigue, offering a gripping narrative filled with twists and turns.',
        targetAmount: 90000,
        smallestTokenAmount: 90,
        projectStartDate: new Date('2024-06-01'),
        projectEndDate: new Date('2024-11-01'),
        country: 'Nigeria',
        tags: ['politics', 'thriller'],
        // filmmaker: 'Sophia Brown',
        status: 'private',
        risk: 'high',
        contributionDetails: {
          type: 'juice',
          phoneNumber: '0701234567',
        },
        smartContractDetails: {
          payoutDate: new Date('2024-08-01'),
          percentagePaidOut: 50,
          flopPlan: 'Detailed contingency plans for contributors',
        },
      },
      {
        poster: 'uploads/Leader.jpeg',
        name: 'Project Eta',
        description: 'Project Eta is a documentary about wildlife conservation efforts in Africa. The film highlights the challenges faced by conservationists and showcases the beauty of Africa’s wildlife through stunning visuals.',
        targetAmount: 45000,
        smallestTokenAmount: 45,
        projectStartDate: new Date('2024-07-01'),
        projectEndDate: new Date('2024-12-01'),
        country: 'Kenya',
        tags: ['documentary', 'nature'],
        // filmmaker: 'Michael Green',
        status: 'public',
        risk: 'low',
        contributionDetails: {
          type: 'bank',
          accountName: 'Michael Green',
          accountNumber: '234567890',
          swiftCode: 'DEF789',
        },
        smartContractDetails: {
          payoutDate: new Date('2024-10-01'),
          percentagePaidOut: 40,
          flopPlan: 'Special events to engage contributors',
        },
      },
      {
        poster: 'uploads/oppose.jpeg',
        name: 'Project Theta',
        description: 'Project Theta is an epic war film depicting historical events from a new perspective. The film combines powerful storytelling with epic battle scenes to provide a fresh take on historical conflicts.',
        targetAmount: 100000,
        smallestTokenAmount: 100,
        projectStartDate: new Date('2024-08-01'),
        projectEndDate: new Date('2024-12-01'),
        country: 'South Africa',
        tags: ['war', 'historical'],
        // filmmaker: 'Olivia Martin',
        status: 'private',
        risk: 'medium',
        contributionDetails: {
          type: 'mpesa',
          phoneNumber: '0709876543',
        },
        smartContractDetails: {
          payoutDate: new Date('2024-11-01'),
          percentagePaidOut: 55,
          flopPlan: 'Enhanced rewards for contributors',
        },
      },
      {
        poster: 'uploads/patron.jpeg',
        name: 'Project Iota',
        description: 'Project Iota is a romantic drama exploring the complexities of relationships in modern times. The film delves into themes of love, loss, and personal growth through a deeply emotional narrative.',
        targetAmount: 70000,
        smallestTokenAmount: 70,
        projectStartDate: new Date('2024-09-01'),
        projectEndDate: new Date('2024-12-01'),
        country: 'Ghana',
        tags: ['drama', 'romance'],
        // filmmaker: 'Emily Carter',
        status: 'public',
        risk: 'low',
        contributionDetails: {
          type: 'juice',
          phoneNumber: '0798765432',
        },
        smartContractDetails: {
          payoutDate: new Date('2024-12-01'),
          percentagePaidOut: 50,
          flopPlan: 'Refunds and incentives if needed',
        },
      },
      {
        poster: 'uploads/Rally.jpeg',
        name: 'Project Kappa',
        description: 'Project Kappa is a science fiction film set in a dystopian future where society is divided into classes. The film explores themes of rebellion and social justice through a thrilling narrative.',
        targetAmount: 85000,
        smallestTokenAmount: 85,
        projectStartDate: new Date('2024-10-01'),
        projectEndDate: new Date('2024-12-01'),
        country: 'Nigeria',
        tags: ['sci-fi', 'action'],
        // filmmaker: 'James White',
        status: 'private',
        risk: 'high',
        contributionDetails: {
          type: 'bank',
          accountName: 'James White',
          accountNumber: '345678901',
          swiftCode: 'GHI012',
        },
        smartContractDetails: {
          payoutDate: new Date('2024-11-01'),
          percentagePaidOut: 65,
          flopPlan: 'Extra incentives for contributors',
        },
      },
      {
        poster: 'uploads/shooting.jpeg',
        name: 'Project Lambda',
        description: 'Project Lambda is a heartfelt drama about the journey of a young artist finding their place in the world. The film combines emotional depth with a narrative that resonates with audiences of all ages.',
        targetAmount: 55000,
        smallestTokenAmount: 55,
        projectStartDate: new Date('2024-11-01'),
        projectEndDate: new Date('2025-02-01'),
        country: 'South Africa',
        tags: ['drama', 'art'],
        // filmmaker: 'Sarah Lewis',
        status: 'public',
        risk: 'medium',
        contributionDetails: {
          type: 'mpesa',
          phoneNumber: '0798765432',
        },
        smartContractDetails: {
          payoutDate: new Date('2025-01-01'),
          percentagePaidOut: 40,
          flopPlan: 'Detailed compensation plan for contributors',
        },
      },
      {
        poster: 'uploads/Betrayal.jpeg',
        name: 'Project Mu',
        description: 'Project Mu is an intense thriller centered around a series of mysterious disappearances. The film offers a suspenseful narrative filled with unexpected twists and psychological drama.',
        targetAmount: 95000,
        smallestTokenAmount: 95,
        projectStartDate: new Date('2024-12-01'),
        projectEndDate: new Date('2025-03-01'),
        country: 'Kenya',
        tags: ['thriller', 'mystery'],
        // filmmaker: 'Daniel Roberts',
        status: 'private',
        risk: 'high',
        contributionDetails: {
          type: 'juice',
          phoneNumber: '0703456789',
        },
        smartContractDetails: {
          payoutDate: new Date('2025-02-01'),
          percentagePaidOut: 60,
          flopPlan: 'Compensation and rewards for contributors',
        },
      },
      {
        poster: 'uploads/Dreamer.jpeg',
        name: 'Project Nu',
        description: 'Project Nu is a coming-of-age film that explores the dreams and aspirations of a young protagonist navigating life’s challenges. The film blends humor with heartfelt moments for a compelling story.',
        targetAmount: 65000,
        smallestTokenAmount: 65,
        projectStartDate: new Date('2025-01-01'),
        projectEndDate: new Date('2025-05-01'),
        country: 'Nigeria',
        tags: ['drama', 'coming-of-age'],
        // filmmaker: 'Laura King',
        status: 'public',
        risk: 'low',
        contributionDetails: {
          type: 'bank',
          accountName: 'Laura King',
          accountNumber: '456789012',
          swiftCode: 'JKL345',
        },
        smartContractDetails: {
          payoutDate: new Date('2025-04-01'),
          percentagePaidOut: 45,
          flopPlan: 'Incentives for contributors if needed',
        },
      },
      {
        poster: 'uploads/film.jpg',
        name: 'Project Xi',
        description: 'Project Xi is a psychological drama that delves into the complexities of the human mind and emotional turmoil. The film features a gripping narrative and strong performances that drive home its themes.',
        targetAmount: 70000,
        smallestTokenAmount: 70,
        projectStartDate: new Date('2025-02-01'),
        projectEndDate: new Date('2025-06-01'),
        country: 'South Africa',
        tags: ['drama', 'psychological'],
        // filmmaker: 'Alice Adams',
        status: 'private',
        risk: 'medium',
        contributionDetails: {
          type: 'mpesa',
          phoneNumber: '0789654321',
        },
        smartContractDetails: {
          payoutDate: new Date('2025-05-01'),
          percentagePaidOut: 50,
          flopPlan: 'Detailed plan for contributor compensation',
        },
      },
      {
        poster: 'uploads/images (1).jpeg',
        name: 'Project Omicron',
        description: 'Project Omicron is an action-adventure film set in a fantastical world filled with mythical creatures and epic battles. The film promises high-energy sequences and an engaging story.',
        targetAmount: 80000,
        smallestTokenAmount: 80,
        projectStartDate: new Date('2025-03-01'),
        projectEndDate: new Date('2025-07-01'),
        country: 'Ghana',
        tags: ['action', 'fantasy'],
        // filmmaker: 'Thomas Wilson',
        status: 'public',
        risk: 'high',
        contributionDetails: {
          type: 'bank',
          accountName: 'Thomas Wilson',
          accountNumber: '567890123',
          swiftCode: 'MNO678',
        },
        smartContractDetails: {
          payoutDate: new Date('2025-06-01'),
          percentagePaidOut: 55,
          flopPlan: 'Special incentives for early contributors',
        },
      },
      {
        poster: 'uploads/investor.jpg',
        name: 'Project Pi',
        description: 'Project Pi is a historical drama that tells the story of a pivotal moment in history. The film combines rich storytelling with accurate historical details to create an immersive experience.',
        targetAmount: 90000,
        smallestTokenAmount: 90,
        projectStartDate: new Date('2025-04-01'),
        projectEndDate: new Date('2025-08-01'),
        country: 'Nigeria',
        tags: ['historical', 'drama'],
        // filmmaker: 'Rachel Green',
        status: 'private',
        risk: 'medium',
        contributionDetails: {
          type: 'juice',
          phoneNumber: '0712345678',
        },
        smartContractDetails: {
          payoutDate: new Date('2025-07-01'),
          percentagePaidOut: 60,
          flopPlan: 'Compensation and rewards for contributors',
        },
      },
      {
        poster: 'uploads/Launch.jpeg',
        name: 'Project Rho',
        description: 'Project Rho is a science fiction epic about a team of explorers discovering a new world. The film features stunning visual effects and a captivating story of exploration and discovery.',
        targetAmount: 110000,
        smallestTokenAmount: 110,
        projectStartDate: new Date('2025-05-01'),
        projectEndDate: new Date('2025-09-01'),
        country: 'Kenya',
        tags: ['sci-fi', 'adventure'],
        // filmmaker: 'Michael Thompson',
        status: 'public',
        risk: 'high',
        contributionDetails: {
          type: 'bank',
          accountName: 'Michael Thompson',
          accountNumber: '678901234',
          swiftCode: 'PQR901',
        },
        smartContractDetails: {
          payoutDate: new Date('2025-08-01'),
          percentagePaidOut: 65,
          flopPlan: 'Special incentives and compensation for contributors',
        },
      },
      {
        poster: 'uploads/money.jpeg',
        name: 'Project Sigma',
        description: 'Project Sigma is a heist thriller that follows a group of skilled thieves executing a high-stakes heist. The film features fast-paced action and clever plot twists that keep the audience engaged.',
        targetAmount: 85000,
        smallestTokenAmount: 85,
        projectStartDate: new Date('2025-06-01'),
        projectEndDate: new Date('2025-10-01'),
        country: 'South Africa',
        tags: ['thriller', 'heist'],
        // filmmaker: 'Olivia Lewis',
        status: 'private',
        risk: 'medium',
        contributionDetails: {
          type: 'mpesa',
          phoneNumber: '0786543210',
        },
        smartContractDetails: {
          payoutDate: new Date('2025-09-01'),
          percentagePaidOut: 50,
          flopPlan: 'Detailed compensation plan for contributors',
        },
      },
      {
        poster: 'uploads/Opposition.jpeg',
        name: 'Project Tau',
        description: 'Project Tau is a political drama exploring the complexities of political maneuvering and power struggles. The film provides an insightful look into the world of politics and the personal conflicts it can create.',
        targetAmount: 95000,
        smallestTokenAmount: 95,
        projectStartDate: new Date('2025-07-01'),
        projectEndDate: new Date('2025-11-01'),
        country: 'Nigeria',
        tags: ['politics', 'drama'],
        // filmmaker: 'Sarah Clark',
        status: 'public',
        risk: 'low',
        contributionDetails: {
          type: 'bank',
          accountName: 'Sarah Clark',
          accountNumber: '789012345',
          swiftCode: 'STU234',
        },
        smartContractDetails: {
          payoutDate: new Date('2025-10-01'),
          percentagePaidOut: 55,
          flopPlan: 'Compensation and rewards for contributors',
        },
      },
      {
        poster: 'uploads/Protest.jpeg',
        name: 'Project Upsilon',
        description: 'Project Upsilon is a gritty crime drama about a detective solving a series of high-profile cases. The film combines intense storytelling with intricate plots and character development.',
        targetAmount: 70000,
        smallestTokenAmount: 70,
        projectStartDate: new Date('2025-08-01'),
        projectEndDate: new Date('2026-01-01'),
        country: 'Kenya',
        tags: ['crime', 'drama'],
        // filmmaker: 'David Harris',
        status: 'private',
        risk: 'medium',
        contributionDetails: {
          type: 'juice',
          phoneNumber: '0702345678',
        },
        smartContractDetails: {
          payoutDate: new Date('2025-12-01'),
          percentagePaidOut: 50,
          flopPlan: 'Detailed compensation plan for contributors',
        },
      },
      {
        poster: 'uploads/Reject.jpeg',
        name: 'Project Phi',
        description: 'Project Phi is a coming-of-age comedy that follows a group of friends navigating the challenges of young adulthood. The film offers a mix of humor and heartfelt moments in a relatable story.',
        targetAmount: 60000,
        smallestTokenAmount: 60,
        projectStartDate: new Date('2025-09-01'),
        projectEndDate: new Date('2026-03-01'),
        country: 'Ghana',
        tags: ['comedy', 'coming-of-age'],
        // filmmaker: 'Emma Adams',
        status: 'public',
        risk: 'low',
        contributionDetails: {
          type: 'bank',
          accountName: 'Emma Adams',
          accountNumber: '890123456',
          swiftCode: 'VWX345',
        },
        smartContractDetails: {
          payoutDate: new Date('2026-01-01'),
          percentagePaidOut: 45,
          flopPlan: 'Special rewards for contributors',
        },
      },
      {
        poster: 'uploads/social-good.jpg',
        name: 'Project Chi',
        description: 'Project Chi is a heartwarming drama about a community coming together to address social issues. The film showcases the power of unity and positive change through compelling storytelling.',
        targetAmount: 50000,
        smallestTokenAmount: 50,
        projectStartDate: new Date('2025-10-01'),
        projectEndDate: new Date('2026-02-01'),
        country: 'South Africa',
        tags: ['drama', 'social'],
        // filmmaker: 'William Wright',
        status: 'private',
        risk: 'medium',
        contributionDetails: {
          type: 'mpesa',
          phoneNumber: '0789123456',
        },
        smartContractDetails: {
          payoutDate: new Date('2026-01-01'),
          percentagePaidOut: 40,
          flopPlan: 'Detailed plan for contributor rewards',
        },
      },
];

async function createProjects(users) {
    try {
      const projects = projectsData.map((projectData, index) => {
        return new Project({
          ...projectData,
          filmmaker: users[index % users.length]._id, // Assign a user in a round-robin fashion
        });
      });
  
      await Project.insertMany(projects);
      console.log('New projects created');
    } catch (err) {
      console.error('Error during project creation:', err);
    }
  }

async function main() {
    try {
        await mongoose.connect(MongoDB_connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
  
      // Delete all users and projects
      await User.deleteMany({});
      await Project.deleteMany({});
      console.log('All users and projects deleted.');
  
      // Hash passwords for new users
      const hashedUsers = await Promise.all(newUsers.map(async (userData) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        return { ...userData, password: hashedPassword };
      }));
  
      // Insert new users
      const users = await User.insertMany(hashedUsers);
      console.log('New users created');
  
      // Create and save new projects
      await createProjects(users);
  
      console.log('Database reset successful.');
    } catch (err) {
      console.error('Error during database reset:', err);
    } finally {
      mongoose.connection.close();
    }
  }
  
  // Run the script
  main();

