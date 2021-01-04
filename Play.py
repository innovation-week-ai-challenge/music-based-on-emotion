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

# Set the variables from the .env file.
Client_ID = os.getenv('CLIENT_ID')
Client_Secret = os.getenv('Client_SECRET')

SearchValue = 'Lose%20Yourself'

try:
    # Authenticate on spotify developer (App)
    client_credentials_manager = SpotifyClientCredentials(client_id=Client_ID, client_secret=Client_Secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    print('Authenticated!')
except:
    print('Could not authenticate, please check the authentication keys!')

# Get the first track based on the title.
track_results = sp.search(q=SearchValue, type='track', limit=1,offset=1)

# Get the link from the track searched by title from the dictionary.
link = track_results['tracks']['items'][0]['external_urls']['spotify']
print(link)