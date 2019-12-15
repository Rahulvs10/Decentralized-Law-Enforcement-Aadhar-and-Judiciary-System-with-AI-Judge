const userModel = require("../models/userModel")
const bcrypt = require("bcrypt-nodejs")
const query = require("../blockChain/query")
const txObject = require("../blockChain/invoke")
showLogin = (req, res) => {
    res.render("login",{title:"Login",error:"",success:""})
}

showRegister = (req,res) =>{
    res.render("register",{
        title : "Register",
        error : "",
        success: ""
    })}

getAllCases = async (req,res) => {
    output = await query.queryFunc("queryAllCase",[""])
    res.json(output)
    res.status(200)
}

getCase = async (req,res) => {
    output = await query.queryFunc("queryCase",[req.body.caseId])
    res.json(output)
    res.status(200)
}

addCase = async (req,res) => {
    caseId = "CASE"+req.body.id;
    output = await txObject.transaction("createCase",[caseId,req.body.caseNo,req.body.dateFiled,req.body.stationCode,req.body.accusedName,req.body.victimName,req.body.copIncharge]);
    return res.status(200).jsonp({"message":"Success"})
    
}
addUser = (req,res) => {
    userModel.findOne({
        email: req.body.email,
    }).then(doc => {
        if (doc) {
            return res.render("register",{
                title : "Register",
                error : "Already Registered",
                success: ""
            })
        }

        let newUser = new userModel({
            email: req.body.email,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password),
            token: ""
        });
        newUser.save().then(doc => {
            return res.redirect("/")
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).jsonp({message: "Registration Failed, try again later.", status_code: 500});
    });
}

loginUser = async (req,res) => {
    if (req.body.email && req.body.password) {
        let db = await userModel.findOne({email:req.body.email})
        if(db==null){
            return res.render("login",{title:"Login",error:"User not found",success:""})
        } else{
            if (bcrypt.compareSync(req.body.password,db.password)) {
                //addauthentication or sessoin
                return res.render("login",{title:"Login",error:"",success:"Logged in"})
            }
        }
    } else {
        return res.status(400).json({message: "Required Fields are empty", status_code: 400});
    }
}

module.exports= {
    showLogin,
    showRegister,
    addUser,
    loginUser,
    getAllCases,
    addCase,
    getCase,
}