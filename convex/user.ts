import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

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
    const newUser = await ctx.db.insert("user", {
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
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    return user;
  },
});

export const addFavMovie = mutation({
  args: {
    id: v.id("user"),
    movieId: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);

    if (!user || !user.favMovies) {
      throw new Error("Korisnik ili lista filmova nije pronađena.");
    }

    await ctx.db.patch(args.id, { favMovies: [...(user?.favMovies || []), args.movieId] });
  },
});

export const removeFavMovie = mutation({
  args: {
    id: v.id("user"),
    movieId: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    if (!user || !user.favMovies) {
      throw new Error("Korisnik ili lista filmova nije pronađena.");
    }

    const updatedFavMovies = user.favMovies.filter(id => id !== args.movieId);

    await ctx.db.patch(args.id, { favMovies: updatedFavMovies });
  },
});