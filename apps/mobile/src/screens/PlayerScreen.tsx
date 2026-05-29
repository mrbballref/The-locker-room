import React from 'react';
import { Text, View } from 'react-native';

export function PlayerScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#020617', padding: 20 }}>
      <Text style={{ color: '#fbbf24', letterSpacing: 4 }}>PLAYER</Text>
      <Text style={{ color: 'white', fontSize: 32, fontWeight: '700', marginTop: 12 }}>Video Review</Text>
      <View style={{ backgroundColor: '#0f172a', borderRadius: 18, height: 220, marginTop: 24, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#cbd5e1' }}>Video surface</Text>
      </View>
      <Text style={{ color: '#94a3b8', marginTop: 16 }}>
        Connect this screen to the shared video engine playback controller, timeline controller, bookmark controller, and clip workflow.
      </Text>
    </View>
  );
}
