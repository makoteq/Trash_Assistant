import { useState, useEffect, useRef, LegacyRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
function Ai() {
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [model, setModel] = useState<mobilenet.MobileNet>();
    const [imageURL, setImageURL] = useState<string>();
    const [results, setResults] = useState<{ className: string; probability: number }[]>();
    const [history, setHistory] = useState<any[]>([]);

    const imageRef = useRef<HTMLImageElement>();
    const textInputRef = useRef<{ value: string }>();
    const fileInputRef = useRef<HTMLElement>();

    const loadModel = async () => {
        setIsModelLoading(true);
        try {
            const model = await mobilenet.load();
            setModel(model);
            setIsModelLoading(false);
        } catch (error) {
            console.log(error);
            setIsModelLoading(false);
        }
    };

    const uploadImage = (e: any) => {
        const { files } = e.target;
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            setImageURL(url);
        } else {
            setImageURL("");
        }
    };

    const identify = async () => {
        if (textInputRef.current && imageRef.current) {
            textInputRef.current.value = "";
            const results: any = await model?.classify(imageRef.current);
            setResults(results);
            console.log(results[0]);
        }
    };

    const handleOnChange = (e: any) => {
        setImageURL(e.target.value);
        setResults([]);
    };

    const triggerUpload = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    useEffect(() => {
        loadModel();
    }, []);

    useEffect(() => {
        if (imageURL) {
            setHistory([imageURL, ...history]);
        }
    }, [imageURL]);

    if (isModelLoading) {
        return <h2>Model Loading...</h2>;
    }

    return (
        <div className="App">
            <h1 className="header">Image Identification</h1>
            <div className="inputHolder">
                <input type="file" accept="image/*" capture="camera" className="uploadInput" onChange={uploadImage} ref={fileInputRef as LegacyRef<HTMLInputElement>} />
                <button className="uploadImage" onClick={triggerUpload}>
                    Upload Image
                </button>
                <span className="or">OR</span>
                <input type="text" placeholder="Paster image URL" ref={textInputRef as LegacyRef<HTMLInputElement>} onChange={handleOnChange} />
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                        {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef as LegacyRef<HTMLImageElement> | undefined} />}
                    </div>
                </div>
                {imageURL && (
                    <button className="button" onClick={identify}>
                        Identify Image
                    </button>
                )}
            </div>
        </div>
    );
}

export default Ai;
