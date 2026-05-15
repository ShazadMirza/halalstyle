import type { VaultItem } from "@/lib/vault-items";

/**
 * Halal-safe editorial previews only (not live Amazon gallery images).
 * Mix: modest hijabi editorial (Pexels), boutique/textile/object shots (Unsplash).
 */
const P = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop`;

const CARD_IMAGE_BY_ID: Record<string, string> = {
  // Fashion
  v1: P(6311467),
  v4: P(914668),
  v10: "https://images.unsplash.com/photo-1594938298603-c8148c8dae94?auto=format&fit=crop&w=900&q=85",
  v11: "https://images.unsplash.com/photo-1441986300917-647bde3668e8?auto=format&fit=crop&w=900&q=85",
  v12: "https://images.unsplash.com/photo-1532453288672-3a27f9c49000?auto=format&fit=crop&w=900&q=85",
  // Hijabs
  v2: P(6311671),
  v13: P(6054227),
  v14: "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=900&q=85",
  // Menswear
  v3: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
  v15: "https://images.unsplash.com/photo-1628926379044-9d68edd80730?auto=format&fit=crop&w=900&q=85",
  v16: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85",
  // Home
  v5: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85",
  v7: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85",
  v8: "https://images.unsplash.com/photo-1608571423902-61f887b532cf?auto=format&fit=crop&w=900&q=85",
  v17: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=900&q=85",
  // Kids
  v6: P(3662800),
  v18: P(1620760),
  // Gifts
  v9: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=85",
  v19: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe01?auto=format&fit=crop&w=900&q=85",
  v20: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=85",
  v21: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=85",
};

export function getVaultCardImageUrl(item: VaultItem): string {
  return CARD_IMAGE_BY_ID[item.id] ?? item.imageUrl;
}
