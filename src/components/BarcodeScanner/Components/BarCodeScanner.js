import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { ClipLoader } from "react-spinners";
import { attendanceStatusChange } from "../../../Modules/ManageAttendance/service";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import AttendanceModal from "../../../Modals/AttendanceModal";

const BarcodeScanner = ({ onValueChange }) => {
  const [scannedResult, setScannedResult] = useState("Scanning...");
  const [isLoading, setIsLoading] = useState(true);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();
  const dispatch = useDispatch();
  const { isSuccess, data } = useSelector((state) => state.attendacneUpdate);

  // List available cameras
  const listCameras = async () => {
    try {
      const videoInputDevices = await codeReader.listVideoInputDevices();
      if (videoInputDevices.length > 0) {
        setAvailableCameras(videoInputDevices);
        setSelectedCamera(videoInputDevices[0].deviceId); // Default to the first camera
      } else {
        console.warn("No cameras found. Using default camera.");
        startScanning(); // Fallback to default camera
      }
    } catch (err) {
      console.error("Error listing cameras:", err);
      startScanning(); // Fallback to default camera
    }
  };

  // Fetch student data (mock function)
  const fetchStudentData = async (studentCode) => {
    // Replace this with your actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "John Doe",
          image: "https://via.placeholder.com/150",
        });
      }, 1000);
    });
  };

  const attendanceUpdateHandler = async (result) => {
    
    stopScanning();
    // Fetch student data
    
    setIsModalOpen(true); // Open the modal
  };

  // Start scanning with the selected or default camera
  const startScanning = async () => {
    setScannedResult("Scanning...");
    try {
      setIsLoading(true); // Set loading state to true
      const previewElem = videoRef.current;
      if (!previewElem) {
        console.error("Video element not found.");
        return;
      }

      // Stop any existing scanning
      if (controlsRef.current) {
        controlsRef.current.stop();
      }

      const controls = await codeReader.decodeFromVideoDevice(
        selectedCamera || undefined,
        previewElem,
        (result, err) => {
          if (result) {
            setScannedResult(result.text);
            onValueChange(result.text);
            attendanceUpdateHandler(result.text);
            setIsLoading(false); // Set loading state to false when result is found
          } else if (err) {
            console.warn("Barcode detection error:", err);
            setIsLoading(false); // Set loading state to false on error
          }
        }
      );

      controlsRef.current = controls;
      setIsScanning(true);
    } catch (err) {
      console.error("Error starting scanner:", err);
      setScannedResult("Failed to start scanner.");
      setIsLoading(false); // Set loading state to false on error
    }
  };

  // Stop scanning
  const stopScanning = () => {
    if (controlsRef.current) {
      controlsRef.current.stop();
    }
    setIsScanning(false);
    setIsLoading(false); // Reset loading state when stopping
  };

  // Initialize the scanner
  useEffect(() => {
    listCameras(); // List cameras on mount
    return () => {
      if (controlsRef.current) {
        controlsRef.current.stop(); // Stop scanning on unmount
      }
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop()); // Stop camera tracks
      }
    };
  }, []);

  // Start scanning when a camera is selected
  useEffect(() => {
    if (selectedCamera) {
      startScanning();
    }
  }, [selectedCamera]);

  return (
    <div>
      <h2 className="font-bold flex justify-center">Barcode Scanner</h2>
      <div className="flex justify-center border-2 border-black rounded-md relative">
        <video ref={videoRef} style={{ width: "300px" }} autoPlay playsInline />
        {/* Moving line */}
        {isScanning && <div className="absolute top-1/3 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_10px_5px_rgba(59,130,246,0.5)] animate-scan-line -translate-y-1/2"></div>}
        
      </div>
      <p className="font-bold flex justify-start">
        {isLoading ? (
          <ClipLoader color="#36d7b7" size={20} /> // Show loader when loading
        ) : (
          isScanning && scannedResult // Show result when scanning and result is found
        )}
      </p>

      {/* Camera selection dropdown */}
      {availableCameras.length > 0 && (
        <div className="my-4">
          <label htmlFor="camera-select" className="mr-2">
            Select Camera:
          </label>
          <select
            id="camera-select"
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="p-2 border rounded-md"
          >
            {availableCameras.map((camera) => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Stop and Restart buttons */}
      {isScanning && (
        <button
          className="bg-red-600 p-2 text-white font-bold rounded-md"
          onClick={stopScanning}
        >
          Stop Scanning
        </button>
      )}
      <button
        className="bg-green-600 p-2 text-white font-bold rounded-md mt-2 ml-2"
        onClick={startScanning}
      >
        Restart
      </button>

      {/* Modal for displaying student data */}
      <AttendanceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
       
    </div>
  );
};

export default BarcodeScanner;