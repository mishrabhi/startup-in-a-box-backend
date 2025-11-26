import bcrypt from "bcryptjs";
import User from "../models/User";
import Tenant from "../models/Tenant";
import Plan from "../models/Plan";
import { generateToken } from "../utils/generateToken.js";
import slugify from "slugify";

//Register User
export async function register(req, res) {
  try {
    const { name, email, password, tenantName, role } = req.body;

    //required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password is required" });
    }

    //Find if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    //Creating tenant if tenantName provided
    let tenant = null;
    if (tenantName) {
      const slug = slugify(tenantName, { lower: true, strict: true });
      //creating tenant with default names
      tenant = await Tenant.create({
        name: tenantName,
        slug,
      });

      //Create User
      const user = await User.create({
        name,
        email,
        password: hashed,
        role: role || "USER",
        tenantId: tenant ? tenant._id : null,
      });

      if (tenant) {
        tenant.ownerId = user._id;
        await tenant.save();
      }

      //generate token
      const token = generateToken({
        id: user._id,
        role: user.role,
        tenantId: user.tenantId,
      });

      //send the response
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          tenantId: user.tenantId,
        },
        token,
      });
    }
  } catch (error) {
    console.error("error");
    res.status(500).json({ message: "Internal Server Error" });
  }
}
