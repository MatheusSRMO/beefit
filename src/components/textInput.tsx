import React, { useState } from 'react';
import { TextInput as RNTextInput, View, Text, TouchableOpacity } from 'react-native';
import { cn } from '@/lib/utils';
import { MaterialIcons } from '@expo/vector-icons';


interface TextInputProps {
  value: string;
  setValue: (value: string) => void;
  type: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'name-phone-pad' | 'twitter' | 'web-search' | 'password';
  placeholder: string;
  className?: string;
}

export default function TextInput({ value, setValue, type, placeholder, className }: TextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className='relative w-9/12'>
      <RNTextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        className={cn('bg-[#21175C] text-[#FFDC98] text-xl px-10 py-3 rounded-3xl placeholder:text-[#FFDC98]', className)}
        keyboardType={type === 'password' ? 'default' : type}
        secureTextEntry={type === 'password' && !isPasswordVisible}
      />
      {type === 'password' && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          className='absolute right-5 top-1/2 transform -translate-y-1/2'
        >
          <MaterialIcons name={isPasswordVisible ? 'visibility-off' : 'visibility'} size={24} color='#FFDC98' />
        </TouchableOpacity>
      )}
    </View>
  );
}
