import React from 'react';
import mongoose from 'mongoose';


const TransactionSchema = new mongoose.Schema (
    {
        transactionId: String, 
            
    }, 
    {timestamps: true}
);

const Transactions = mongoose.model("Transactions", TransactionSchema);
export default Transactions;