import App from "./app";
import { connectDb } from "./dbConnection";
import dotenv from "dotenv";

dotenv.config();
process.env.TZ = "UTC";
const serverPort: any = process.env.PORT || 7000;

connectDb()
  .then(() => {
    App.start(serverPort);
    App.instance.listen(serverPort, function () {
      console.log(
        `App listening on environment:- ${process.env.NODE_ENV}//:${serverPort}`,
      );
    });
  })
  .catch((error) => {
    console.log("error while connect to database", error);
  });
