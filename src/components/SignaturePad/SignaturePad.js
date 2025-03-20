import React, { useRef, useState } from "react";

const SignaturePad = ({ onSave, setSignature }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = getCoordinates(e);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
    
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;

    // Convert canvas to Blob
    canvas.toBlob((blob) => {
      if (blob) {
        // Convert Blob to File
        const signatureFile = new File([blob], "signature.png", {
          type: "image/png",
        });

        // Send the File object to the parent component
        if (onSave) {
          onSave(signatureFile);
        }
      }
    }, "image/png");
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (e.touches) {
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        offsetX: e.nativeEvent.offsetX,
        offsetY: e.nativeEvent.offsetY,
      };
    }
  };

  return (
    <div className="p-2">
      <canvas
        ref={canvasRef}
        width={500}
        height={200}
        style={{ border: "1px solid black" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <div className="mt-2">
        <button
          type="button"
          onClick={clearCanvas}
          className="bg-red-500 text-white p-2 rounded mr-2"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={saveSignature}
          className="bg-green-500 text-white p-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
