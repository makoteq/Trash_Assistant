export const getVideoFrame = (videoElement: HTMLVideoElement): HTMLImageElement => {
    const canvas = document.createElement("canvas");
    [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
    canvas.getContext("2d")?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    img.width = canvas.width;
    img.height = canvas.height;
    return img;
};
