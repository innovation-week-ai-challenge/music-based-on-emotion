from recognition import RecognizeEmotion
from flask import Flask, request
from flask_cors import CORS
import os
import json

recognize = RecognizeEmotion()
app = Flask(__name__)
CORS(app)

@app.route('/emotion', methods=["POST"])
def get_emotion():
  if request.method == "POST":
    image = request.files["image"]
    emotion = recognize.get_emotion(image.read())
    result = {
      'emotion': emotion
    }
    return json.dumps(result)

if __name__ == '__main__':
    app.run()