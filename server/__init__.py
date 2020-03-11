from flask import Flask, request, send_from_directory

# set the project root directory as the static folder, you can set others.
app = Flask(__name__,
    static_folder='py',
    static_url_path='')

@app.route('/py/<path:path>')
def send_py(path):
    return send_from_directory('py', path)

if __name__ == "__main__":
    app.run()
