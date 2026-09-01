import { PRODUCTS } from '../data/products';

// Base API URL (proxied via Vite or direct fallback to backend port 5000)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Normalizes raw backend product object to frontend component interface.
 */
export function normalizeProduct(rawItem) {
  if (!rawItem) return null;

  // Process images array
  let images = [];
  if (Array.isArray(rawItem.images) && rawItem.images.length > 0) {
    images = rawItem.images.map(img => typeof img === 'object' ? (img.image_url || img.url) : img).filter(Boolean);
  } else if (rawItem.images_json) {
    try {
      const parsed = JSON.parse(rawItem.images_json);
      images = Array.isArray(parsed) ? parsed.map(i => typeof i === 'object' ? i.image_url : i) : [];
    } catch {
      images = [];
    }
  } else if (rawItem.image_url) {
    images = [rawItem.image_url];
  }

  if (images.length === 0) {
    images = ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80"];
  }

  const rawPrice = Number(rawItem.price) || Number(rawItem.original_price) || 1000;
  const discount = Number(rawItem.discount) || 0;
  const finalPrice = rawItem.final_price !== undefined && rawItem.final_price !== null
    ? Number(rawItem.final_price)
    : (discount > 0 ? Math.round(rawPrice * (1 - discount / 100)) : rawPrice);

  return {
    id: String(rawItem.id || rawItem.product_id || rawItem.code || Math.random().toString(36).substring(2, 9)),
    name: rawItem.product_name || rawItem.name || 'Pure Silver Item',
    category: (rawItem.category_name || rawItem.category || 'silver-coins-bars').toLowerCase().replace(/\s+/g, '-'),
    subcategory: (rawItem.subcategory_name || rawItem.subcategory || 'all').toLowerCase().replace(/\s+/g, '-'),
    purity: rawItem.purity || '999 Fine Pure Silver',
    purityCode: rawItem.purity_code || '999',
    weightGrams: parseFloat(rawItem.weight) || 10,
    price: finalPrice,
    originalPrice: discount > 0 ? rawPrice : Math.round(finalPrice * 1.15),
    rating: Number(rawItem.rating) || 4.9,
    reviewsCount: Number(rawItem.reviews_count || rawItem.reviews) || 48,
    inStock: rawItem.quantity !== undefined ? Number(rawItem.quantity) > 0 : true,
    isBestSeller: Boolean(rawItem.is_bestseller || rawItem.isBestSeller || true),
    isCustomizable: Boolean(rawItem.is_customizable || rawItem.isCustomizable || false),
    recipient: rawItem.ideal_for || rawItem.recipient || 'Gifting, Puja',
    images: images,
    shortDesc: rawItem.description || rawItem.shortDesc || 'Authentic pure 925 / 999 silver product with BIS Hallmark quality assurance.',
    specs: typeof rawItem.specs === 'object' ? rawItem.specs : {
      "Metal Purity": rawItem.purity || "999 Fine Pure Silver",
      "Weight": rawItem.weight || "10 Grams",
      "Craftsmanship": rawItem.make_type || "Handcrafted Luxury Finish",
      "Ideal For": rawItem.ideal_for || "Puja, Luxury Gifting"
    }
  };
}

/**
 * Fetches all products from Backend API (/api/fetch).
 * Falls back to mock PRODUCTS dataset if backend is unreachable or returns error.
 */
export async function fetchProducts(filters = null) {
  try {
    const response = await fetch(`${API_BASE_URL}/fetch`, {
      method: filters ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: filters ? JSON.stringify({ filters }) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const json = await response.json();
    if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
      const normalized = json.data.map(normalizeProduct).filter(Boolean);
      console.log(`[API Service] Loaded ${normalized.length} products live from Express Backend.`);
      return normalized;
    } else {
      console.warn('[API Service] Backend returned empty data set. Using fallback products catalog.');
      return PRODUCTS;
    }
  } catch (error) {
    console.warn('[API Service] Could not connect to Express Backend at /api/fetch. Using client fallback data.', error.message);
    return PRODUCTS;
  }
}

/**
 * Submits an order or form submission to Backend API (/api/data).
 */
export async function postApiData(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return await response.json();
  } catch (error) {
    console.error('[API Service] Error sending data to backend:', error);
    return { success: false, error: error.message };
  }
}
