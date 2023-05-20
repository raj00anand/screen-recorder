import React, {useEffect, useState} from 'react'
import useScreenRecorder from "use-screen-recorder";

const Recorder = () => {

    const [link, setLink] = useState();
    const [upload, setUpload] = useState(false);

    
    const arr = [];

    const {
        blobUrl,
        pauseRecording,
        resetRecording,
        resumeRecording,
        startRecording,
        status,
        stopRecording,
      } = useScreenRecorder({ audio: true });

    //   console.log(blobUrl);
    //   console.log(link)

      
      async function handleVideo() {
        let blob = await fetch(blobUrl).then(r => r.blob());
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            var base64data = reader.result;
            handleUpload(base64data);
        }
    }
    
      async function handleUpload(video){
        console.log('video', video);
        try {
            fetch("/api/hello", {
                method: "POST",
                body: JSON.stringify({data: video}),
                headers: { "Content-Type": "application/json"},
            })
            .then((res)=>{
                console.log("response", res.status);
                res.json().then((data)=>{
                    arr.push(data)
                    setLink(arr[0].data);
                });
            });
        } catch (error) {
            console.error(error);
        }
      }

      const handleReload = () =>{
        setUpload(true);
      }

    //   useEffect(()=>{
    //     window.location.reload();
    //   },[upload])

      if(blobUrl!=null && link === undefined){
        handleVideo()
      }

  return (
    <div className='container'>
      <nav className='nav'>
        <img src='https://lh3.googleusercontent.com/kc5GsBU6b3bnSstuIbT78CJB8-RmKJ96lASbhzvZnXWV5vv9Rh5NcilBXJEM--O1vWvKAmytUZwtjdeyvLuKkQ3k=w128-h128-e365-rj-sc0x00ffffff' alt='logo'/>
        
      </nav>

      <div>
        <div className='status'>
            <h4>Status: {status.toLocaleUpperCase()}</h4>
            
        </div>
        
        <div className='video-content'>
            <video src={blobUrl} controls/><br/>
        </div>
        <div className='button-section'>
            {(status === "idle" || status === "error" || status === "permission-requested") &&
            (<button onClick={startRecording}>Start Recording</button>)}

            {(status === "recording" || status === "paused") && 
            (<button onClick={()=>{
                stopRecording();

            }}>Stop Recording</button>)}

            {(status === "recording" || status === "paused") && (
                <button onClick={() => {
                    status === "paused" ? resumeRecording() : pauseRecording()
                }}>{status === "paused" ? "Resume Recording" : "Pause Recording"}</button>
            )}
            
            
            {status === "stopped" && (
                <button onClick={()=>{
                    resetRecording();
                    // window.location.reload();
                    setLink(undefined)
                }}>Reset Recording</button>
            )}

            

            {/* {status === "stopped" && (
                    <button
                        onClick={handleVideo}
                    >
                        Upload Recording
                    </button>

                )} */}
                
        </div>
        <h4 style={{textAlign: 'center'}}>Video URL: {link}</h4>
      </div>
    </div>
  )
}

export default Recorder
