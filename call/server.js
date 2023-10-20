import express from "express";
const app = express();
import { createEndpoint } from "@jambonz/node-client-ws";
// Create a Jambonz endpoint using the Express server
const makeService = createEndpoint({ server: app });

// Create a Jambonz application listening for requests with URL path '/hello-world'
const svc = makeService({ path: "/hello-world" });

// Listen for new calls to that service

svc.on("session:new", (session) => {
  // The 'session' object has all of the properties of the incoming call
  console.log({ session }, `new incoming call: ${session.call_sid}`);

  // Set up some event handlers for this session
  session
    .on("close", onClose.bind(null, session))
    .on("error", onError.bind(null, session));

  // All of the Jambonz verbs are available as methods on the session object
  // https://www.jambonz.org/docs/webhooks/overview/
  session
    .pause({ length: 1.5 })
    .say({
      text: "Hello there, You have reached peace pal. How can we assist you today?",
    })
    .pause({ length: 0.5 })
    .hangup()
    .send(); // sends the queued verbs to Jambonz
});

const onClose = (session, code, reason) => {
  console.log({ session, code, reason }, `session ${session.call_sid} closed`);
};

const onError = (session, err) => {
  console.log({ err }, `session ${session.call_sid} received error`);
};

// Start the Express server

app.get("/", (req, res) => {
  res.send("Hello PeacePal");
});

app.get("/hello-world", (req, res) => {
  res.send(
    "Hello there, You have reached peace pal. How can we assist you today?"
  );
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
