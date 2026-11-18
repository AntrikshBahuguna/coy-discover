require("dotenv/config");

const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const names = [
  "Aarav", "Riya", "Aditya", "Ananya", "Kabir",
  "Meera", "Arjun", "Ishita", "Vivaan", "Sanya",
  "Reyansh", "Aadhya", "Krishna", "Kiara", "Dev",
  "Myra", "Ayaan", "Diya", "Rohan", "Tara",
  "Ishaan", "Avni", "Vihaan", "Naina", "Arnav",
  "Sara", "Dhruv", "Prisha", "Karan", "Zoya"
];

const cities = [
  "Dehradun",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Chandigarh",
  "Jaipur",
  "Lucknow"
];

const bios = [
  "Love travelling and exploring new places.",
  "Music, coffee and meaningful conversations.",
  "Always up for an adventure.",
  "Football fan and weekend explorer.",
  "Book lover with a passion for photography.",
  "Trying new food places is my thing.",
  "Movies, music and late-night conversations.",
  "Living life one experience at a time."
];

const interests = [
  ["Music", "Travel", "Photography"],
  ["Football", "Gaming", "Movies"],
  ["Reading", "Coffee", "Art"],
  ["Fitness", "Travel", "Cooking"],
  ["Technology", "Music", "Gaming"],
  ["Dance", "Movies", "Food"],
  ["Sports", "Adventure", "Photography"],
  ["Books", "Nature", "Travel"]
];

async function main() {

  // Create the demo user
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Demo User",
      email: "demo@example.com"
    }
  });

  // Generate 30 profiles
  for (let i = 0; i < names.length; i++) {

    const profileId = 101 + i;

    const profile = {
      id: profileId,
      name: names[i],
      age: 20 + (i % 7),
      photo: `https://i.pravatar.cc/600?img=${i + 1}`,
      bio: bios[i % bios.length],
      city: cities[i % cities.length],
      interests: JSON.stringify(
        interests[i % interests.length]
      )
    };

    await prisma.profile.upsert({
      where: { id: profileId },
      update: profile,
      create: profile
    });
  }

  // Seed profiles that have already liked the demo user
  const incomingLikeProfileIds = [
    103, 107, 112, 119, 125, 128
  ];

  for (const profileId of incomingLikeProfileIds) {

    await prisma.incomingLike.upsert({
      where: {
        userId_profileId: {
          userId: 1,
          profileId: profileId
        }
      },
      update: {},
      create: {
        userId: 1,
        profileId: profileId
      }
    });
  }

  console.log("Database seeded successfully!");
  console.log("30 profiles created.");
  console.log("6 incoming likes created.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
