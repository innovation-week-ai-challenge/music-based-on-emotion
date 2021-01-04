import boto3
import os
from dotenv import load_dotenv
load_dotenv()

class RecognizeEmotion:
  def __init__(self):
    super().__init__()
    access_key = os.getenv("ACCESS_KEY")
    secret_key = os.getenv("SECRET_KEY")

    self.client = boto3.client('rekognition', aws_access_key_id=access_key, aws_secret_access_key=secret_key)
  
  def get_emotion(self, image_path):
    response = self.client.detect_faces(Image={'Bytes': self.get_image_bytes(image_path)}, Attributes=['ALL'])
    face_details = response.get('FaceDetails')[0]
    emotions = face_details.get('Emotions')
    return emotions[0].get('Type')

  def get_image_bytes(self, path):
    with open(path, 'rb') as src:
      return src.read()



if __name__ == "__main__":
    recognition = RecognizeEmotion()
    image_path = './images/happy/happy2.jpg'
    emotion = recognition.get_emotion(image_path=image_path)
    print(emotion)