
import { prisma } from "@/lib/prisma";
import { DEMO_USER_ID } from "@/lib/constants";
import { serializeProfile } from "@/lib/profile";


export async function GET() {
  try {
    // Fetch profiles that the user has NOT swiped on
    const profiles = await prisma.profile.findMany({
      where: {
        swipes: {
          none: {
            userId: DEMO_USER_ID
          }
        }
      },

      orderBy: {
        id: "asc"
      }
    });

    // Convert database records into API responses
    const formattedProfiles = profiles.map(
      serializeProfile
    );

    return Response.json({
      success: true,
      count: formattedProfiles.length,
      profiles: formattedProfiles
    });

  } catch (error) {
    console.error("Feed API error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to fetch profiles"
      },
      { status: 500 }
    );
  }
}
