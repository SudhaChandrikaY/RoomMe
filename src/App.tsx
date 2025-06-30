import React, { useState } from 'react';
import { UserForm } from './components/UserForm';
import { MatchResults } from './components/MatchResults';
import { UserPreferences, MatchedProfile } from './types';
import { mockRoommates } from './data/mockRoommates';
import { findMatches } from './utils/matching';

function App() {
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [matches, setMatches] = useState<MatchedProfile[]>([]);

  const handleFormSubmit = (preferences: UserPreferences) => {
    const matchedProfiles = findMatches(preferences, mockRoommates);
    setUserPreferences(preferences);
    setMatches(matchedProfiles);
  };

  const handleBack = () => {
    setUserPreferences(null);
    setMatches([]);
  };

  return (
    <div className="App">
      {userPreferences ? (
        <MatchResults 
          matches={matches} 
          userPreferences={userPreferences}
          onBack={handleBack}
        />
      ) : (
        <UserForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default App;