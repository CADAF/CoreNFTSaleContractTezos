from pydantic import BaseModel
import json
from pprint import pprint

import json
import os

import ipfshttpclient

from mimetypes import guess_type
from os.path import isfile
from typing import *

import uvicorn
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query
from starlette.staticfiles import StaticFiles
from fastapi import FastAPI


try:
    os.mkdir("./json")
except OSError as error:
    print(error)




def is_json(myjson):
    try:
        json.loads(myjson)
    except ValueError as e:
        return False
    return True


app = FastAPI(debug=True)



JSONObject = Dict[AnyStr, Any]


class NFT(BaseModel):
    name: Optional[str] = Query(..., description="NFT name")
    description: Optional[str] = Query(..., description="NFT description")
    image: Optional[str] = Query(..., description="main image file url")
    decimals: Optional[str] = Query(..., description="Amount of numbers after point (default 0")
    symbol: Optional[str] = Query(..., description="Collection symbol")



@app.post("/createNft")
async def get_body(input: NFT):
    client = ipfshttpclient.connect()  # Connects to: /dns/localhost/tcp/5001/http
    
    path = "NFT.json"
    if os.path.isfile(path):
        raise HTTPException(status_code=502, detail="Bad nft_id")

    jsonString = json.dumps(input.__dict__)

    with open("./json/" + path, 'wb') as f:
        f.write(jsonString.encode())

    res = client.add('./json/NFT.json')
    string = f"https://ipfs.io/ipfs/{res['Hash']}"
    return string 


app.mount("/json", StaticFiles(directory="json", html=False), name="json")

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=7777, debug=True)
