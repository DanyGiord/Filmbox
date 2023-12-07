import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
        email: user.emailAddresses[0].emailAddress,
        firstName: `${user.firstName}`,
        lastName: `${user.lastName}`,

        favMovies: JSON.stringify([]),
        favSeries: JSON.stringify([]),
        favActors: JSON.stringify([]),
    },
  });

  return newProfile;
};
