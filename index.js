const {ethers} = require('ethers')
const ethConnect = require('./utils/ethConnect')
const {output} = require('./artifacts/EmissionTracker_metadata.json')
const suspectedEmission = require('./listener/suspectedEmission')

const provider =  ethConnect()

const ETaddress = "0x7eABb6650c24c04dfDD041d8c4a08739421Bc1eE";

const contract = new ethers.Contract(
  ETaddress, output.abi, provider)

contract.on("SuspectedEmission", suspectedEmission);


setTimeout(()=>{
  console.log('Total listener count:', provider.listenerCount())
}, 3000)