#Solidity Code
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Mileage {

    struct MileageRecord {
        
        uint256 timestamp;
        uint256 fuelLevel;
        uint256 distanceTraveled;
    }
    
    uint public count;

    function get() public view returns (uint){
        return count;
    }

    function inc() public {
        count += 1;
    }

    function dec() public {
        count -= 1;
    }
    
    mapping(address => MileageRecord[]) public mileageRecords;
    mapping(address => uint256) public gasPrices;
    
    function addMileageRecord(uint256 _fuelLevel, uint256 _distanceTraveled) public {
        MileageRecord memory newRecord = MileageRecord({
            timestamp: block.timestamp,
            fuelLevel: _fuelLevel,
            distanceTraveled: _distanceTraveled
        });
        mileageRecords[msg.sender].push(newRecord);
    }
    
    function updateMileageRecord(uint256 _index, uint256 _fuelLevel, uint256 _distanceTraveled) public {
        require(_index < mileageRecords[msg.sender].length, "Invalid index");
        MileageRecord storage record = mileageRecords[msg.sender][_index];
        record.fuelLevel = _fuelLevel;
        record.distanceTraveled = _distanceTraveled;
    }
    
    function deleteMileageRecord(uint256 _index) public {
        require(_index < mileageRecords[msg.sender].length, "Invalid index");
        uint256 lastIndex = mileageRecords[msg.sender].length - 1;
        if (_index != lastIndex) {
            mileageRecords[msg.sender][_index] = mileageRecords[msg.sender][lastIndex];
        }
        mileageRecords[msg.sender].pop();
    }
    
    function setGasPrice(uint256 _price) public {
        gasPrices[msg.sender] = _price;
    }
    
    function getGasPrice() public view returns (uint256) {
        return gasPrices[msg.sender];
    }

    function getMileageRecordCount() public view returns (uint256) {
        return mileageRecords[msg.sender].length;
    }
    
    function getMileageRecord(uint256 _index) public view returns (uint256, uint256, uint256) {
        require(_index < mileageRecords[msg.sender].length, "Invalid index");
        MileageRecord memory record = mileageRecords[msg.sender][_index];
        return (record.timestamp, record.fuelLevel, record.distanceTraveled);
    }
    
    function calculateGasMileage(uint256 _index) public view returns (uint256) {
        require(_index < mileageRecords[msg.sender].length, "Invalid index");
        MileageRecord memory record = mileageRecords[msg.sender][_index];
        return (record.fuelLevel * 100) / record.distanceTraveled;
    }
    
    function calculateGasCost(uint256 _index) public view returns (uint256) {
        require(_index < mileageRecords[msg.sender].length, "Invalid index");
        MileageRecord memory record = mileageRecords[msg.sender][_index];
        uint256 gasPrice = gasPrices[msg.sender];
        return record.fuelLevel * gasPrice;
    }
}
```
