import { Router, Request, Response } from "express";
import { getUserRentals, signin, signup } from "../controllers/userController";
const {
    checkDuplicateUsername,
    verifyToken,
} = require("../middleware/authentication");
const router = Router();

router.post("/signup", checkDuplicateUsername, signup);

router.post("/signin", signin);

router.get("/rentals/:id", verifyToken, getUserRentals);

// //check user token
// router.get("/", verifyToken, (req: Request, res: Response) => {
//     res.status(200).send("User Content.");
// });

export default router;
