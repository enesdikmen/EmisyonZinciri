import {ethers} from 'ethers'
import EmissionTracker_metadata from './artifacts/EmissionTracker_metadata.json'

const contractAddress ='0x7eABb6650c24c04dfDD041d8c4a08739421Bc1eE'
let cached = global.contract

if (!cached) {
  cached = global.contract = { contract: null }
}

export default function contract() {
  if (cached.contract) {
    return cached.contract
  }
  else{
    cached.contract = new ethers.Contract(contractAddress, EmissionTracker_metadata.output.abi)
    return cached.contract
  }
}