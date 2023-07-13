import './App.css';
import Web3 from "web3";
import Mileage from "./contracts/Mileage.json";
import React, { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [index, setIndex] = useState(0);
  const [fuel, setFuel] = useState(0);
  const [distance, setDistance] = useState(0);
  const [record1, setRecord1] = useState("");
  const [record2, setRecord2] = useState("");
  const [gasCost, setGasCost] = useState("");
  const [mileage, setMileage] = useState("");
  const [gasCost1, setCost] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const ganacheProvider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        const web3Instance = new Web3(ganacheProvider);

        const chainId = await web3Instance.eth.getChainId();
        console.log("Chain ID:", chainId);

        const accounts = await web3Instance.eth.getAccounts();
        console.log("Accounts:", accounts);
        setAccount(accounts[0]);

        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = Mileage.networks[networkId];
        const systemContract = new web3Instance.eth.Contract(
          Mileage.abi,
          deployedNetwork && deployedNetwork.address,
        );
        setContract(systemContract);
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  const handleAddRecord = async () => {
    try {
      await contract.methods.addMileageRecord(fuel, distance).send({ from: account, gas: '1000000' });
      const newCount = await contract.methods.getMileageRecordCount().call({ from: account, gas: '1000000' });
      const newRecord = await contract.methods.getMileageRecord(0).call({ from: account, gas: '1000000' });
      setCount(newCount);
      const {0: strValue, 1: fuel1, 2: dist1} = newRecord;
      setRecord1(fuel1);
      setRecord2(dist1);
    } catch (error) {
      console.log(error);
    }
  }
  const handleUpdateRecord = async () => {
    try {
      await contract.methods.updateMileageRecord(index, fuel, distance).send({ from: account, gas: '1000000' });
      const newCount1 = await contract.methods.getMileageRecordCount().call({ from: account, gas: '1000000' });
      const newRecord1 = await contract.methods.getMileageRecord(index).call({ from: account, gas: '1000000' });
      setCount(newCount1);
      const {0: strValue, 1: fuel1, 2: dist1} = newRecord1;
      setRecord1(fuel1);
      setRecord2(dist1);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteRecord = async () => {
    try {
      await contract.methods.deleteMileageRecord(index).send({ from: account, gas: '1000000' });
      const newCount2 = await contract.methods.getMileageRecordCount().call({ from: account, gas: '1000000' });
      setCount(newCount2);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetRecord = async () => {
    try {
      const newCount1 = await contract.methods.getMileageRecordCount().call({ from: account, gas: '1000000' });
      const newRecord1 = await contract.methods.getMileageRecord(index).call({ from: account, gas: '1000000' });
      setCount(newCount1);
      const {0: strValue, 1: fuel1, 2: dist1} = newRecord1;
      setRecord1(fuel1);
      setRecord2(dist1);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetGasCost = async () => {
    try {
      const newRecord1 = await contract.methods.calculateGasCost(index).call({ from: account, gas: '1000000' });
      setGasCost(newRecord1);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetMileage = async () => {
    try {
      const newCount1 = await contract.methods.calculateGasMileage().call({ from: account, gas: '1000000' });
      setMileage(newCount1);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSetGasCost = async () => {
    try {
      await contract.methods.setGasPrice(gasCost1).send({ from: account, gas: '1000000' });
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <div className="frontend">
    <div className="title">
    <h1>&#60;Car Fuel Mileage Management System&#62;</h1>
    </div>
    <div className="flex-container">
      
    <div>
    <form onSubmit={handleAddRecord}>
      <fieldset>
        <label className="head">New Mileage Record</label>
        <label>Fuel Level: </label>
        <input onChange={e => setFuel(e.target.value)}/><br></br>
        <label>Distance Travelled: </label>
        <input onChange={e => setDistance(e.target.value)}/><br></br>
        <br></br>
        <div className="buttonHolder">
          <button type="submit">Add New Record</button>
        </div>
      </fieldset>
    </form>
    </div>

    <div>
      <form onSubmit={handleUpdateRecord}>
        <fieldset>
          <label className="head">Update Mileage Record</label>
          <label>Record Index: </label>
          <input onChange={e => setIndex(e.target.value)}/><br></br>
          <label>Fuel Level: </label>
          <input onChange={e => setFuel(e.target.value)}/><br></br>
          <label>Distance Travelled: </label>
          <input onChange={e => setDistance(e.target.value)}/><br></br>
          <div className="buttonHolder">
            <button type="submit">Update Record</button>  
          </div>
        </fieldset>
      </form>
    </div>

    <div>
      <form onSubmit={handleDeleteRecord}>
        <fieldset>
          <label className="head">Delete Mileage Record</label>
          <label>Record Index: </label>
          <input onChange={e => setIndex(e.target.value)}/><br></br>
          <br></br>
          <br></br>
          <div className="buttonHolder">
            <button type="submit">Delete Record</button>  
          </div>
        </fieldset>
      </form>
    </div>

    <div>
      <form onSubmit={handleGetRecord}>
        <fieldset>
          <label className="head">Get Mileage Record</label>
          <label>Record Index: </label>
          <input onChange={e => setIndex(e.target.value)}/><br></br>
          <br></br>
          <br></br>
          <div className="buttonHolder">
            <button type="submit">Get Record</button>
          </div>
        </fieldset>
      </form>
    </div>

    <div>
      <form onSubmit={handleGetMileage}>
        <fieldset>
          <label className="head">Get Mileage</label>
          <label>Record Index: </label>
          <input onChange={e => setIndex(e.target.value)}/><br></br>
          <br></br>
          <br></br>
          <div className="buttonHolder">
            <button type="submit">Get Gas Mileage</button>
          </div>
        </fieldset>
      </form>
      </div>

      <div>
      <form onSubmit={handleGetGasCost}>
        <fieldset>
          <label className="head">Get Gas Cost</label>
          <label>Record Index: </label>
          <input onChange={e => setIndex(e.target.value)}/><br></br>
          <br></br>
          <br></br>
          <div className="buttonHolder">
            <button type="submit">Get Total Gas Cost</button>  
          </div>
        </fieldset>
      </form>
      </div>

      <div>
      <form onSubmit={handleSetGasCost}>
        <fieldset>
          <label className="head">Set Gas Cost</label>
          <label>Set Cost: </label>
          <input onChange={e => setCost(e.target.value)}/><br></br>
          <br></br>
          <br></br>
          <div className="buttonHolder">
            <button type="submit">Set Gas Cost</button>  
          </div>
        </fieldset>
      </form>
      </div>
    </div>
    <br></br>
    <div className="data">
      <label>Mileage Count:</label><label className="dataLabel">{count}</label><br></br>
      <label>Mileage Record Fuel:</label><label className="dataLabel">{record1}</label><br></br>
      <label>Mileage Record Distance:</label><label className="dataLabel">{record2}</label><br></br>
      <label>Gas Cost:</label><label className="dataLabel">{gasCost}</label><br></br>
      <label>Mileage:</label><label className="dataLabel">{mileage}</label><br></br>
    </div>
    </div>
  );
}

export default App;