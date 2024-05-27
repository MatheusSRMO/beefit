import Button from '@/components/button';
import React from 'react'
import { Text, View, Image, TextInput } from 'react-native'



export default function Home() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    return (
        <View className="flex-1 bg-background-primary items-center justify-center">
            <Image 
                source={require('../../../assets/images/bg.png')} 
                className='absolute top-0 right-0 w-1/2 h-1/2 -z-10'
            />
            <Image 
                source={require('../../../assets/images/abelha1.png')} 
                className=''
            />

            <Text className="text-text-primary font-bold text-6xl">LuFit</Text>

            <View>
                <Button title="Login" onPress={() => console.log('login')} />
            </View>

        </View>
    )
}
