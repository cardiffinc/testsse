const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const { count } = req.query;
    if(!count) return res.status(500).json({ error: 'Count is required' });
      res.writeHead(200, {
        "Content-Type":"text/event-stream",
        "Connection":"keep-alive",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Headers": '*'
      });
      res.write("event: Starting Stream Now!\n");
  
      countdown(res, count)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


function countdown(res, count) {
    res.write("event: counting\ndata: " + count + "\n\n")
    if (count)
        setTimeout(() => countdown(res, count - 1), 1000)
    else
        res.end()
}
