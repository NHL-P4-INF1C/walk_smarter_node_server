const express = require("express");
const bodyParser = require("body-parser");
const { createHash } = require("crypto");

const pocketbaseClient = require("../pocketbase/pocketbaseClient");

const app = express();

const PORT = process.env.PORT || 3000;
const DEV_ENV = process.env.DEV_ENV === "DEVELOPMENT";

async function main()
{
  if (!DEV_ENV)
  {
    try
    {
      await pocketbaseClient.loginAsAdmin();

      const oldHash = await pocketbaseClient
        .getClient()
        .collection("api")
        .getList(1, 1, { sort: "-created" });

      const data = {
        hash: createHash("sha256")
          .update(`${oldHash.items[0].hash}${oldHash.items[0].id}`)
          .digest("hex"),
      };

      const record = await pocketbaseClient
        .getClient()
        .collection("api")
        .create(data);

      const requestAuthentication =
        require("../middleware/requestAuthentication")(record.hash);

      app.use("/api", requestAuthentication);

      await pocketbaseClient.logoutAdmin();
    }
    catch (error)
    {
      console.log(error);
    }
  }
  else
  {
    const requestAuthentication =
      require("../middleware/requestAuthentication")("dev-hash");
    app.use("/api", requestAuthentication);
  }

  const apiRoutes = require("../routes/openai");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, () =>
  {
    if (DEV_ENV)
    {
      console.log("Detected development environment!");
    }
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();
