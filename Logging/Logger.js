const {writeFile, WriteStream}  = require(`node:fs`);

class FileLogger
{

    constructor(){

    }

    /**
     *
     * @param {String} message      Error Message to be put in
     * @param {String} errorFile    Error File to be written to
     */
    static async WriteError(message, errorFile){

        await writeFile(errorFile, message, err =>{
            if (err){
                console.error(err);
            }
            else
            {

                console.log("File Written Successfully");
            }
        });
    }
}