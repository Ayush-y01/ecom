const { processJob } = require('../queues/simpleQueue')

async function startWorker() {
    console.log(" email worker start");
    
    while(true){
        const job = await processJob()
        console.log("processJob ", job);
        
        await new Promise(res => setTimeout(res, 2000))

        console.log("Job Done");
        
    }
}

startWorker()