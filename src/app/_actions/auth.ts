'use server';

import { cookies } from 'next/headers';

const MOCK_USER_COOKIE = 'mock-user-id';

/**
 * Server action to set the mock user cookie.
 * @param userId - The ID of the user to "log in" as, or "guest".
 */
export async function switchUser(userId: string) {
  if (userId === 'guest') {
    // If the user selects "Guest", delete the cookie
    cookies().delete(MOCK_USER_COOKIE);
  } else {
    // Otherwise, set the cookie with the selected user's ID
    cookies().set(MOCK_USER_COOKIE, userId, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    });
  }
}

/**
 * Helper function to get the currently logged-in mock user's ID.
 * Can be called from any Server Component or Server Action.
 * @returns The user ID as a number, or null if logged out.
 */
export async function getCurrentUserId() {
  const userId = cookies().get(MOCK_USER_COOKIE)?.value;
  return userId ? parseInt(userId) : null;
}