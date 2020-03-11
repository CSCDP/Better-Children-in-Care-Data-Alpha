import restService from "./restService";

const loadFile = file => {
  console.log(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const buffer = reader.result;
      restService.readFile(file, buffer).then(result => {
        resolve(result);
      });
    };
    reader.readAsArrayBuffer(file);
  });
};

const loadFiles = async (files) => {
  const items = await Promise.all(files.map(file => loadFile(file)));
  const result = {};
  items.forEach(item => {
    result[item.type] = item.data;
  });
  console.log("ITEMS", result);
  return result;
}

export default {
  loadFiles,
}