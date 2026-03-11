import { API_ENDPOINTS } from '../../../config/api';

export async function getWordbooks(authFetch) {
  try {
    const res = await authFetch(API_ENDPOINTS.getWordbooks);
    const result = await res.json();
    console.log(result);
    return { ok: res.ok, result };
  } catch (err) {
    console.log('getWordbooks error:', err);
    return { ok: false, result: null };
  }
}
