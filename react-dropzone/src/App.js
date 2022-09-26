import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

function App(props) {
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log('accepted files', acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': [],
    },
  });

  useEffect(() => {
    console.log('images', images);
  }, [images]);
  const handleUpload = () => {
    console.log('Uploading files....');
    axios
      .post('/api/upload', { images })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.message));
  };
  // acceptedFiles.forEach((file) => {
  //   setImages((prev) => [...prev, file]);
  // });
  // const acceptedFileItems = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  // const fileRejectionItems = fileRejections.map(({ file, errors }) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //     <ul>
  //       {errors.map((e) => (
  //         <li key={e.code}>{e.message}</li>
  //       ))}
  //     </ul>
  //   </li>
  // ));

  return (
    <section className='App'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <button type='button' onClick={open}>
          Open
        </button>
        <br />
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      {/* <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul> */}
      {/* </aside> */}
      {images.length > 0 && (
        <div>
          {images.map((image, index) => (
            <img key={index} src={image} alt='' className='images' />
          ))}
          <button type='button' onClick={handleUpload}>
            Upload
          </button>
        </div>
      )}
    </section>
  );
}

// import './App.css';Up
// import { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';

// function App() {
//   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
//     console.log('accepted files', acceptedFiles);
//     console.log('rejected files', rejectedFiles);
//   }, []);
//   const { getRootProps, getInputProps, open } = useDropzone({
//     noClick: true,
//     onDrop,
//     accept: {
//       js: ['.js'],
//     },
//   });
//   // console.log('getInput props', getInputProps());
//   // console.log('getRoot props', getRootProps());
//   return (
//     <>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         <button type='button' onClick={open}>
//           Open
//         </button>
//       </div>
//       {/* <div className='App' {...getRootProps()}>
//         {isDragActive ? 'Drag Active' : 'Drag your files here'}
//       </div>
//       <button {...getInputProps()}>click to upload </button> */}
//     </>
//   );
// }

export default App;
