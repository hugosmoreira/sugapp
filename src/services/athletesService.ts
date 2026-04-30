/**
 * SUG Grappling — Athletes Service (placeholder)
 *
 * Public API stubs that mirror the Events service shape so screens
 * can be wired in once the Athletes table contract is finalized.
 */
import type { Athlete, AthleteProfile } from '../types/types';

export async function listAthletes(): Promise<Athlete[]> {
  return [];
}

export async function getAthleteById(
  _id: string,
): Promise<AthleteProfile | null> {
  return null;
}
