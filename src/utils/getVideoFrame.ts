export const getVideoFrame = (videoElement: HTMLVideoElement) => {
    const canvas = document.createElement("canvas");
    [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
    canvas.getContext("2d")?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
};
