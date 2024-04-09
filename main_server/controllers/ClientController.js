const clientServices = require("../services/clientServices");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Fetch all clients (users) from the database
        const users = await clientServices.getAllClients();

        // Check if any user matches the provided credentials

        const authorizedUser = false;
        
        for(i = 0 ; i < users.length ;i++){
            if(users[i].email === email){
                bcrypt.compare(password,users[i].password,(err,result) => {
                    if(err){
                        res.status(500).json({error:"Something went wrong !"});
                    }
                    if(result){
                        res.status(200).render("index",{name:email});
                    }
                    else{
                        res.status(500).json({error:"Mot de passe incorrect."})
                    }
                })
            }
        }
    } catch (err) {
        console.error("Error in getUsers:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const registerUser = async (req,res) => {
    try{
        let authorized = true;
        let {email,password} = req.body; 
        const users = await clientServices.getAllClients();
        for(i = 0 ; i < users.length; i++){
            if(username === users[i].username || email === users[i].email){
                authorized = false;
                break;
            }
        }
        if(authorized){
            clientServices.addClient(username,email,password);
            res.status(200).render("index");
        }
        else{
            res.status(500).json("The userName or the email is already used");
        }

    }
    catch(err){
        res.status(500).json("something went wrong");
    }
}

module.exports = {
    registerUser,
    getUsers
}