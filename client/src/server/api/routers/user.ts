import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const ProfileSchema = z.object({
  name: z.string().min(1),
  role: z.enum(["USER", "MERCHANT"]),
  logo: z.string().min(1).optional(),
  isSetupComplete: z.boolean(),
});

export const userRouter = createTRPCRouter({
  getUserData: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),

  updateProfile: protectedProcedure
    .input(ProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const user = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...input,
        },
      });
      return user;
    }),

  //   defineRole: protectedProcedure.

  //   getAll: publicProcedure.query(({ ctx }) => {
  //     return ctx.prisma.example.findMany();
  //   }),

  //   getSecretMessage: protectedProcedure.query(() => {
  //     return "you can now see this secret message!";
  //   }),
});
