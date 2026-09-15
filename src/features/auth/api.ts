import { apiFetch } from "@/lib/api-client";

import type { LoginCredentials, RegisterPayload } from "./types";

// PLACEHOLDER CONTRACT. The backend login and register endpoints are not in
// modmatch-be yet, so the paths and request bodies below are guesses. How the
// session token is returned and stored is also still up to the backend.
// Update both functions to match the real API once it is pushed.

export async function login(credentials: LoginCredentials): Promise<void> {
  await apiFetch<unknown>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function register(payload: RegisterPayload): Promise<void> {
  await apiFetch<unknown>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
