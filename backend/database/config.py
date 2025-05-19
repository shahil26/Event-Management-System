
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus
import os

# uri = os.getenv("MONGO_URI").format(quote_plus(os.getenv("MONGO_USER")), quote_plus(os.getenv("MONGO_PASSWORD")))
uri = "mongodb+srv://USER:User123@project.zroupem.mongodb.net/?retryWrites=true&w=majority&appName=Project"

client = MongoClient(uri, server_api=ServerApi('1'))