import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { RegisterProvider } from './src/contexts/RegisterContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <RegisterProvider>
        <AppNavigator />
      </RegisterProvider>
    </AuthProvider>
  )
}
