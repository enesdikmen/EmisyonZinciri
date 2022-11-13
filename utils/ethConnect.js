const {ethers} = require('ethers')

const INFURA_ID="ab2e4f6be6514348a3257d2a2a510444"
let cached = global.eth

if (!cached) {
  cached = global.eth = { provider: null }
}

// https://avalanche-fuji.infura.io/v3/ab2e4f6be6514348a3257d2a2a510444
function ethConnect () {
  if (cached.provider) {
    return cached.provider
  }
  else{
    cached.provider = new ethers.providers.JsonRpcProvider(
      "https://avalanche-fuji.infura.io/v3/ab2e4f6be6514348a3257d2a2a510444"
    )
      
    return cached.provider
  }
}

module.exports = ethConnect