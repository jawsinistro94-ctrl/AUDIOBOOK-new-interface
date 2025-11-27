import { randomUUID } from "crypto";
import type { 
  Profile, 
  InsertProfile, 
  BestSellerItem, 
  RunemakerSettings, 
  HyperGrabSettings,
  AutomationState 
} from "@shared/schema";

export interface IStorage {
  // Profiles
  getProfiles(): Promise<Profile[]>;
  getProfile(id: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: string, updates: Partial<Profile>): Promise<Profile | undefined>;
  deleteProfile(id: string): Promise<boolean>;

  // Automation State
  getAutomationState(profileId: string): Promise<AutomationState | undefined>;
  updateAutomationState(profileId: string, updates: Partial<AutomationState>): Promise<AutomationState | undefined>;

  // Best Sellers
  getBestSellers(profileId: string): Promise<BestSellerItem[]>;
  updateBestSeller(profileId: string, itemId: string, updates: Partial<BestSellerItem>): Promise<BestSellerItem | undefined>;

  // Runemaker
  getRunemakerSettings(profileId: string): Promise<RunemakerSettings | undefined>;
  updateRunemakerSettings(profileId: string, updates: Partial<RunemakerSettings>): Promise<RunemakerSettings | undefined>;

  // Hyper Grab
  getHyperGrabSettings(profileId: string): Promise<HyperGrabSettings | undefined>;
  updateHyperGrabSettings(profileId: string, updates: Partial<HyperGrabSettings>): Promise<HyperGrabSettings | undefined>;

  // Global State
  getGlobalActive(): Promise<boolean>;
  setGlobalActive(active: boolean): Promise<boolean>;
}

const defaultBestSellers: BestSellerItem[] = [
  { id: "1", name: "Auto SD", hotkey: "F12", enabled: false, hasLocation: false, delay: 100 },
  { id: "2", name: "Auto EXPLO", hotkey: "F4", enabled: false, hasLocation: false, delay: 100 },
  { id: "3", name: "Auto UH", hotkey: "F1", enabled: false, hasLocation: false, delay: 82 },
  { id: "4", name: "Auto Mana", hotkey: "F2", enabled: false, hasLocation: false, delay: 116 },
];

const defaultRunemaker: RunemakerSettings = {
  id: "default",
  isActive: false,
  potionHotkey: null,
  potionRecorded: false,
  spellHotkey: "F6",
  delay: 500,
  potionsPerCycle: 3,
  castsPerCycle: 1,
  pauseHotkey: "F9",
};

const defaultHyperGrab: HyperGrabSettings = {
  id: "default",
  isActive: false,
  enabled: false,
};

export class MemStorage implements IStorage {
  private profiles: Map<string, Profile>;
  private automationStates: Map<string, AutomationState>;
  private globalActive: boolean;

  constructor() {
    this.profiles = new Map();
    this.automationStates = new Map();
    this.globalActive = true;

    // Create default profile
    const defaultProfile: Profile = {
      id: "default",
      name: "Padrão",
      isActive: true,
    };
    this.profiles.set(defaultProfile.id, defaultProfile);

    // Create default automation state
    const defaultState: AutomationState = {
      id: "default",
      profileId: "default",
      isGlobalActive: true,
      bestSellers: [...defaultBestSellers],
      runemaker: { ...defaultRunemaker },
      hyperGrab: { ...defaultHyperGrab },
    };
    this.automationStates.set(defaultProfile.id, defaultState);
  }

  // Profiles
  async getProfiles(): Promise<Profile[]> {
    return Array.from(this.profiles.values());
  }

  async getProfile(id: string): Promise<Profile | undefined> {
    return this.profiles.get(id);
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = randomUUID();
    const profile: Profile = { ...insertProfile, id };
    this.profiles.set(id, profile);

    // Create default automation state for new profile
    const state: AutomationState = {
      id: randomUUID(),
      profileId: id,
      isGlobalActive: true,
      bestSellers: [...defaultBestSellers.map(bs => ({ ...bs, id: randomUUID() }))],
      runemaker: { ...defaultRunemaker, id: randomUUID() },
      hyperGrab: { ...defaultHyperGrab, id: randomUUID() },
    };
    this.automationStates.set(id, state);

    return profile;
  }

  async updateProfile(id: string, updates: Partial<Profile>): Promise<Profile | undefined> {
    const profile = this.profiles.get(id);
    if (!profile) return undefined;

    const updatedProfile = { ...profile, ...updates };
    this.profiles.set(id, updatedProfile);
    return updatedProfile;
  }

  async deleteProfile(id: string): Promise<boolean> {
    if (this.profiles.size <= 1) return false;
    const deleted = this.profiles.delete(id);
    if (deleted) {
      this.automationStates.delete(id);
    }
    return deleted;
  }

  // Automation State
  async getAutomationState(profileId: string): Promise<AutomationState | undefined> {
    return this.automationStates.get(profileId);
  }

  async updateAutomationState(profileId: string, updates: Partial<AutomationState>): Promise<AutomationState | undefined> {
    const state = this.automationStates.get(profileId);
    if (!state) return undefined;

    const updatedState = { ...state, ...updates };
    this.automationStates.set(profileId, updatedState);
    return updatedState;
  }

  // Best Sellers
  async getBestSellers(profileId: string): Promise<BestSellerItem[]> {
    const state = this.automationStates.get(profileId);
    return state?.bestSellers || [];
  }

  async updateBestSeller(profileId: string, itemId: string, updates: Partial<BestSellerItem>): Promise<BestSellerItem | undefined> {
    const state = this.automationStates.get(profileId);
    if (!state) return undefined;

    const itemIndex = state.bestSellers.findIndex(bs => bs.id === itemId);
    if (itemIndex === -1) return undefined;

    const updatedItem = { ...state.bestSellers[itemIndex], ...updates };
    state.bestSellers[itemIndex] = updatedItem;
    this.automationStates.set(profileId, state);
    return updatedItem;
  }

  // Runemaker
  async getRunemakerSettings(profileId: string): Promise<RunemakerSettings | undefined> {
    const state = this.automationStates.get(profileId);
    return state?.runemaker;
  }

  async updateRunemakerSettings(profileId: string, updates: Partial<RunemakerSettings>): Promise<RunemakerSettings | undefined> {
    const state = this.automationStates.get(profileId);
    if (!state) return undefined;

    state.runemaker = { ...state.runemaker, ...updates };
    this.automationStates.set(profileId, state);
    return state.runemaker;
  }

  // Hyper Grab
  async getHyperGrabSettings(profileId: string): Promise<HyperGrabSettings | undefined> {
    const state = this.automationStates.get(profileId);
    return state?.hyperGrab;
  }

  async updateHyperGrabSettings(profileId: string, updates: Partial<HyperGrabSettings>): Promise<HyperGrabSettings | undefined> {
    const state = this.automationStates.get(profileId);
    if (!state) return undefined;

    state.hyperGrab = { ...state.hyperGrab, ...updates };
    this.automationStates.set(profileId, state);
    return state.hyperGrab;
  }

  // Global State
  async getGlobalActive(): Promise<boolean> {
    return this.globalActive;
  }

  async setGlobalActive(active: boolean): Promise<boolean> {
    this.globalActive = active;
    return this.globalActive;
  }
}

export const storage = new MemStorage();
