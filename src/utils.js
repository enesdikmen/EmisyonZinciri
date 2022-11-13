function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

export function connectWallet() {
    sleep(2000)

    return new Promise((resolve, reject) => {
        if(true){   
            resolve({detail:'wallet connected', walletId:"ECX-12312"})

        }
        else{
            reject('cant connect to wallet')
        }
    })
}

export function waitFor(millisec) {
    return new Promise((resolve, reject) => {
        sleep(millisec)
        if(true){   
            resolve("success")

        }
        else{
            reject('cant connect to wallet')
        }
    })
}


export function test1(){
    console.log("test1 done");
}



