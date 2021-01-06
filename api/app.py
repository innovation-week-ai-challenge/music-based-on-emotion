from recognition import RecognizeEmotion
from flask import Flask, request
from flask_cors import CORS
import os
import json
import sys
import base64


recognize = RecognizeEmotion()
app = Flask(__name__)
CORS(app)

@app.route('/emotion', methods=["POST"])
def get_emotion():
  print('received request')
  if request.method == "POST":
    # print(request.files)
    image = request.files["image0"]
    # print(image)

    try:
      emotion = recognize.get_emotion(image.read())
      result = {
        'emotion': emotion
      }
      return json.dumps(result)
    except:
      print(sys.exc_info())
      return json.dumps({
        'msg': 'Something went wrong'
      })
    
if __name__ == '__main__':
    app.run()