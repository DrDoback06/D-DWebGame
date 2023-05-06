pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Item is ERC721 {
    uint256 private _tokenIdCounter;

    constructor() ERC721("Item", "ITM") {}

    function mintItem(address to) public {
        _tokenIdCounter += 1;
        _mint(to, _tokenIdCounter);
    }
}
