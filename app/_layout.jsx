import { useEffect } from 'react';
import { Stack, router } from 'expo-router';

const RootLayout = () => {
  useEffect(() => {
    router.replace('/menu');  // Redirects to the menu page on load
  }, []);

  return (
    <Stack>
      {/* Only the menu page is kept */}
      <Stack.Screen name="menu" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;