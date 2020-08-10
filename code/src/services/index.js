import RestService from "./restService";
import PyodideService from "./pyodideService";

const urlParams = new URLSearchParams(window.location.search);

export default class Service {
  constructor() {
    this.service = ( urlParams.has('rest') ? new RestService() : new PyodideService());
  };

  onReady = async () => {
    await this.service.onReady();
  };

  loadFile = file => {
    console.log(file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const buffer = reader.result;
        this.service.readFile(file, buffer).then(result => {
          resolve(result);
        });
      };
      reader.readAsArrayBuffer(file);
    });
  };

  loadFiles = async (files) => {
    const items = await Promise.all(files.map(file => this.loadFile(file)));
    const result = {};
    items.forEach(item => {
      result[item.type] = item.data;
    });
    console.log("ITEMS", result);
    return result;
  };

}

