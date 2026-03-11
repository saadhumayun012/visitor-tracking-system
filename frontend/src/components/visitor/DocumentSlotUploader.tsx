import { useRef } from "react";
import type { DocumentSlot } from "../../types";
import Webcam from "react-webcam";
import { Button } from "../ui/Button";

interface Props {
    slot: DocumentSlot;
    index: number;
    onUpdate: (index: number, changes: Partial<DocumentSlot>) => void;
}

export const DocumentSlotUploader = ({ slot, index, onUpdate }: Props) => {
    const webcamRef = useRef<Webcam | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const captureImage = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (!imageSrc) return;

        fetch(imageSrc)
            .then((r) => r.blob())
            .then((blob) => {
                const file = new File(
                    [blob],
                    `${slot.type.document_code}_${Date.now()}.jpg`,
                    { type: "image/jpeg" },
                );
                const previewUrl = URL.createObjectURL(blob);
                onUpdate(index, { file, previewUrl, showCamera: false });
            });
    };

    const handleFileSelect = (file: File) => {
        if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
        const previewUrl = URL.createObjectURL(file);
        onUpdate(index, { file, previewUrl });
    };

    const retake = () => {
        if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
        onUpdate(index, { file: null, previewUrl: null, showCamera: false });
    };

    return (
        <div className="mb-6">
            <p className="list-item-label mb-2">
                {slot.type.document_name}
                {slot.type.is_required && (
                    <span className="text-red-500 ml-1">*</span>
                )}
            </p>

            {/* No file, no camera */}
            {!slot.file && !slot.showCamera && (
                <div className="flex gap-2">
                    <Button
                        variant="post"
                        onClick={() => onUpdate(index, { showCamera: true })}
                    >
                        Camera
                    </Button>
                    <Button
                        variant="get"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Select File
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect(file);
                        }}
                    />
                </div>
            )}

            {/* Camera active */}
            {slot.showCamera && (
                <div className="flex flex-col gap-2">
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ facingMode: "environment" }}
                        className="w-full max-w-md rounded-sm border border-gray-300"
                    />
                    <div className="flex gap-2">
                        <Button
                            variant="post"
                            onClick={captureImage}
                        >
                            Capture
                        </Button>
                        <Button
                            variant="warning"
                            onClick={() =>
                                onUpdate(index, { showCamera: false })
                            }
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {/* Preview */}
            {slot.file && (
                <div className="flex flex-col gap-2">
                    <img
                        src={slot.previewUrl!}
                        alt="preview"
                        className="w-full max-w-md rounded-sm border border-gray-300"
                    />
                    <div className="flex gap-2 items-center">
                        <span className="text-green-600 text-sm">
                            {slot.file.name}
                        </span>
                        <Button
                            variant="delete"
                            onClick={retake}
                        >
                            Retake
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
