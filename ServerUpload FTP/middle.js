const ftp = require('ftp');
const middle=()=>{
    return (req,res,next)=>{
        const ftpClient = new ftp();
        console.log('In middle');
    const connectionOptions = {
        
      host: '127.0.0.1',  
      port: 14148,
      user: 'User1',
      password: 'iamsaif03'
    };
    const localFilePath = req.file.path;
    const remoteFilePath = ':h/';
    
    ftpClient.connect(connectionOptions);
    
    ftpClient.on('ready', () => {
        console.log('In ready')
      ftpClient.put(localFilePath, remoteFilePath, (error) => {
        if (error) {
          console.error(`Failed to upload file: ${error}`);
        } else {
          console.log('File uploaded successfully!');
        }
        ftpClient.end();
      });
    });
    
    }
}

module.exports=middle;