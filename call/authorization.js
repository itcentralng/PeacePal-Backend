import axios from "axios";

const url = "http://localhost:3000/call/initialize";
const headers = {
  platform: "jambonz",
};

axios
  .post(url, { headers })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.response.status);
  });

export default authorization;
