import React from 'react';
import { Text, View } from 'react-native';

export function SettingsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#020617', padding: 20 }}>
      <Text style={{ color: '#fbbf24', letterSpacing: 4 }}>SETTINGS</Text>
      <Text style={{ color: 'white', fontSize: 32, fontWeight: '700', marginTop: 12 }}>Profile</Text>
      <Text style={{ color: '#cbd5e1', marginTop: 12 }}>
        Manage account, organization, storage, and sync preferences.
      </Text>
    </View>
  );
}
