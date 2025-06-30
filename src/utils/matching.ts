import { UserPreferences, RoommateProfile, MatchedProfile } from '../types';

export function findMatches(
  userPreferences: UserPreferences,
  roommates: RoommateProfile[]
): MatchedProfile[] {
  // First filter by location
  const sameLocationRoommates = roommates.filter(
    roommate => roommate.location === userPreferences.location
  );

  // Calculate compatibility scores
  const matchedProfiles: MatchedProfile[] = sameLocationRoommates.map(roommate => {
    const matchingPreferences: string[] = [];
    let score = 0;

    // Check noise preference match
    if (roommate.noisePreference === userPreferences.noisePreference) {
      score++;
      matchingPreferences.push('Noise Preference');
    }

    // Check cleanliness match
    if (roommate.cleanliness === userPreferences.cleanliness) {
      score++;
      matchingPreferences.push('Cleanliness');
    }

    // Check pet preference match
    if (roommate.petPreference === userPreferences.petPreference) {
      score++;
      matchingPreferences.push('Pet Preference');
    }

    return {
      ...roommate,
      compatibilityScore: score,
      matchingPreferences
    };
  });

  // Sort by compatibility score (highest first)
  return matchedProfiles.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}

export function getPreferenceLabel(key: string, value: string): string {
  const labels: Record<string, Record<string, string>> = {
    noisePreference: {
      'quiet': 'Quiet Environment',
      'moderate': 'Moderate Noise OK',
      'loud': 'Lively Environment'
    },
    cleanliness: {
      'very-clean': 'Very Clean',
      'clean': 'Clean & Tidy',
      'casual': 'Casual Cleanliness'
    },
    petPreference: {
      'love-pets': 'Love Pets',
      'okay-with-pets': 'OK with Pets',
      'no-pets': 'No Pets'
    }
  };

  return labels[key]?.[value] || value;
}