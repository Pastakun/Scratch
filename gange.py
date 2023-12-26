import requests
import asyncio
import websockets
import json

async def main():
    async def turbowarpwebsocket():
        while True:
            try:
                async with websockets.connect("wss://clouddata.turbowarp.org/") as turbowarpconnection:
                    await turbowarpconnection.send(json.dumps({"method":"handshake","user":"Pasta-kun","project_id":"943703930"}) + "\n")
                    print("turbowarp")
                    while True:
                        await turbowarpconnection.send(json.dumps({"method":"set","user":"Pasta-kun","project_id":"943703930","name": "☁ 1P","value": "0"}) + "\n")
                        asyncio.sleep(0.1)
            except websockets.WebSocketException as e:
                print(f"turbowarpwebsocket: {e}")
                await asyncio.sleep(3)
    turbowarpwebsocket = asyncio.create_task(turbowarpwebsocket())
    await turbowarpwebsocket

asyncio.run(main())