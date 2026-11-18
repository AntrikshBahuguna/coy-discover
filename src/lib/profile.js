
export function serializeProfile(profile) {
  let interests = [];

  try {
    const parsed = JSON.parse(profile.interests);

    if (Array.isArray(parsed)) {
      interests = parsed;
    }
  } catch {
    interests = [];
  }

  return {
    id: profile.id,
    name: profile.name,
    age: profile.age,
    photo: profile.photo,
    bio: profile.bio,
    city: profile.city,
    interests
  };
}
