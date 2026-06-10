import { useClerk } from '@clerk/expo';
import { type Href, Link, router } from 'expo-router';

import { Text, TouchableOpacity, View } from '@/tw';

export default function TabOneScreen() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/onboarding');
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-white px-8">
      <Text className="h2 text-center text-lingua-purple">Home</Text>
      <Link href="/onboarding" asChild>
        <TouchableOpacity className="button__primary min-h-14 w-full items-center justify-center rounded-2xl px-6">
          <Text className="font-poppins-semibold text-base text-black">Open onboarding</Text>
        </TouchableOpacity>
      </Link>
      <Link href={"/language-selection" as Href} asChild>
        <TouchableOpacity className="button__secondary min-h-14 w-full items-center justify-center rounded-2xl px-6">
          <Text className="font-poppins-semibold text-base text-lingua-text-primary">
            Choose language
          </Text>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity
        activeOpacity={0.86}
        className="min-h-14 w-full items-center justify-center rounded-2xl border border-[#E8EAF1] bg-white px-6"
        onPress={handleSignOut}
      >
        <Text className="font-poppins-semibold text-base text-lingua-text-primary">Sign out</Text>
      </TouchableOpacity>
    </View>
  );

}
