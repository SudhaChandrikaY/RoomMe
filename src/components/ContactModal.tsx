import React from 'react';
import { X, Mail, Phone, Linkedin, Instagram, Star } from 'lucide-react';
import { MatchedProfile } from '../types';

interface ContactModalProps {
  profile: MatchedProfile;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ profile, isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  const getContactIcon = (method: string) => {
    switch (method) {
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'phone':
        return <Phone className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  const getContactLabel = (method: string) => {
    switch (method) {
      case 'email':
        return 'Email';
      case 'phone':
        return 'Phone';
      case 'linkedin':
        return 'LinkedIn';
      case 'instagram':
        return 'Instagram';
      default:
        return 'Email';
    }
  };

  const handleContactClick = (method: string, value: string) => {
    switch (method) {
      case 'email':
        window.open(`mailto:${value}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:${value}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://${value}`, '_blank');
        break;
      case 'instagram':
        window.open(`https://instagram.com/${value.replace('@', '')}`, '_blank');
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {profile.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Connect with {profile.name.split(' ')[0]}
                </h2>
                <div className="flex items-center gap-1 text-purple-600">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {profile.compatibilityScore}/3 compatibility
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">About {profile.name.split(' ')[0]}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{profile.bio}</p>
          </div>

          {/* Preferred Contact Method */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-800">Preferred Contact</h3>
            </div>
            
            {profile.contactInfo[profile.contactInfo.preferredMethod] && (
              <button
                onClick={() => handleContactClick(
                  profile.contactInfo.preferredMethod,
                  profile.contactInfo[profile.contactInfo.preferredMethod]!
                )}
                className="w-full p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                {getContactIcon(profile.contactInfo.preferredMethod)}
                <span className="font-medium">
                  Contact via {getContactLabel(profile.contactInfo.preferredMethod)}
                </span>
              </button>
            )}
          </div>

          {/* Other Contact Methods */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Other Ways to Connect</h3>
            <div className="space-y-2">
              {Object.entries(profile.contactInfo).map(([method, value]) => {
                if (method === 'preferredMethod' || !value || method === profile.contactInfo.preferredMethod) {
                  return null;
                }
                
                return (
                  <button
                    key={method}
                    onClick={() => handleContactClick(method, value)}
                    className="w-full p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center gap-3 text-left"
                  >
                    <div className="text-purple-600">
                      {getContactIcon(method)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {getContactLabel(method)}
                      </div>
                      <div className="text-sm text-gray-600">{value}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Matching Preferences */}
          {profile.matchingPreferences.length > 0 && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-sm font-semibold text-green-800 mb-2">
                You both match on:
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.matchingPreferences.map((pref, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}