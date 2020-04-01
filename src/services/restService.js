

export default class RestService {
    onReady = async () => {
        return;
    };

    readFile = async (file, buffer) => {
        const response =  await fetch('/api/readfile', {
            method: 'POST',
            body: file
        });
        console.log("RESPONSE", response.status);
        try {
            // CHILDREN - DO NOT DO THIS AT HOME
            // THIS IS A HORRIBLE HACK AS OUR PYTHON SERVER RETURNS UNENCODED NaN OBJECTS
            let text = await response.text();
            text = text.replace(/NaN/g, 'null');
            return JSON.parse(text);
        } catch (err) {
            console.log("ERROR WHILE LOADING FILE", file, err);
        }
    };

}

