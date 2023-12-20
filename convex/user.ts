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

    imageId: v.optional(v.string()),
    username: v.optional(v.string())
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

      imageId: args.imageId,
      username: args.username,
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

    if (!user) {
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

    const updatedFavMovies = user.favMovies.filter((id: any) => id !== args.movieId);

    await ctx.db.patch(args.id, { favMovies: updatedFavMovies });
  },
});

export const addFavSerie = mutation({
  args: {
    id: v.id("user"),
    serieId: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);

    if (!user) {
      throw new Error("Korisnik ili lista filmova nije pronađena.");
    }

    await ctx.db.patch(args.id, { favSeries: [...(user?.favSeries || []), args.serieId] });
  },
});

export const removeFavSerie = mutation({
  args: {
    id: v.id("user"),
    serieId: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);

    if (!user) {
      throw new Error("User not found.");
    }

    const updatedFavSeries = user.favSeries.filter((id: any) => id !== args.serieId);

    await ctx.db.patch(args.id, { favSeries: updatedFavSeries });
  },
});
export const addFavActor = mutation({
  args: {
    id: v.id("user"),
    actorId: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);

    if (!user) {
      throw new Error("User not found.");
    }

    await ctx.db.patch(args.id, { favSeries: [...(user?.favSeries || []), args.actorId] });
  },
});

export const removeFavActor = mutation({
  args: {
    id: v.id("user"),
    actorId: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    
    if (!user) {
      throw new Error("User not found.");
    }

    const updatedFavActors = user.favActors.filter((id: any) => id !== args.actorId);

    await ctx.db.patch(args.id, { favActors: updatedFavActors });
  },
});

export const generateUploadUrl = mutation({
  args: {
    id: v.id("user"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    
    if (!user) {
      throw new Error("User not found.");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveImageId = mutation({
  args: {
    id: v.id("user"),
    uploaded: v.object({
      imageId: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    
    if (!user) {
      throw new Error("User not found.");
    }

    ctx.db.patch(args.id, {
      imageId: args.uploaded.imageId,
    });
  },
});

export const getImageUrl = mutation({
  args: {
    id: v.id("user"),
    imageId: v.id("_storage")
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    
    if (!user) {
      throw new Error("User not found.");
    }

    return ctx.storage.getUrl(args.imageId);
  }
});

export const setName = mutation({
  args: {
    id: v.id("user"),
    firstName: v.string(),
    lastName: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    
    if (!user) {
      throw new Error("User not found.");
    }

    ctx.db.patch(args.id, {
      firstName: args.firstName,
      lastName: args.lastName,
    });
  }
})

export const setUsername = mutation({
  args: {
    id: v.id("user"),
    username: v.string()
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    
    if (!user) {
      throw new Error("User not found.");
    }

    ctx.db.patch(args.id, {
      username: args.username,
    });
  }
})