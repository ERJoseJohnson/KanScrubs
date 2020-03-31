from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello, World'

@app.route('/send')
def send():
    return 'send'

@app.route('/adminResponse')
@cross_origin(supports_credentials=True)
def adminResponse():
    myJson = {"a" : 1, "b" : 2}
    return jsonify(myJson)

