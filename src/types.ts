export interface UserPreferences {
  name: string;
  age: number;
  noisePreference: 'quiet' | 'moderate' | 'loud';
  cleanliness: 'very-clean' | 'clean' | 'casual';
  petPreference: 'love-pets' | 'okay-with-pets' | 'no-pets';
  location: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  linkedin?: string;
  instagram?: string;
  preferredMethod: 'email' | 'phone' | 'linkedin' | 'instagram';
}

export interface RoommateProfile extends UserPreferences {
  id: string;
  bio: string;
  interests: string[];
  profileImage?: string;
  contactInfo: ContactInfo;
}

export interface MatchedProfile extends RoommateProfile {
  compatibilityScore: number;
  matchingPreferences: string[];
}