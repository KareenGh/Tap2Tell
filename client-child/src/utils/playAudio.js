/**
 * load, play and unload sound
 * @param soundObject e.g new Audio() 
 * @param audio e.g: require('audio.mp3')
 */
export async function playAudio(soundObject, audio) {
    let playRes;
    try {
        await soundObject.loadAsync(audio);
        playRes = await soundObject.playAsync();
        soundObject.setOnPlaybackStatusUpdate(async (status) => {
            if (status.didJustFinish === true) {
                await soundObject.unloadAsync()
            }
        })



    } catch (error) {
        console.log('play audio err:', error);
        // does this help?
        await soundObject.unloadAsync()
        soundObject.setOnPlaybackStatusUpdate(null)
    }
}