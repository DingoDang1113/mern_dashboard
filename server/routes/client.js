import  express  from "express";
import { getProducts } from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);  //loading products from backend 
router.get("/customers", getCustomers);


export default router;