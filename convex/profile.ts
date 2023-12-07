import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { useUser } from "@clerk/nextjs";

export const createProfile = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),

    favMovies: v.array(v.number()),
    favSeries: v.array(v.number()),
    favActors: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    const newUser = await ctx.db.insert("users", {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      userId: args.userId,

      favMovies: args.favMovies,
      favSeries: args.favSeries,
      favActors: args.favActors,
    });
  },
});

export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    return user;
  },
});
