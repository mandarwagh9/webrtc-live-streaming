const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startButton = document.getElementById('startStream');
const joinButton = document.getElementById('joinStream');
const muteButton = document.getElementById('mute');
const statusMessage = document.getElementById('statusMessage');

const socket = io(); // Connect to signaling server
let localStream, remoteStream;
let peerConnection;

const config = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] // STUN server
};

// Start Streaming (Broadcaster)
startButton.addEventListener('click', async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;

  peerConnection = new RTCPeerConnection(config);
  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  peerConnection.onicecandidate = event => {
    if (event.candidate) socket.emit('ice-candidate', event.candidate);
  };

  peerConnection.ontrack = event => {
    if (!remoteStream) {
      remoteStream = new MediaStream();
      remoteVideo.srcObject = remoteStream;
    }
    remoteStream.addTrack(event.track);
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit('offer', offer);

  statusMessage.textContent = 'Stream started! Waiting for remote peer...';
});

// Join Stream (Viewer)
joinButton.addEventListener('click', () => {
  peerConnection = new RTCPeerConnection(config);

  peerConnection.onicecandidate = event => {
    if (event.candidate) socket.emit('ice-candidate', event.candidate);
  };

  peerConnection.ontrack = event => {
    if (!remoteStream) {
      remoteStream = new MediaStream();
      remoteVideo.srcObject = remoteStream;
    }
    remoteStream.addTrack(event.track);
  };

  socket.on('offer', async offer => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('answer', answer);
  });

  socket.on('answer', answer => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  });

  socket.on('ice-candidate', candidate => {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

  statusMessage.textContent = 'Joined stream! Awaiting video...';
});

// Mute Button Logic
muteButton.addEventListener('click', () => {
  localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled;
  muteButton.textContent = localStream.getAudioTracks()[0].enabled ? 'Mute' : 'Unmute';
});
