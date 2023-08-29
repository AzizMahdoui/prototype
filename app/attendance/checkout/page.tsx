"use client"
import { QrReader}  from "react-qr-reader"

import { useRef, useState } from "react"

export default function Attendance() {
    const [scanResultFile, setScanResultFile] = useState(null);
    const scannerRef = useRef(null);

   

    const handleScanFile = (result) => {
        if (result) {
            setScanResultFile(result);
            console.log(result);
        }
    };

    return (
        <div>
            <h3>Scan Your Code:</h3>
            <button>Open Camera</button>
            <QrReader
                style={{ width: "100%" }}
                legacyMode
                onResult={handleScanFile}
                scanDelay={300}
                ref={scannerRef}
            />
        </div>
    );
}
