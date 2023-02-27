async function main() {
  const CollectionMethods = await ethers.getContractFactory("CollectionMethods");
  const collectionMethods = await CollectionMethods.deploy();
  await collectionMethods.deployed();

  const LibCollection = await ethers.getContractFactory("LibCollection");
  const libCollection =  await LibCollection.deploy();
  await libCollection.deployed();

  const CollectionFactory= await hre.ethers.getContractFactory("CollectionFactory", {libraries: { LibCollection: libCollection.address } });

  const collectionFactory = await CollectionFactory.deploy(collectionMethods.address);
  await collectionFactory.deployed();

  console.log(collectionMethods.address, "Collection Method contract address");
  console.log(collectionFactory.address, "Collection Factory contract address");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // npx hardhat run scripts/deploy.js --network gorli
  // Output:-
//   0xf4f2BC7c562A6f93A132513EA9aC1DDc26cBb37e Collection contract address
// 0x0398E283FcDB46136c0ffc001592cd71eefaD731 Collection Factory contract address

// npx hardhat verify COPY-PASTE-Collection Method-HERE --network gorli
// npx hardhat verify COPY-PASTE-Collection Factory-ADDRESS-HERE --network gorli COPY-PASTE-Collection Method-HERE


