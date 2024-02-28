import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async(req, res) => {
    try{
        const admins = await User.find({role: "admin"}).select("-password");
        res.status(200).json(admins);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Aggregate call, similar like SQL joins 
export const getUserPerformance = async(req, res) => {
    try {
        const { id } = req.params;

        const userWithStats = await User.aggregate([
            { $match: {_id: new mongoose.Types.ObjectId(id) }}, // matching the userId with Mongoose data of that id in Mongoose data format
            { $lookup : {
                from: "affiliatestats",
                localField: "_id",
                foreignField: "userId",
                as: "affiliateStats",
               },
            },
            { $unwind: "$affiliateStats"}  //flatten the array/object
        ]);

        const saleTransations = await Promise.all (
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
                return Transaction.findById(id)
            })
        );

        const filteredSaleTransactions = saleTransations.filter( 
            (transaction) => transaction !== null 
        
        );

        res
            .status(200)
            .json({ user: userWithStats[0], sales: filteredSaleTransactions });

    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}



