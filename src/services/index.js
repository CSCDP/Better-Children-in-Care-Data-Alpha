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
        console.log(file.name, result);
        resolve(result);
      });
    };
    reader.readAsArrayBuffer(file);
  });
};

const loadFiles = async (files) => {
  const items = await Promise.all(files.map(file => loadFile(file)));
  console.log("ITEMS", items);
  let result = {};
  items.forEach(item => {
    result = {...result, ...item}
  });
  return result;
}

export default {
  loadFiles,
}