import * as React from 'react';
import { View } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus, VideoReadyForDisplayEvent } from 'expo-av';

export default function VideoPlayer({ uri }: { uri: string }) {
  const video = React.useRef<Video | null>(null);
  const [status, setStatus] = React.useState<AVPlaybackStatus | null>(null);
  return (
    <View className='aspect-video h-40'>
      <Video
        ref={video}
        style={{
          width: '100%',
          height: '100%',
          // borderColor: '#528AA5',
          // borderWidth: 4,
        }}
        source={{ uri }}
        useNativeControls={false}
        onReadyForDisplay={(event: VideoReadyForDisplayEvent) => {
          if(!video) return;
          // da play no video
          video.current?.playAsync();
        }}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </View>
  );
}
