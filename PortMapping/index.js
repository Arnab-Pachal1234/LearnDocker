import express from 'express';

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}   );
app.get('/', (req, res) => {
   return res.json(
    {
        "message": "Hello World",
        "status": "success"
    })
});


/*
Requiremments:
1. Node.js (v24.14.0)
2. Express.js

*/