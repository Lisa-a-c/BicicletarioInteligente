import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="intro"
        options={{
            title: null,
        }}
      />
      <Stack.Screen
        name="signin"
        options={{
          title: null,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: null,
        }}
      />
    </Stack>
  );
}