import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { User, MapPin, Volume2, Sparkles, Heart } from 'lucide-react';

interface UserFormProps {
  onSubmit: (preferences: UserPreferences) => void;
}

export function UserForm({ onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<UserPreferences>({
    name: '',
    age: 18,
    noisePreference: 'moderate',
    cleanliness: 'clean',
    petPreference: 'okay-with-pets',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.location.trim()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof UserPreferences, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              RoomMe
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Find your perfect roommate match</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  min="18"
                  max="100"
                  required
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                Location *
              </label>
              <select
                required
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="">Select your city</option>
                <option value="New York, NY">New York, NY</option>
                <option value="San Francisco, CA">San Francisco, CA</option>
                <option value="Los Angeles, CA">Los Angeles, CA</option>
                <option value="Chicago, IL">Chicago, IL</option>
                <option value="Austin, TX">Austin, TX</option>
              </select>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Living Preferences</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-purple-600" />
                  Noise Preference
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'quiet', label: 'Quiet Environment', desc: 'Peace and quiet' },
                    { value: 'moderate', label: 'Moderate Noise', desc: 'Some activity is fine' },
                    { value: 'loud', label: 'Lively Environment', desc: 'Social and energetic' }
                  ].map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="noisePreference"
                        value={option.value}
                        checked={formData.noisePreference === option.value}
                        onChange={(e) => handleInputChange('noisePreference', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-lg border-2 transition-all ${
                        formData.noisePreference === option.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="font-medium text-gray-800">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Cleanliness Level
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'very-clean', label: 'Very Clean', desc: 'Spotless environment' },
                    { value: 'clean', label: 'Clean & Tidy', desc: 'Well-maintained space' },
                    { value: 'casual', label: 'Casual', desc: 'Lived-in comfort' }
                  ].map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="cleanliness"
                        value={option.value}
                        checked={formData.cleanliness === option.value}
                        onChange={(e) => handleInputChange('cleanliness', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-lg border-2 transition-all ${
                        formData.cleanliness === option.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="font-medium text-gray-800">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-purple-600" />
                  Pet Preference
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'love-pets', label: 'Love Pets', desc: 'Pets welcome!' },
                    { value: 'okay-with-pets', label: 'OK with Pets', desc: 'Neutral about pets' },
                    { value: 'no-pets', label: 'No Pets', desc: 'Prefer pet-free space' }
                  ].map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="petPreference"
                        value={option.value}
                        checked={formData.petPreference === option.value}
                        onChange={(e) => handleInputChange('petPreference', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-lg border-2 transition-all ${
                        formData.petPreference === option.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="font-medium text-gray-800">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Find My Roommate Matches
          </button>
        </form>
      </div>
    </div>
  );
}