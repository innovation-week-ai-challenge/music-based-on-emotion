import os
import requests
import spotipy
import json
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv

# Spotify developer authentication. Consulted on 04/01/2021.

# https://morioh.com/p/31b8a607b2b0 
# https://developer.spotify.com/documentation/web-playback-sdk/quick-start/
# https://spotipy.readthedocs.io/en/2.16.1/
# https://developer.spotify.com/console/get-search-item/?q=tania+bowra&type=artist

# Get the environment variables.
load_dotenv()

class SpotifyTrack:
    def __init__(self):
        # Set the variables from the .env file.
        self.Client_ID = os.getenv('CLIENT_ID')
        self.Client_Secret = os.getenv('Client_SECRET')
        self.spotify = None
    
    def authenticate(self):
        try:
            # Authenticate on spotify developer (App)
            client_credentials_manager = SpotifyClientCredentials(client_id = self.Client_ID, client_secret = self.Client_Secret)
            self.spotify = spotipy.Spotify(client_credentials_manager = client_credentials_manager)

            if(self.spotify != None):
                 print('Authenticated!')
        except:
            print('Could not authenticate, please check the authentication keys!')

    def findTrack(self, SearchValue):
        self.authenticate()

        if(self.spotify != None):
            # Get the first track based on the title.
            result = self.spotify.search(q=SearchValue, type='track', limit=1,offset=1)

            # Get the link from the track searched by title from the dictionary.
            return result['tracks']['items'][0]['external_urls']['spotify']
        else:
            return self.spotify

if __name__ == "__main__":
    instance = SpotifyTrack()
    track = instance.findTrack(SearchValue='Five Finger Death Punch: Menace')
    print(track)