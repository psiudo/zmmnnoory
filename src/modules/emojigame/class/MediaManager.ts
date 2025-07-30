import type { Ref } from "vue";
import type { EmojiImageInfo, EmojiState } from "@/modules/emojigame/types/types";

export class MediaManager{

    stream! : MediaStream
    _video! : HTMLVideoElement

    width : number = 500
    height : number = 400

    // 🎥 캔버스 (merge용)
    mediaRecorder! : MediaRecorder
    mergeCanvas :HTMLCanvasElement
    mergeCtx : CanvasRenderingContext2D
    recordedChunks :Blob[] = []

    constructor(width : number, height :  number, video : HTMLVideoElement){
        this.width = width;
        this.height = height;
        this._video = video;
        this.mergeCanvas = document.createElement('canvas')
        this.mergeCanvas.width = this.width
        this.mergeCanvas.height = this.height
        this.mergeCtx = this.mergeCanvas.getContext('2d')!
        
    }

    async initializeMedia(){
        this.stream = await navigator.mediaDevices.getUserMedia({
            video: { width: this.width, height: this.height },  //790
            audio: true,
            }
        )
    }

    dispose(){
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop())
        }
    }


    cropImage(temp_state_emoji : EmojiState, repeatCount : number) : EmojiImageInfo{
        let video : HTMLVideoElement = this._video;
        
        if(video == null){
            console.log("멸망");
        }

        const temp_canvas = document.createElement('canvas')
        console.log( video.videoHeight + " " + video.videoWidth)
        temp_canvas.height = video.videoHeight
        temp_canvas.width = video.videoWidth

        const ctx = temp_canvas.getContext('2d')!
        if(!ctx){
            console.error("2d context가 없다 아이가")
            return {
            image : '',
            imageName : ''
            }
        }
    
        //console.log(temp_state_emoji.emojiStr  + " 캡처 완료!!")
        ctx.drawImage(video, 0,0, temp_canvas.width, temp_canvas.height)
        return {
            image :  temp_canvas.toDataURL('image/png'),
            imageName : temp_state_emoji.emojiStr + repeatCount
        }
    }


    
    startRecording(frameRate : number, ref_recordedVideoURL : Ref) {
        this.recordedChunks = []

        const videoStream = this.mergeCanvas.captureStream(frameRate) // FPS 설정
        const audioTracks = this.stream?.getAudioTracks() || []
        for(const track of audioTracks){
        videoStream.addTrack(track)
        }

        this.mediaRecorder = new MediaRecorder(videoStream, { mimeType: 'video/webm' })
        
        this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.recordedChunks.push(e.data)
        }

        this.mediaRecorder.onstop = () => {
            const blob = new Blob(this.recordedChunks, { type: 'video/webm' })
            ref_recordedVideoURL.value = URL.createObjectURL(blob)
        }

        this.mediaRecorder.start() 
    }



    stopRecording(){
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop()
        }
    }

}