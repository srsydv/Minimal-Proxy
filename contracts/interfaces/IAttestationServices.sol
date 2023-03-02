// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

interface IAttestationServices {
    function register(bytes calldata schema) external returns (bytes32);
}
