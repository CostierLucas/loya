import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./RewardNft.sol";

contract FactoryERC721 {
    address[] public tokens;

    event ERC721Created(address owner, address tokenContract);
    
    function deployERC721(
        address _registry,
        address _implementation,
        address _business,
        uint256 _minimumPoints,
        string memory _name,
        string memory _symbol
    ) public returns (address) {
        RewardNft t = new RewardNft(
            _business,
            _registry,
            _implementation,
            _minimumPoints,
            _name,
            _symbol
        );
        tokens.push(address(t));
        emit ERC721Created(msg.sender,address(t));
        return address(t);
    }
}