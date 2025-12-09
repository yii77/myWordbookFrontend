import { API_ENDPOINTS } from '../../config/api';

export async function loginByPhone(phone, password) {
  const res = await fetch(API_ENDPOINTS.login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, password }),
  });

  const data = await res.json();

  return { ok: res.ok, data };
}
