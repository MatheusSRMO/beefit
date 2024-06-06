import { View, Text, Image, ImageProps } from 'react-native'
import React from 'react'

interface CarouselProps {
  image1: ImageProps
  image2?: ImageProps
  image3?: ImageProps
}

// export default function Carousel({ image1, image2, image3 }: CarouselProps) {
//   return (
//     <View className='w-full h-full pt-10'>
//       <View className='flex-1 justify-center items-center'>
//         <Image source={require("@/assets/gifs/exercicio1_animated.gif")} className='w-72 h-72'/>
//       </View>
//       <View className='flex-1 flex-row justify-around items-center'>
//         <Image source={require("@/assets/gifs/exercicio2_animated.gif")} className='w-32 h-32'/>
//         <Image source={require("@/assets/gifs/exercicio3_animated.gif")} className='w-32 h-32'/>
//       </View>
//     </View>
//   )
// }

export default function Carousel({ image1, image2, image3 }: CarouselProps) {

  // se não tiver a imagem 2 e 3, exibe a imagem 1 centralizada 
  if (!image2 && !image3) {
    return (
      <View className='w-full h-full'>
        <View className='flex-1 justify-center items-center'>
          <Image {...image1} className='w-72 h-72' />
        </View>
      </View>
    )
  }

  // se tiver a image 1 e 2, exibe uma embaixo da outra
  if (image2 && !image3) {
    return (
      <View className='w-full h-full py-10'>
        <View className='flex-1 justify-center items-center'>
          <Image {...image1} className='w-60 h-60' />
        </View>
        <View className='flex-1 justify-center items-center'>
          <Image {...image2} className='w-60 h-60' />
        </View>
      </View>
    )
  }

  return (
    <View className='w-full h-full pt-10'>
      <View className='flex-1 justify-center items-center'>
        <Image {...image1} className='w-60 h-60' />
      </View>
      <View className='flex-1 flex-row justify-around items-center'>
        <Image {...image2} className='w-32 h-32' />
        <Image {...image3} className='w-32 h-32' />
      </View>
    </View>
  )
}