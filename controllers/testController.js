const testUserController = (req,res) =>{
    try{
        res.status(200).send({
            success: true,
            message:'test user data api'
        })
    }catch{(error)
        console.log("error test Api ",error);
    }
};


module.exports = {testUserController};