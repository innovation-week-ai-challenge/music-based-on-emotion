import os
import requests
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv

# Get the environment variables.
load_dotenv()

# Set the variables from the .env file.
Client_ID = os.getenv('CLIENT_ID')
Client_Secret = os.getenv('CLIENT_Secret')

# Authenticate on spotify developer (App)
client_credentials_manager = SpotifyClientCredentials(client_id=Client_ID, client_secret=Client_Secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

print(sp)