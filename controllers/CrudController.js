const crudtbl = require('../models/blogTbl')

const fs = require('fs')

const index = async (req, res) => {
    try {
        let blogdata = await crudtbl.find({});
        if (blogdata) {
            return res.render('Blog-form', {
                blogdata,
                single: ""
            })
        }
        else {
            console.log("record not found");
            return false;
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

const addData = async (req, res) => {
    try {
        const { editid, name, discription } = req.body;
        if (editid) {
            if (req.file) {
                if (!name || !discription) {
                    console.log("fill all data");
                    return res.redirect('back')
                }
                else {
                    let dltimg = await crudtbl.findById(editid)
                    if (dltimg) {
                        fs.unlinkSync(dltimg.image);
                    }
                    else {
                        console.log("image not unlink");
                        return res.redirect('back')
                    }
                    let image = "";
                    if (req.file) {
                        image = req.file.path
                    }
                    let editdata = await crudtbl.findByIdAndUpdate(editid, {
                        name: name,
                        discription: discription,
                        image : image
                    })
                    if (editdata) {
                        console.log("Edit Done");
                        return res.redirect('/')
                    }
                    else {
                        console.log("Not Edited");
                        return false
                    }
                }
            }
            else {
                let image = "";
                let singledata = await crudtbl.findById(editid);
                if(singledata){
                    image = singledata.image;
                    let editdata = await crudtbl.findByIdAndUpdate(editid, {
                        name: name,
                        discription: discription,
                        image : image
                    })
                    if (editdata) {
                        console.log("Edit Done");
                        return res.redirect('/')
                    }
                    else {
                        console.log("Not Edited");
                        return false
                    }
                }
                else{
                    console.log("record not found");
                    return res.redirect('back')
                }
            }
        }
        else {
            if (!name || !discription) {
                console.log("Enter All Data");
                return res.redirect('/')
            }
            let image = "";
            if (req.file) {
                image = req.file.path
            }
            let data = await crudtbl.create({
                name: name,
                discription: discription,
                image: image
            })
            if (data) {
                console.log("Data Successfully Add");
                return res.redirect('back');
            }
            else {
                console.log(err);
                return res.redirect('back');
            }
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

const deletedata = async (req, res) => {
    try {
        let id = req.query.id;
        let dltimg = await crudtbl.findById(id)
        if (dltimg) {
            fs.unlinkSync(dltimg.image)
        }
        else {
            console.log("image not delete");
            return res.redirect('/')
        }
        let dltdata = await crudtbl.findByIdAndDelete(id)
        if (dltdata) {
            console.log("data deleted");
            return res.redirect('back');
        }
        else {
            console.log("data not delete");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return false
    }
}

const editdata = async (req, res) => {
    try {
        let id = req.query.id;
        let alldata = await crudtbl.find({})
        let single = await crudtbl.findById(id);
        if (single) {
            return res.render('Blog-Form', {
                single,
                blogdata: alldata
            })
        }
        else {
            console.log("record not found");
            return false;
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = {
    index,
    addData,
    deletedata,
    editdata
}