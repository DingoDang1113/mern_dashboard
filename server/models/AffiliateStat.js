// specific users info and join with sales info of that person 

import mongoose from "mongoose";

const AffiliateStatSchema = new mongoose.Schema(

    {
        userId: { type: mongoose.Types.ObjectId, ref: "User"}, 
        affiliateSales: {type: [mongoose.Types.ObjectId], ref: "Transaction",
        }


    }, 
    { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;