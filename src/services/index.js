

export const parseFile = async buffer => {
  fetch('/api/parseFile', buffer, POST);
}
