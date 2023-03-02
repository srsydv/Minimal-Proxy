async function main() {

    const AconomyFee = await ethers.getContractFactory("AconomyFee");
    const aconomyFee = await AconomyFee.deploy();
    await aconomyFee.deployed();

    const AttestationRegistry = await ethers.getContractFactory("AttestationRegistry");
    const attestationRegistry = await AttestationRegistry.deploy();
    await attestationRegistry.deployed();

    const AttestationServices = await ethers.getContractFactory("AttestationServices");
    const attestationServices = await AttestationServices.deploy(attestationRegistry.address);
    await attestationServices.deployed();



    const LibCalculations = await ethers.getContractFactory("LibCalculations");
    const libCalculations =  await LibCalculations.deploy();
    await libCalculations.deployed();

    const FundingPool= await hre.ethers.getContractFactory("FundingPool", {libraries: { LibCalculations: libCalculations.address } });
    const fundingPool = await FundingPool.deploy();
    await fundingPool.deployed();

    const LibPool = await ethers.getContractFactory("LibPool");
    const libPool =  await LibPool.deploy();
    await libPool.deployed();
  
    const poolRegistry= await hre.ethers.getContractFactory("poolRegistry", {libraries: { LibPool: libPool.address } });
  
    const PoolRegistry = await poolRegistry.deploy(attestationServices.address, aconomyFee.address, fundingPool.address);
    await PoolRegistry.deployed();
  
    console.log(fundingPool.address, "FundingPool contract address");
    console.log(PoolRegistry.address, "PoolRegistry contract address");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
    // npx hardhat run scripts/collection_deploy.js --network gorli
    // Output:-
  //   0xf4f2BC7c562A6f93A132513EA9aC1DDc26cBb37e Collection contract address
  // 0x0398E283FcDB46136c0ffc001592cd71eefaD731 Collection Factory contract address
  
  // npx hardhat verify COPY-PASTE-Collection Method-HERE --network gorli
  // npx hardhat verify COPY-PASTE-Collection Factory-ADDRESS-HERE --network gorli COPY-PASTE-Collection Method-HERE
  
//   npx hardhat verify 0x71d35419Da11c3B9516b9DFa4aE4303fac8e5851 --network gorli
  