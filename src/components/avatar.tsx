import { Image, ImageProps } from 'react-native'
import React from 'react'
import clsx from 'clsx';
import { router } from 'expo-router';

type AvatarProps = ImageProps & {
  size?: 'small' | 'medium' | 'large';
}

export default function Avatar({ size = 'medium', ...rest }: AvatarProps) {
  return (
    <Image
      {...rest}
      style={{
        borderWidth: 3, 
        borderColor: '#4F99DD',
      }}
      className={clsx('rounded-full', {
        'w-10 h-10': size === 'small',
        'w-20 h-20': size === 'medium',
        'w-32 h-32': size === 'large',
      })}
      // onPress={() => {
      //   router.push('./configurations')
      // }}
      
    />
  )
}