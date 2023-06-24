import app from "./index.js";
import * as dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT;
app.listen(port,() =>{
    console.log(` app listening on port http://localhost:${port}/api/v1/`);
})