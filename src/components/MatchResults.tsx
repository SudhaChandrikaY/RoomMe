import React, { useState } from 'react';
import { MatchedProfile, UserPreferences } from '../types';
import { getPreferenceLabel } from '../utils/matching';
import { ContactModal } from './ContactModal';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Volume2, 
  Sparkles, 
  Heart, 
  User,
  Badge
} from 'lucide-react';

interface MatchResultsProps {
  matches: MatchedProfile[];
  userPreferences: UserPreferences;
  onBack: () => void;
}

export function MatchResults({ matches, userPreferences, onBack }: MatchResultsProps) {
  const [selectedProfile, setSelectedProfile] = useState<MatchedProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnectClick = (profile: MatchedProfile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  const getScoreColor = (score: number) => {
    if (score === 3) return 'bg-green-100 text-green-800 border-green-200';
    if (score === 2) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score === 1) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getScoreText = (score: number) => {
    if (score === 3) return 'Perfect Match';
    if (score === 2) return 'Great Match';
    if (score === 1) return 'Good Match';
    return 'Compatible';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Form
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Your Roommate Matches in {userPreferences.location}
            </h1>
            <p className="text-gray-600">
              Found {matches.length} potential roommate{matches.length !== 1 ? 's' : ''} sorted by compatibility
            </p>
          </div>
        </div>

        {matches.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-lg p-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Matches Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any roommates in {userPreferences.location} right now.
            </p>
            <p className="text-sm text-gray-500">
              Try selecting a different location or check back later for new profiles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] overflow-hidden"
              >
                {/* Profile Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {match.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{match.name}</h3>
                        <p className="text-gray-600">{match.age} years old</p>
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getScoreColor(match.compatibilityScore)}`}>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {getScoreText(match.compatibilityScore)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{match.location}</span>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {match.bio}
                  </p>
                </div>

                {/* Compatibility Details */}
                <div className="px-6 pb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">
                    Compatibility ({match.compatibilityScore}/3)
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-gray-400" />
                        <span>Noise</span>
                      </div>
                      <div className={`flex items-center gap-1 ${
                        match.matchingPreferences.includes('Noise Preference') 
                          ? 'text-green-600' 
                          : 'text-gray-500'
                      }`}>
                        {match.matchingPreferences.includes('Noise Preference') && (
                          <Badge className="w-3 h-3" />
                        )}
                        <span>{getPreferenceLabel('noisePreference', match.noisePreference)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gray-400" />
                        <span>Cleanliness</span>
                      </div>
                      <div className={`flex items-center gap-1 ${
                        match.matchingPreferences.includes('Cleanliness') 
                          ? 'text-green-600' 
                          : 'text-gray-500'
                      }`}>
                        {match.matchingPreferences.includes('Cleanliness') && (
                          <Badge className="w-3 h-3" />
                        )}
                        <span>{getPreferenceLabel('cleanliness', match.cleanliness)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-gray-400" />
                        <span>Pets</span>
                      </div>
                      <div className={`flex items-center gap-1 ${
                        match.matchingPreferences.includes('Pet Preference') 
                          ? 'text-green-600' 
                          : 'text-gray-500'
                      }`}>
                        {match.matchingPreferences.includes('Pet Preference') && (
                          <Badge className="w-3 h-3" />
                        )}
                        <span>{getPreferenceLabel('petPreference', match.petPreference)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div className="px-6 pb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {match.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-6 pb-6">
                  <button 
                    onClick={() => handleConnectClick(match)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    Connect with {match.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Built on Bolt Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-gray-200">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">⚡</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Built on Bolt</span>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {selectedProfile && (
        <ContactModal
          profile={selectedProfile}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}