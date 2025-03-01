import { z } from "zod";

export const createCabinFormSchema = z
  .object({
    name: z.string().nonempty("Enter Cabin's Name"),
    maxCapacity: z
      .number()
      .min(1, "Max Capacity must be at least 1")
      .refine((val) => val !== undefined, {
        message: "Enter Max Capacity of Cabin",
      }),
    regularPrice: z
      .number()
      .min(1, "Regular Price must be at least 1")
      .refine((val) => val !== undefined, {
        message: "Enter Regular Price of Cabin",
      }),
    discount: z
      .number()
      .min(0, "Discount must be positive")
      .refine((val) => val !== undefined, {
        message: "Enter Discount of the Cabin",
      }),
    description: z.string().nonempty("Enter Description of the Cabin"),
    file: z.any(),
  })
  .superRefine((data, ctx) => {
    if (data.discount > data.regularPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Discount cannot be greater than the regular price",
        path: ["discount"],
      });
    }
  });
