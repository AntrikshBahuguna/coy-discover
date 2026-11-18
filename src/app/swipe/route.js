
import { prisma } from "@/lib/prisma";
import { DEMO_USER_ID } from "@/lib/constants";
import { serializeProfile } from "@/lib/profile";


export async function POST(request) {
  try {
    // 1. Read request body
    let body;

    try {
      body = await request.json();
    } catch {
      return Response.json(
        {
          success: false,
          message: "Invalid JSON request"
        },
        { status: 400 }
      );
    }

    const { profileId, direction } = body;

    // 2. Validate profile ID
    if (
      !Number.isInteger(profileId) ||
      profileId <= 0
    ) {
      return Response.json(
        {
          success: false,
          message: "Invalid profile ID"
        },
        { status: 400 }
      );
    }

    // 3. Validate swipe direction
    if (!["LIKE", "PASS"].includes(direction)) {
      return Response.json(
        {
          success: false,
          message: "Direction must be LIKE or PASS"
        },
        { status: 400 }
      );
    }

    // 4. Perform database operations atomically
    const result = await prisma.$transaction(
      async (tx) => {

        // Check whether profile exists
        const profile = await tx.profile.findUnique({
          where: {
            id: profileId
          }
        });

        if (!profile) {
          return {
            notFound: true
          };
        }

        // Check for an existing swipe
        const existingSwipe = await tx.swipe.findUnique({
          where: {
            userId_profileId: {
              userId: DEMO_USER_ID,
              profileId
            }
          }
        });

        if (existingSwipe) {
          return {
            duplicate: true
          };
        }

        // Save the swipe
        await tx.swipe.create({
          data: {
            userId: DEMO_USER_ID,
            profileId,
            direction
          }
        });

        let isMatch = false;

        // Only a LIKE can create a match
        if (direction === "LIKE") {

          // Check whether this profile has liked us
          const incomingLike =
            await tx.incomingLike.findUnique({
              where: {
                userId_profileId: {
                  userId: DEMO_USER_ID,
                  profileId
                }
              }
            });

          if (incomingLike) {

            // Create mutual match
             await tx.match.upsert({
             where: {
             userId_profileId: {
             userId: DEMO_USER_ID,
             profileId
             }
             },
             update: {},
             create: {
             userId: DEMO_USER_ID,
             profileId
            }
            });

            isMatch = true;
          }
        }

        return {
          isMatch,
          profile: serializeProfile(profile)
        };
      }
    );

    // 5. Handle database results
    if (result.notFound) {
      return Response.json(
        {
          success: false,
          message: "Profile not found"
        },
        { status: 404 }
      );
    }

    if (result.duplicate) {
      return Response.json(
        {
          success: false,
          message: "You have already swiped on this profile"
        },
        { status: 409 }
      );
    }

    // 6. Return response
    return Response.json({
      success: true,
      isMatch: result.isMatch,
      message: result.isMatch
        ? "It's a match!"
        : "Swipe recorded successfully",
      match: result.isMatch
        ? result.profile
        : null
    });

  } catch (error) {

    // Handle unique constraint violations
    if (error.code === "P2002") {
      return Response.json(
        {
          success: false,
          message: "You have already swiped on this profile"
        },
        { status: 409 }
      );
    }

    console.error("Swipe API error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to process swipe"
      },
      { status: 500 }
    );
  }
}
