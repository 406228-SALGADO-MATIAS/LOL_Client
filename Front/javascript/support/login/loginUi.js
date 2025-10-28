// Variables globales
let backgroundEnabled = true;
let videoInterval = null;

function setupBackgroundVideo() {
  const video = document.getElementById("bg-video");

  if (videoInterval) clearInterval(videoInterval);

  let overlay = document.getElementById("video-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "video-overlay";
    document.body.appendChild(overlay);
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      background: "black",
      opacity: "0",
      transition: "opacity 1s ease",
      pointerEvents: "none",
      zIndex: "0",
    });
  }

  const videos = [
    "https://res.cloudinary.com/dzhyqelnw/video/upload/v1761552523/2025-10-27_04-46-59_fijww4.mp4",
    "https://res.cloudinary.com/dzhyqelnw/video/upload/v1761552517/2025-10-27_04-29-08_tztrgn.mp4",
    "https://res.cloudinary.com/dzhyqelnw/video/upload/v1761552515/2025-10-27_04-17-59_m9bhqs.mp4",
    "https://res.cloudinary.com/dzhyqelnw/video/upload/v1761552522/2025-10-27_04-14-15_qaitpe.mp4",
  ];

  let currentIndex = 0;

  function changeVideo() {
    if (!backgroundEnabled) return;
    currentIndex = (currentIndex + 1) % videos.length;

    overlay.style.opacity = 1;
    setTimeout(() => {
      video.src = videos[currentIndex];
      video.load();
      video.play();
      overlay.style.opacity = 0;
    }, 600);
  }

  video.src = videos[currentIndex];
  video.load();
  video.play();
  overlay.style.opacity = 0;

  videoInterval = setInterval(changeVideo, 15000);
}
