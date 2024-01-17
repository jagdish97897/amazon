const connection = require("../Model/model");


const addSubCategory = async(req, res)=>{
    try{
        let sqlQuery = "insert into product set?";
        let data = {
            cid: req.body.cid,
            pid: req.body.pid,
            pname: req.body.pname,
            pprice:req.body.pprice,
            pimage:req.body.pimage
            
        }

        await connection.query(sqlQuery, data, function(error, result){
            if(error){
                console.log("error", error.sqlMessage)
            }
            else{
                res.json(result)
            }
        })

    }catch(error){
        console.log("error found...")
    }
};



const getSubCategories = async (req, res) => {
    try {
        const sqlQuery = "SELECT * FROM product";

        await connection.query(sqlQuery, (error, results) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ error: "Failed to fetch subcategories" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

const updateSubCategory = async (req, res) => {
    try {
        const { pid, pname, cid, pimage, pprice } = req.body;

        if (!pid || !pname || !cid) {
            return res.status(400).json({ error: "pid, pname, and pcategoryid are required fields" });
        }

        const sqlQuery = `
            UPDATE product
            SET pname = ?,
                cid = ?,
                pimage = ?,
                added = current_timestamp()
            WHERE subcategoryid = ?;
        `;
        const data = [subcategoryname, pcategoryid, photo, subcategoryid];

        await connection.query(sqlQuery, data, (error, result) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ error: "Subcategory update failed" });
            } else {
                res.status(200).json({ message: "Subcategory updated successfully", affectedRows: result.affectedRows });
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};


const findSubCategoryByName = async (req, res) => {
    try {
        const subcategoryname = req.params.subcategoryname;

        if (!subcategoryname) {
            return res.status(400).json({ error: "Subcategory name is required for search" });
        }

        const sqlQuery = "SELECT * FROM tbl_admin_sub_category WHERE subcategoryname = ?";
        const data = [subcategoryname];

        await connection.query(sqlQuery, data, (error, results) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ error: "Failed to retrieve subcategories" });
            } else {
                if (results.length === 0) {
                    return res.status(404).json({ error: "Subcategory not found" });
                }
                res.status(200).json(results);
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};






module.exports = { addSubCategory,getSubCategories,updateSubCategory,findSubCategoryByName};