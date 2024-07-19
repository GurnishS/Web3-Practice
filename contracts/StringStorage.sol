// contracts/StringStorage.sol
pragma solidity ^0.8.0;

contract StringStorage {
    string private storedString;

    function setString(string memory _string) public {
        storedString = _string;
    }

    function getString() public view returns (string memory) {
        return storedString;
    }
}
