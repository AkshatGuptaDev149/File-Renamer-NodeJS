//declaring variables fs library is used for file renaming and readline is used for user prompt

const fs = require('fs');
const { resolve } = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});






//Tell the path of the folder in which the files to be renamed reside.Give it in 'string'
let Directory=`D:/anime videos/Spy classroom/Season1`
if( Directory[Directory.length-1]== '/' ){Directory=Directory.slice(0,Directory.length-1)}
//Tell what you wanna replace here
const replaceThis='kutta';
const replaceWith='Classroom'; 




//preview so that we can make sure we renamed correctly.Without Preview we may rename a lot of files incorrectly by mistake.
function askPreview(){
    return new Promise((resolve)=>{
        rl.question('Do you want to preview first(y/n)?',(answer)=>{
            if(answer=='y'){resolve(true)}
            else if(answer=='n'){resolve(false)}
            else{console.log('Invalid output:Answer only y or n.For now we are just previewing');resolve(true)}
        })})
}




//replace function using fs pakage of node

async function Replace(){
    let preview=await askPreview()
    try{
        fs.readdir(Directory,(err,data)=>{
            console.log('\n Files present here are '+ [...data])
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
                let oldFile=Directory+'/'+item;
                let newFile=Directory+"/"+ item.replaceAll(replaceThis,replaceWith)
                if(!preview){
                    fs.rename(oldFile,newFile,()=>{
                        console.log("rename Success");
                    })
                }
                else{
                    if(oldFile !== newFile){
                        console.log(oldFile + " will be renamed to "+newFile)
                    }
                    else{
                        console.log('Nothing to rename in File number '+(index+1))
                    }
                }
            }
        })
        rl.close()
        
    }
    catch(err){
        console.log(err)
    }
}

//Invoking the main function
Replace()