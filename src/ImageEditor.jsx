import React, { useRef, useEffect } from "react";
import { ImageEditorComponent } from "@syncfusion/ej2-react-image-editor";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Browser } from "@syncfusion/ej2-base";

function ImageEditor({ canvasImage, canvasRef }) {
  const imgObj = useRef(null);

  const imageEditorCreated = () => {
    if (Browser.isDevice) {
      imgObj.current.open("flower.png");
    } else {
      imgObj.current.open("bridge.png");
    }
  };

  useEffect(() => {
    // imageEditorCreated();
  }, []);

  function btnClick() {
    let dimension = canvasRef.current.getImageDimension();
    imgObj.current.drawText(dimension.x, dimension.y);
  }

  return (
    <div className="e-img-editor-sample imageEditorContainer">
      <ImageEditorComponent />
    </div>
  );
}

export default ImageEditor;
