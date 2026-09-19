//zod schema
import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(120, "Name cannot exceed 120 characters"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),

  workspaceName: z
    .string()
    .trim()
    .min(2, "Workspace name is required")
    .max(150, "Workspace name cannot exceed 150 characters"),

  workspaceSlug: z
    .string()
    .trim()
    .min(3, "Workspace slug must be at least 3 characters")
    .max(100, "Workspace slug cannot exceed 100 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Workspace slug can only contain lowercase letters, numbers, and hyphens"
    ),
});

export type SignupInput = z.infer<typeof signupSchema>;