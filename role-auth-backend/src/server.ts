import app from "./app";
const PORTNO = process.env.PORTNO || 6969

app.listen(PORTNO,()=>console.log(`Server running at port No :-> ${PORTNO}`))