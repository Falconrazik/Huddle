import { useFormik } from "formik";
import React from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

function ImageUpload({ children, filename }) {
  const [file, setFile] = React.useState(null);
  const storage = getStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    try {
      const fileRef = ref(storage, `images/${filename}.jpg`);
      const uploadRes = await uploadBytes(fileRef, file);
      console.log(uploadRes.metadata);
      toast.success("Uploaded image!");
    } catch (e) {
      toast.error("Oops something went wrong uploading the image");
    }
  };

  return (
    <div>
      <form>
        <input type="file" name={"file"} id="file" hidden />
        <label htmlFor="file">{children}</label>
      </form>
    </div>
  );
}

export default ImageUpload;
