import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProfileSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // === PROFILES ===
  
  // Get all profiles
  app.get("/api/profiles", async (req, res) => {
    try {
      const profiles = await storage.getProfiles();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profiles" });
    }
  });

  // Get single profile
  app.get("/api/profiles/:id", async (req, res) => {
    try {
      const profile = await storage.getProfile(req.params.id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // Create profile
  app.post("/api/profiles", async (req, res) => {
    try {
      const parsed = insertProfileSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid profile data", details: parsed.error.errors });
      }
      const profile = await storage.createProfile(parsed.data);
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to create profile" });
    }
  });

  // Update profile
  app.patch("/api/profiles/:id", async (req, res) => {
    try {
      const profile = await storage.updateProfile(req.params.id, req.body);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // Delete profile
  app.delete("/api/profiles/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProfile(req.params.id);
      if (!deleted) {
        return res.status(400).json({ error: "Cannot delete profile (may be the last one)" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete profile" });
    }
  });

  // === AUTOMATION STATE ===

  // Get automation state for profile
  app.get("/api/profiles/:profileId/state", async (req, res) => {
    try {
      const state = await storage.getAutomationState(req.params.profileId);
      if (!state) {
        return res.status(404).json({ error: "Automation state not found" });
      }
      res.json(state);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch automation state" });
    }
  });

  // Update automation state
  app.patch("/api/profiles/:profileId/state", async (req, res) => {
    try {
      const state = await storage.updateAutomationState(req.params.profileId, req.body);
      if (!state) {
        return res.status(404).json({ error: "Automation state not found" });
      }
      res.json(state);
    } catch (error) {
      res.status(500).json({ error: "Failed to update automation state" });
    }
  });

  // === BEST SELLERS ===

  // Get best sellers for profile
  app.get("/api/profiles/:profileId/best-sellers", async (req, res) => {
    try {
      const bestSellers = await storage.getBestSellers(req.params.profileId);
      res.json(bestSellers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch best sellers" });
    }
  });

  // Update best seller item
  app.patch("/api/profiles/:profileId/best-sellers/:itemId", async (req, res) => {
    try {
      const item = await storage.updateBestSeller(req.params.profileId, req.params.itemId, req.body);
      if (!item) {
        return res.status(404).json({ error: "Best seller item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to update best seller" });
    }
  });

  // === RUNEMAKER ===

  // Get runemaker settings
  app.get("/api/profiles/:profileId/runemaker", async (req, res) => {
    try {
      const settings = await storage.getRunemakerSettings(req.params.profileId);
      if (!settings) {
        return res.status(404).json({ error: "Runemaker settings not found" });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch runemaker settings" });
    }
  });

  // Update runemaker settings
  app.patch("/api/profiles/:profileId/runemaker", async (req, res) => {
    try {
      const settings = await storage.updateRunemakerSettings(req.params.profileId, req.body);
      if (!settings) {
        return res.status(404).json({ error: "Runemaker settings not found" });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to update runemaker settings" });
    }
  });

  // === HYPER GRAB ===

  // Get hyper grab settings
  app.get("/api/profiles/:profileId/hyper-grab", async (req, res) => {
    try {
      const settings = await storage.getHyperGrabSettings(req.params.profileId);
      if (!settings) {
        return res.status(404).json({ error: "Hyper grab settings not found" });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hyper grab settings" });
    }
  });

  // Update hyper grab settings
  app.patch("/api/profiles/:profileId/hyper-grab", async (req, res) => {
    try {
      const settings = await storage.updateHyperGrabSettings(req.params.profileId, req.body);
      if (!settings) {
        return res.status(404).json({ error: "Hyper grab settings not found" });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to update hyper grab settings" });
    }
  });

  // === GLOBAL STATE ===

  // Get global active state
  app.get("/api/global-active", async (req, res) => {
    try {
      const active = await storage.getGlobalActive();
      res.json({ active });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch global state" });
    }
  });

  // Set global active state
  app.post("/api/global-active", async (req, res) => {
    try {
      const { active } = req.body;
      if (typeof active !== "boolean") {
        return res.status(400).json({ error: "Invalid active state" });
      }
      const result = await storage.setGlobalActive(active);
      res.json({ active: result });
    } catch (error) {
      res.status(500).json({ error: "Failed to update global state" });
    }
  });

  return httpServer;
}
