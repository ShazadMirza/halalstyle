import { VAULT_ITEMS, type VaultItem } from "@/lib/vault-items";

export type ExecutiveBundle = {
  id: string;
  title: string;
  subtitle: string;
  itemIds: string[];
};

export const EXECUTIVE_BUNDLES: ExecutiveBundle[] = [
  {
    id: "tech-founder",
    title: "The Modest Tech Founder Set",
    subtitle: "Premium Thobe + Minimalist Laptop Sleeve — boardroom to build mode.",
    itemIds: ["v3", "v22"],
  },
  {
    id: "ramadan-boardroom",
    title: "The Ramadan Boardroom Edit",
    subtitle: "Luxury Crepe Abaya + Jersey Hijab Set — polished iftar-to-meeting flow.",
    itemIds: ["v1", "v2"],
  },
  {
    id: "home-office-prayer",
    title: "The Home Office & Prayer Suite",
    subtitle: "Prayer Rug + Quran Speaker — sacred rhythm between deep-work blocks.",
    itemIds: ["v5", "v9"],
  },
];

export function resolveBundleItems(bundle: ExecutiveBundle): VaultItem[] {
  return bundle.itemIds
    .map((id) => VAULT_ITEMS.find((item) => item.id === id))
    .filter((item): item is VaultItem => item != null);
}
