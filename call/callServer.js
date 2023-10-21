import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Simulated data
const users = [{ id: 1, name: "John Doe", phone: "+12564084013" }];

const partners = [
  { id: 1, name: "Mubarak", assignedPhone: "+2348162577778" },
  { id: 2, name: "mubarak", assignedPhone: "mubarak" },
];

const calls = [];

// function getCallByUserIdAndSessionId(userId, sessionId) {
//   return calls.find(
//     (call) => call.userId === userId && call.sessionId === sessionId
//   );
// }

// Simulated qa_chain function
// function qa_chain(transcript, history, partnerName) {
//   // Simulated QA logic, replace with your actual implementation
//   return `Simulated answer for "${transcript}" with history: ${history} from ${partnerName}`;
// }

// const platformAuthRequired = (req, res, next) => {
//   const platform = req.header("platform");

//   if (platform !== "jambonz") {
//     return res.status(401).send("Unauthorized");
//   }

//   next();
// };

app.post("/call/initialize", (req, res) => {
  if (true) {
    const { call_id, from, to } = req.body;
    const user = users.find((u) => u.phone === from);
    if (!user) {
      return res.json([
        {
          verb: "say",
          text: "Hello, this is peace pal. Our call feature is currently under development, but we will make sure we let you know when our call feature becomes available to users! Thank you. ",
          // text: audio.play(),
        },
      ]);
    }
    const partner = partners.find((p) => p.assignedPhone === to);
    const answer = `Good day ${
      user.name.split(" ")[0]
    }, how may I assist you today?`;
    calls.push({
      userId: user.id,
      partnerId: partner.id,
      sessionId: call_id,
      question: "Hello",
      answer: answer,
    });
    return res.json([
      {
        verb: "gather",
        say: {
          text: answer,
        },
        input: ["speech"],
        actionHook: "/call/inprogress",
        timeout: 15,
      },
    ]);
  } else {
    // Handle other logic for different platforms
    return res.send("Not implemented for other platforms");
  }
});

app.post("/call/inprogress", (req, res) => {
  if (req.body.g.platform.name.toLowerCase() === "jambonz") {
    const { call_id, from, to, speech } = req.body;
    const user = users.find((u) => u.phone === from);
    const partner = partners.find((p) => p.assignedPhone === to);
    const alternatives = speech.alternatives || [];
    let answer = "Sorry, could you repeat that please?";

    for (const alternative of alternatives) {
      const confidence = alternative.confidence;
      if (confidence >= 0.7) {
        const history = getCallByUserIdAndSessionId(user.id, call_id);
        answer = qa_chain(alternative.transcript, history, partner.name);
        calls.push({
          userId: user.id,
          partnerId: partner.id,
          sessionId: call_id,
          question: alternative.transcript,
          answer: answer,
        });

        if (
          answer.toLowerCase().includes("take care") ||
          answer.toLowerCase().includes("bye")
        ) {
          return res.json([
            {
              verb: "say",
              text: answer,
            },
            {
              verb: "hangup",
            },
          ]);
        }

        return res.json([
          {
            verb: "gather",
            say: {
              text: answer,
            },
            input: ["speech"],
            actionHook: "/call/inprogress",
            timeout: 15,
          },
        ]);
      }
    }
  } else {
    // Handle other logic for different platforms
    return res.send("Not implemented for other platforms");
  }
});

app.post("/call/status", (req, res) => {
  return res.send("");
});

app.get("/", (req, res) => {
  res.send("Hello Express App");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
