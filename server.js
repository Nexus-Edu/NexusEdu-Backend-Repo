// Server Creation

const cors = require("cors")
const express = require('express')

const app = express()
app.use(express.json())
app.use(cors())


// Port
const PORT = 5000;

// Default Route
app.get('/', (req, res) => {
    res.status(200).json({"message" : "Success, Thank you for using the NexusEdu API"});
})

// Routers
const userRouter = require('./Routers/userRouter')
const userAccountRouter = require('./Routers/userAccountRouter')
const discussionRouter = require('./Routers/discussionBoardRouter')
const programRouter = require('./Routers/programsRouter')
const commentsRouter = require('./Routers/commentsRoute')

app.use('/user', userRouter)
app.use(userAccountRouter)
app.use('/board', discussionRouter)
app.use('/program', programRouter)
app.use("/comments",commentsRouter); 


app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}/`)
})