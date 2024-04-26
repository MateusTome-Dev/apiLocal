const { rejects } = require('assert');
const fs = require ('fs');
const path = require('path');
const { getContact } = require('../controller/locationController');
const fileName = 'dbLocation.json';
const filePath = path.join(__dirname, "..", "database", fileName);
const fileName2 = 'dbContact.json';
const filePath2 = path.join(__dirname, "..", "database", fileName2);
class locationModel{
    static async getLocation(){
        return new Promise((resolve,reject) => {
            fs.readFile(filePath, 'utf8', (err,data ) =>{
                if(err){
                    if(err.code === "ENOENT"){
                        this.writeLocationToFile([])
                        return []; 
                    }else{
                        reject(err);
                    }
                } else{
                    resolve(JSON.parse(data));
                }
            });
        });
    }
 
    static async writeLocationToFile(location){
        return new Promise ((resolve, reject) => {
            fs.writeFile(filePath,JSON.stringify(location), (err) => {
                if (err) reject(err);
                console.log(`Data written to fie: ${filePath}`);
                resolve(this.getAllLocation());
            });
        });
    }
 
    static async getAllLocation(){
        const locations = await this.getLocation();
        return locations
    }
}

    
module.exports = locationModel;