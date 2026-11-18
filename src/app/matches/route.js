
import { prisma } from "@/lib/prisma";
import { DEMO_USER_ID } from "@/lib/constants";
import { serializeProfile } from "@/lib/profile";


export async function GET() {
  try {

    // Fetch only confirmed matches
    const matches = await prisma.match.findMany({
      where: {
        userId: DEMO_USER_ID
      },

      include: {
        profile: true
      },

      orderBy: {
        createdAt: "desc"
      }
    });

    // Return clean profile information
    const formattedMatches = matches.map((match) => ({
      matchId: match.id,
      matchedAt: match.createdAt,
      profile: serializeProfile(match.profile)
    }));

    return Response.json({
      success: true,
      count: formattedMatches.length,
      matches: formattedMatches
    });

  } catch (error) {
    console.error("Matches API error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to fetch matches"
      },
      { status: 500 }
    );
  }
}
