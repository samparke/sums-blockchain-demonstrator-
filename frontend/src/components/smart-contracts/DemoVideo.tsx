export default function DemoVideo() {
  return (
    <div style={{ padding: "56.13% 0 0 0", position: "relative" }}>
      <iframe
        src="https://player.vimeo.com/video/1111747253?badge=0&autopause=0&player_id=0&app_id=58479"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        title="Sheffield Blockchain Demonstrator"
        allowFullScreen
      />
    </div>
  );
}
