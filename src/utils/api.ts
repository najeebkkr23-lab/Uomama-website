/// <reference types="vite/client" />

/**
 * API Utility for connecting to internal or decoupled Railway backend
 */
export const getApiUrl = (endpoint: string): string => {
  const base = (import.meta.env?.VITE_API_URL || '').trim().replace(/\/$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return base ? `${base}${cleanEndpoint}` : cleanEndpoint;
};
