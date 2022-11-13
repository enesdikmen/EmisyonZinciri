const ethConnect = require('../utils/ethConnect')
const ethers = require('ethers')
const ETaddress = "0x7eABb6650c24c04dfDD041d8c4a08739421Bc1eE";
const {output} = require('../artifacts/EmissionTracker_metadata.json')

const PK = "be27877246edf73d38d5b9417ab08bb6cf072a6871e2f6affce6f068a38803f3"
const suspectedEmission = async(
  tracker, emissionPointId, blocknum, event
) =>{
  const provider =  ethConnect()
  const signer = new ethers.Wallet(PK, provider)
  console.log(await signer.getAddress())

  const contract = new ethers.Contract(
    ETaddress, output.abi, signer)

  console.log(event);
  
  const {from} = await event.getTransaction()
  console.log('from', from)

  const tResponse = await contract.designateCheckers(
    ["0x3E652CB4De60BBAe55fce35B523d267763AF2425"],
    from,
    blocknum
  )
}

module.exports = suspectedEmission