// Recorded configuration
export const captureConfig = (width: number, height: number) => ({
  video: true,
  audio: true,
  videoConstraints: {
    mandatory: {
      minWidth: width,
      minHeight: height,
      maxWidth: width,
      maxHeight: height,
      maxFrameRate: 30,
      minFrameRate: 30,
    }
  }
});

// mediaRecorder Config
export const mediaRecorderOptions = {
  audioBitsPerSecond: 128000,
  videoBitsPerSecond: 2500000,
  mimeType: 'video/webm;codecs=vp9'
};

// Blob Config
export const blobOptions = {
  type: 'video/webm'
};
