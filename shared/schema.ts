import { z } from "zod";

// Profile schema
export const profileSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  isActive: z.boolean().default(false),
});

export const insertProfileSchema = profileSchema.omit({ id: true });
export type Profile = z.infer<typeof profileSchema>;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

// Best Sellers automation item schema
export const bestSellerItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  hotkey: z.string(),
  enabled: z.boolean().default(false),
  hasLocation: z.boolean().default(false),
  delay: z.number().min(0).max(1000).default(100),
});

export type BestSellerItem = z.infer<typeof bestSellerItemSchema>;

// Runemaker settings schema
export const runemakerSettingsSchema = z.object({
  id: z.string(),
  isActive: z.boolean().default(false),
  potionHotkey: z.string().nullable(),
  potionRecorded: z.boolean().default(false),
  spellHotkey: z.string().default("F6"),
  delay: z.number().min(100).max(5000).default(500),
  potionsPerCycle: z.number().min(1).max(10).default(3),
  castsPerCycle: z.number().min(1).max(10).default(1),
  pauseHotkey: z.string().default("F9"),
});

export const insertRunemakerSchema = runemakerSettingsSchema.omit({ id: true });
export type RunemakerSettings = z.infer<typeof runemakerSettingsSchema>;
export type InsertRunemakerSettings = z.infer<typeof insertRunemakerSchema>;

// Hyper Grab settings schema
export const hyperGrabSettingsSchema = z.object({
  id: z.string(),
  isActive: z.boolean().default(false),
  enabled: z.boolean().default(false),
});

export const insertHyperGrabSchema = hyperGrabSettingsSchema.omit({ id: true });
export type HyperGrabSettings = z.infer<typeof hyperGrabSettingsSchema>;
export type InsertHyperGrabSettings = z.infer<typeof insertHyperGrabSchema>;

// Full automation state schema
export const automationStateSchema = z.object({
  id: z.string(),
  profileId: z.string(),
  isGlobalActive: z.boolean().default(true),
  bestSellers: z.array(bestSellerItemSchema),
  runemaker: runemakerSettingsSchema,
  hyperGrab: hyperGrabSettingsSchema,
});

export type AutomationState = z.infer<typeof automationStateSchema>;

// API response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
});

export type ApiResponse = z.infer<typeof apiResponseSchema>;
