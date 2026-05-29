import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const cards = [
  { label: 'Games', value: '--' },
  { label: 'Videos', value: '--' },
  { label: 'Downloads', value: '--' },
  { label: 'Evaluations', value: '--' }
];

export function DashboardScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#020617', padding: 20 }}>
      <Text style={{ color: '#fbbf24', letterSpacing: 4, textTransform: 'uppercase' }}>The Locker Room</Text>
      <Text style={{ color: 'white', fontSize: 32, fontWeight: '700', marginTop: 12 }}>Dashboard</Text>
      <Text style={{ color: '#cbd5e1', marginTop: 12, lineHeight: 22 }}>
        Review film, downloads, assignments, and evaluation workflows from the mobile officiating workspace.
      </Text>

      <View style={{ marginTop: 24, gap: 12 }}>
        {cards.map((card) => (
          <View key={card.label} style={{ backgroundColor: '#0f172a', borderRadius: 18, padding: 18 }}>
            <Text style={{ color: '#94a3b8' }}>{card.label}</Text>
            <Text style={{ color: '#fbbf24', fontSize: 28, fontWeight: '700', marginTop: 8 }}>{card.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
