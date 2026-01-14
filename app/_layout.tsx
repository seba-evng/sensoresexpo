// app/_layout.tsx
import { Stack } from 'expo-router';
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#111827' },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}