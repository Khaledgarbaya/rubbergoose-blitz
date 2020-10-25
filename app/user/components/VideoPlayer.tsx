type VideoPlayerProps = {
  source: string
}
export const VideoPlayer = ({ source }: VideoPlayerProps) => {
  return (
    <div>
      <iframe
        title="video player"
        src={source}
        width="640"
        height="360"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </div>
  )
}
