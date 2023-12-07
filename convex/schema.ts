import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    users: defineTable({
        userId: v.string(),
        email: v.string(),
        firstName: v.string(),
        lastName: v.string(),

        favMovies: v.array(v.number()),
        favSeries: v.array(v.number()),
        favActors: v.array(v.number()),
    }),
})