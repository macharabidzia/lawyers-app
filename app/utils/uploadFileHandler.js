import mime from 'mime';
import axios from 'axios';
export default uploadFileHandler = async (file) => {
  const formData = new FormData();
  const newImageUri = 'file:///' + file.uri.split('file:/').join('');
  formData.append('image', {
    uri: newImageUri,
    type: mime.getType(newImageUri),
    name: newImageUri.split('/').pop(),
  });
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await axios.post(
      'http://192.168.100.5:5000/api/upload',
      formData,
      config
    );

    return data.split('\\').join('/');
  } catch (error) {
    console.error(error);
    return;
  }
};
