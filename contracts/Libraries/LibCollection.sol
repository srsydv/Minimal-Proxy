// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "../CollectionMethods.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

library LibCollection {
    function deployCollectionAddress(
        address _collectionOwner,
        address _piNFT,
        string memory _name,
        string memory _symbol,
        address _collectionImplemantation
    ) external returns (address) {
        address instance = Clones.clone(_collectionImplemantation);
        CollectionMethods(instance).initialize(
            _collectionOwner,
            _piNFT,
            _name,
            _symbol
        );

        return address(instance);
    }
}
