const express = require('express');
const bookingsRouter = require('./routers/routers');

const PORT = 4000;
const app = express();

app.use('/api', bookingsRouter);


app.get('test', (req, res)=> {
    console.log(234)
})
app.listen(PORT, ()=> {
    console.log(`Start on ${PORT}...`)
});

