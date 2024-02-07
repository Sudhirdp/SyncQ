function handleVideoInput(event) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoFile = event.target.files[0];

    if (videoFile) {
        const videoURL = URL.createObjectURL(videoFile);
        videoPlayer.src = videoURL;
    }
}

function createVttFile() {
    const subtitleInput = document.getElementById('subtitleInput').value;
    const videoPlayer = document.getElementById('videoPlayer');

    if (subtitleInput.trim() === "") {
        alert("Please enter subtitle text.");
        return;
    }

    const vttContent = `WEBVTT\n\n00:00.000 --> ${videoPlayer.duration.toFixed(3)}\n${subtitleInput}`;

    const blob = new Blob([vttContent], { type: 'text/vtt' });
    const vttFileURL = URL.createObjectURL(blob);

    const track = document.createElement('track');
    track.src = vttFileURL;
    track.kind = 'subtitles';
    track.srclang = 'en'; // You can modify this based on the language of your subtitles.

    videoPlayer.appendChild(track);
    videoPlayer.textTracks[0].mode = 'showing'; // Display subtitles by default
}
