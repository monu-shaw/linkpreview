# Link Previewer By Monu Shaw
Made With pupeteer and cherio.
## Exclusive made Findcoder.io Challenge 
challenge link (https://www.findcoder.io/challenges)

## How To use 
npm i monu-linkpreview. 
```
import getLinkPreview from 'monu-linkpreview'; 

getLinkPreview(url).then(res=>log(res)).catch((err)=>console.log(err));
```
## Important 
It will Work In Node. \
You Need To Use an Api Call \
example (Used Express)
```
app.post('/',  async (req, res) => {
        try {
             await main(req.body.url).then(re=>res.send(re)).catch((er)=>res.send(er)));
        } catch (error) {
            res.send(`error ${error}`)
        }
})
```
Full Example Code Here (Soon)
## Demo Here

Here (https://linkpreview-alpha.vercel.app)