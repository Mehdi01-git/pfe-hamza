import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  postUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        fullName: z.string(),
        imageUrl: z.string(),
        emailAddress: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id, fullName, imageUrl, emailAddress } = input;
      const result = await ctx.prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      if (result?.fullName === fullName && result.id === id) return true;
      const userCreated = await ctx.prisma.user.create({
        data: {
          id: id,
          fullName: fullName,
          imageUrl: imageUrl,
          emailAddress: emailAddress,
        },
      });
      return userCreated;
    }),
  createPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        desc: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { title, desc, userId } = input;

      await ctx.prisma.posts.create({
        data: {
          title: title,
          desc: desc,
          userId: userId,
        },
      });
      return true;
    }),
  editPost: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        desc: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, title, desc } = input;
      await ctx.prisma.posts.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          desc: desc,
        },
      });
      return true;
    }),
  deletePost: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.posts.delete({
        where: {
          id: input,
        },
      });
      return true;
    }),
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.posts.findMany({
      include: {
        User: true,
      },
    });
    return posts;
  }),
});
