// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const { Web3 } = require("web3");
const { StringStorageABI, StringStorageAddress } = require("./config"); // Update with your ABI and contract address

const app = express();
app.use(bodyParser.json());

// Initialize Web3 with your provider
const web3 = new Web3("http://127.0.0.1:7545"); // Replace with your provider URL

// Create a contract instance
const contract = new web3.eth.Contract(StringStorageABI, StringStorageAddress);

let contractInstance;

web3.eth
  .getAccounts()
  .then((accounts) => {
    contractInstance = contract; // Use this instance to interact with the contract
    console.log("Contract instance created");
  })
  .catch((err) => console.error(err));

app.post("/setString", async (req, res) => {
  const { string } = req.body;
  try {
    const accounts = await web3.eth.getAccounts();
    await contractInstance.methods
      .setString(string)
      .send({ from: accounts[0] });
    res.send("String stored successfully");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/getString", async (req, res) => {
  try {
    const storedString = await contractInstance.methods.getString().call();
    res.send(storedString);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
