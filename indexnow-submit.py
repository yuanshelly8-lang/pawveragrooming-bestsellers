# Run only after the site is live.
import json, urllib.request
HOST='pawveragrooming.com'
KEY='8fd7c27f523a379f37f6c0c2026b6977'
KEY_LOCATION=f'https://{HOST}/{KEY}.txt'
with open('indexnow-urls.txt',encoding='utf-8') as f:
    urls=[line.strip() for line in f if line.strip()]
payload=json.dumps({'host':HOST,'key':KEY,'keyLocation':KEY_LOCATION,'urlList':urls}).encode('utf-8')
req=urllib.request.Request('https://api.indexnow.org/indexnow',data=payload,headers={'Content-Type':'application/json; charset=utf-8'})
with urllib.request.urlopen(req,timeout=30) as response:
    print('IndexNow status:',response.status)
