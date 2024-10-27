// PhotosUploader.jsx
import axios from "axios";
import { useState } from "react";
import Image from "./Image.jsx";

export default function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState('');

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post('/api/upload-by-link', { link: photoLink });
    onChange(prev => [...prev, filename]);
    setPhotoLink('');
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/api/upload', data, {
      headers: { 'Content-type': 'multipart/form-data' }
    }).then(response => {
      const { data: filenames } = response;
      onChange(prev => [...prev, ...filenames]);
    });
  }

  function removePhoto(ev, filename) {
    ev.preventDefault();
    onChange([...addedPhotos.filter(photo => photo !== filename)]);
  }

  function selectAsMainPhoto(ev, filename) {
    ev.preventDefault();
    onChange([filename, ...addedPhotos.filter(photo => photo !== filename)]);
  }

  return (
    <>
      <div className="flex gap-2">
        <input
          value={photoLink}
          onChange={ev => setPhotoLink(ev.target.value)}
          type="text"
          placeholder={'Add using a link ....jpg'}
        />
        <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 && addedPhotos.map(link => (
          <div className="h-32 flex relative" key={link}>
            <Image className="rounded-2xl w-full object-cover" src={link} alt="" />
            <button onClick={ev => removePhoto(ev, link)} className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
              {/* SVG Icon for Remove */}
            </button>
            <button onClick={ev => selectAsMainPhoto(ev, link)} className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
              {/* SVG Icon for Select as Main */}
            </button>
          </div>
        ))}
        <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input type="file" multiple className="hidden" onChange={uploadPhoto} />
          {/* SVG Icon for Upload */}
          Upload
        </label>
      </div>
    </>
  );
}
