import { DEFAULT_PRODUCTS } from '../data/defaultProducts';

const PRODUCTS_KEY = 'ecoconstruct_pro_products_v1';
const CART_KEY = 'ecoconstruct_pro_cart_v1';
const ORDERS_KEY = 'ecoconstruct_pro_orders_v1';
const CURRENCY_KEY = 'ecoconstruct_pro_currency_v1';

export const loadStoredProducts = () => {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PRODUCTS;
  } catch (e) {
    console.error('Error loading products from localStorage:', e);
    return DEFAULT_PRODUCTS;
  }
};

export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving products to localStorage:', e);
  }
};

export const loadStoredCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error loading cart from localStorage:', e);
    return [];
  }
};

export const saveStoredCart = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Error saving cart to localStorage:', e);
  }
};

export const loadStoredOrders = () => {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error loading orders from localStorage:', e);
    return [];
  }
};

export const saveStoredOrders = (orders) => {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to localStorage:', e);
  }
};

export const loadStoredCurrency = () => {
  try {
    return localStorage.getItem(CURRENCY_KEY) || 'USD';
  } catch {
    return 'USD';
  }
};

export const saveStoredCurrency = (curr) => {
  try {
    localStorage.setItem(CURRENCY_KEY, curr);
  } catch (e) {
    console.error('Error saving currency:', e);
  }
};
