const {writeFile}  = require(`node:fs`);

class FileLogger
{
    writeStreamErrLocation = `..ErrorLogs/FileWriteErr.txt`

    constructor(){

    }

    /**
     *
     * @param {String} message      Error Message to be put in
     * @param {String} errorFile    Error File to be written to
     */
    static async WriteError(errMessage, errorFileLocation){

        await writeFile(errorFileLocation, errMessage, err =>{
            if (err){
                console.error(err);
                fstat.writeFile(writeStreamErrLocation, err);
            }
            else
            {

                console.log("File Written Successfully");
            }
        });
    }
}