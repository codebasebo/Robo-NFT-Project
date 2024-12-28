// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPuckNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string public baseTokenURI;
    address payable public withdrawWallet;
    mapping(address => uint256) public mintedPerWallet;
    mapping(uint256 => bool) public tokenIdToIsMinted;

    constructor() ERC721("RoboPucks", "RBS") Ownable(msg.sender) {
        mintPrice = 0.02 ether;
        maxSupply = 1000;
        maxPerWallet = 3;
        totalSupply = 0;
        //withdrawWallet = _withdrawWallet;
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenURI(string calldata _baseTokenURI) external onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(tokenIdToIsMinted[_tokenId] == true, "Token does not exist");
        return string(abi.encodePacked(baseTokenURI, Strings.toString(_tokenId), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success,) = withdrawWallet.call{value: address(this).balance}("");
        require(success, "Withdraw failed.");
    }

    function mint(uint256 _amount) external payable {
        require(isPublicMintEnabled, "Public mint is not enabled");
        require(totalSupply + _amount <= maxSupply, "Total supply exceeded");
        require(mintedPerWallet[msg.sender] + _amount <= maxPerWallet, "Max per wallet exceeded");
        require(msg.value >= mintPrice * _amount, "Insufficient funds");
        for (uint256 i = 0; i < _amount; i++) {
            uint256 tokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, tokenId);
            mintedPerWallet[msg.sender]++;
            tokenIdToIsMinted[tokenId] = true;
        }
    }
}
