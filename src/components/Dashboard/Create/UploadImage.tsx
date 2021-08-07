import React, { useState } from 'react';
import axios from 'axios';

interface EventImageProps {
  setImage: any;
}

export const UploadImage: React.FunctionComponent<EventImageProps> = ({
  setImage,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  console.log(uploading);

  const processUpload = async (e: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', e);
    formData.append('upload_preset', 'wfrfnmis');

    await axios(`https://api.cloudinary.com/v1_1/dzsf703vh/image/upload`, {
      method: 'POST',
      data: formData,
    })
      .then((res) => {
        setImage(res.data.secure_url);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const beforeUpload = (file: File) => {
    const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPGorPNG) {
      console.error('You can only upload JPG or PNG file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      console.error('Image must smaller than 5MB!');
    }
    return isJPGorPNG && isLt5M;
  };
  const handleChange = async (selectorFiles: FileList) => {
    const file = selectorFiles[0];
    beforeUpload(file) && (await processUpload(file));
  };

  return (
    <div className="mt4 relative overflow-hidden dib">
      <div className="ba bw1 b--black dib noselect br-100 b--solid pa2 ph3 f5 fw5"
          onClick={()=>document.getElementById('UploadImage').click()}
        >
        Upload Image
      </div>
      <input
        type="file"
        id="UploadImage"
        onChange={(e) => handleChange(e.target.files)}
        style={{ left: 0, top: 0 }}
        className="absolute o-0"
      />
    </div>
  );
};
