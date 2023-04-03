import React, { useRef, useEffect, useState } from 'react';
import {Button} from '@material-ui/core'
import { useSelector } from 'react-redux';
import db from '../../firebase/firebase'
import './CallPopup.css'

const CallPopup = ({ remoteId, setAnswerCall, setCallModal, answerCall, callerId }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const user = useSelector((state) => state.user)
  
  useEffect(() => {
    const setupPeerConnection = async () => {
      const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
      const pc = new RTCPeerConnection(configuration);
    
      // Add local video stream to the peer connection
      await setupLocalStream();
    
      // Create and set local offer
      const offer = await setupLocalOffer();
    
      // Send offer to remote user through Firebase Firestore
      await sendOffer();
    
      // Listen for answer from remote user
      receiveOffer();

      // Attach local stream to local video element
      setupPeerConnection();

      function setupPeerConnection() {
        pc.addEventListener('track', (event) => {
          if (event.track.kind === 'video') {
            remoteVideoRef.current.srcObject = new MediaStream([event.track]);
            remoteVideoRef.current.play();
          }
        });
        setPeerConnection(pc);
        setAnswerCall(false);
      }

      function receiveOffer() {
        const answerDoc = db.collection('answer').doc(user.id);
        const unsubscribe = answerDoc.onSnapshot(async (snapshot) => {
          const answerData = snapshot.data();
          if (answerData) {
            const answer = new RTCSessionDescription(answerData);
            await pc.setRemoteDescription(answer);
          }
        });
      }

      async function sendOffer() {
        const offerDoc = db.collection('offer').doc(remoteId);
        await offerDoc.set(offer.toJSON());
      }

      async function setupLocalOffer() {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        return offer;
      }

      async function setupLocalStream() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));

        const localVideoElement = localVideoRef.current;
        if (localVideoElement) {
          localVideoElement.srcObject = stream;
        }
      }
    };
  
    if (!answerCall) {
      setupPeerConnection();
    }
  }, [answerCall, remoteId, setAnswerCall]);

  useEffect(() => {
    if (peerConnection) {
      const remoteVideo = remoteVideoRef.current;

      // When remote stream is received, set it as the source of the remote video element
      const handleTrackEvent = (event) => {
        remoteVideo.srcObject = event.streams[0];
      };
      peerConnection.addEventListener('track', handleTrackEvent);

      return () => {
        peerConnection.removeEventListener('track', handleTrackEvent);
      };
    }
  }, [peerConnection, remoteVideoRef]);

  useEffect(()=> {
    if (user) {
      const unsubscribe = db
      .collection("awaiting")
      .doc(user.id)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          acceptCall();
         } 
      });
    return () => {
      unsubscribe();
    }
    }
  }, [])

  const acceptCall = async () => {
    setAnswerCall(false);
    const { configuration, stream } = await setupRemoteStream();

    const peerConnection = new RTCPeerConnection(configuration);

    // Add tracks from local stream to the peer connection
    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
    db.collection('awaiting').doc(callerId).set({
      awaiting: true,
      user: user.id
    })

    // Send answer to remote user
    await answerCallee();
    
    // When remote stream is received, set it as the source of the remote video element
    const handleTrackEvent = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
      remoteVideoRef.current.play();
    };
    peerConnection.addEventListener('track', handleTrackEvent);
    setPeerConnection(peerConnection);

    async function answerCallee() {
      const offerDoc = db.collection('offer').doc(user.id);
      const offerData = (await offerDoc.get()).data();
      const offer = new RTCSessionDescription(offerData);
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      const answerDoc = db.collection('answer').doc(remoteId);
      await answerDoc.set(answer.toJSON());
    }

    async function setupRemoteStream() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      remoteVideoRef.current.srcObject = stream;
      const configuration = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      };
      return { configuration, stream };
    }
  };

  const endCall = async () => {
    turnOffStates();
    
    turnOffTracks();
    await turnOffSignaling();

    async function turnOffSignaling() {
      await db.collection('awaiting').doc(callerId ? callerId : user.id).delete();
      await db.collection('request').doc(remoteId ? remoteId : user.id).delete();
    }

    function turnOffTracks() {
      try {
        const localTracks = localVideoRef.current.srcObject.getTracks();
        localTracks.forEach((track) => {
          track.stop();
          localVideoRef.current.srcObject.removeTrack(track);
        });

        const remoteTracks = remoteVideoRef.current.srcObject.getTracks();
        remoteTracks.forEach((track) => {
          track.stop();
          remoteVideoRef.current.srcObject.removeTrack(track);
        });
      } catch (err) {
        console.log(err);
      }
    }

    function turnOffStates() {
      setAnswerCall(false);
      setCallModal(false);
      setPeerConnection(false);
      if (peerConnection) {
        peerConnection.close();
      }
    }
  }
  return (
    <div className="call_container">
      <div className="video_container">
        <video id="local_video" ref={localVideoRef} autoPlay style={{ width: '50%', float: 'left' }} />
        {answerCall ? (
      <div className="remote_video_loading">
        <div className="spinner"></div>
      </div>
      ) : (
        <video id="remote_video" ref={remoteVideoRef} autoPlay style={{ width: '50%', float: 'left' }} />
      )}
      </div>
      <div className="button_container">
        {answerCall && <div className='video_button'><Button type ='submit' onClick={acceptCall}>Accept Call</Button></div>}
        <div className='video_button'><Button type ='submit' onClick={endCall}>End Call</Button></div>
      </div>  
  </div>
  );
};
// FIX BUG WHEN LOGOUT NOTIFICATION STILL SHOWS NUMBER IN TOP RIGHT CORNER
export default CallPopup;