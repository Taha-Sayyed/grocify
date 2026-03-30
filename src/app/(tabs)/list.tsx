import { Show, useUser } from '@clerk/expo'
import { useClerk } from '@clerk/expo'
import { Text, View, Pressable } from 'react-native'

export default function Page() {
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <View className="flex-1 gap-4 bg-background p-5 pt-[60px]">
      <Text className="text-2xl font-bold text-foreground">Welcome!</Text>

      <Show when="signed-in">
        <Text className="text-foreground">
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
        <Pressable
          className="items-center rounded-lg bg-primary px-6 py-3 active:opacity-90"
          onPress={() => signOut()}
        >
          <Text className="font-semibold text-primary-foreground">Sign out</Text>
        </Pressable>
      </Show>
    </View>
  )
}
