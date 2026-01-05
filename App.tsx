import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { ProfileProvider } from './src/contexts/ProfileContext';

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <RootNavigator />
      </ProfileProvider>
    </AuthProvider>
  )
}
