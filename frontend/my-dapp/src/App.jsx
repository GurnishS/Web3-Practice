import React, { useState } from "react";
import Web3 from "web3";
import { StringStorageABI, StringStorageAddress } from "./config"; // Update the path as needed

function App() {
  const [storedString, setStoredString] = useState("");
  const [inputString, setInputString] = useState("");
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize Web3 with MetaMask provider
  const initWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        const contractInstance = new web3Instance.eth.Contract(
          StringStorageABI,
          StringStorageAddress
        );
        setWeb3(web3Instance);
        setContract(contractInstance);
        setAccount(accounts[0]);
      } catch (err) {
        setError("Failed to connect MetaMask.");
      }
    } else {
      setError("MetaMask is not installed.");
    }
  };

  // Set the string in the smart contract
  const handleSetString = async () => {
    setLoading(true);
    setError("");
    try {
      await contract.methods.setString(inputString).send({ from: account });
      setInputString("");
    } catch (err) {
      setError("Failed to set string.");
    }
    setLoading(false);
  };

  // Get the string from the smart contract
  const handleGetString = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await contract.methods.getString().call();
      setStoredString(result);
    } catch (err) {
      setError("Failed to get string.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>String Storage DApp</h1>
        <button onClick={initWeb3}>Connect MetaMask</button>
        <div>
          <input
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleSetString} disabled={loading}>
            Set String
          </button>
        </div>
        <div>
          <button onClick={handleGetString} disabled={loading}>
            Get Stored String
          </button>
          {loading ? <p>Loading...</p> : <p>{storedString}</p>}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
    </div>
  );
}

export default App;
