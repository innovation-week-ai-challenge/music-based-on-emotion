import boto3
import os
from dotenv import load_dotenv
load_dotenv()

class RecognizeEmotion:
  def __init__(self):
    super().__init__()
    access_key = os.getenv("AWS_ACCESS_KEY")
    secret_key = os.getenv("AWS_SECRET_KEY")

    self.client = boto3.client('rekognition', aws_access_key_id=access_key, aws_secret_access_key=secret_key, region_name='us-west-2')
  
  def get_emotion(self, image_bytes):
    response = self.client.detect_faces(Image={'Bytes': image_bytes}, Attributes=['ALL'])

    face_details = response.get('FaceDetails')

    if not face_details:
      return 'UNKNOWN'

    emotions = face_details[0].get('Emotions')
    return emotions[0].get('Type')
