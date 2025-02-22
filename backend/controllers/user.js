
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    //check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }
    
    
    //validate password
    const isValidPassword = (password, name) => {
      const minLenght = 6,
        maxLength = 10;
      return (
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        /[\W_]/.test(password) &&
        password.length >= minLenght &&
        password.length <= maxLength &&
        !password.toLowerCase().includes(name.toLowerCase())
      );
    };

    if (!isValidPassword(password, name)) {
      return res.status(401).json({
        message:
          "Password must be 6-10 chars long, include uppercase, lowercase, digit, special character, and not contain your name.",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

   await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ msg: "Successfully signed up" });
  } catch (err) {
    return res.status(500).json({ msg: `Server error: ${err.message}` });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(401).json({ msg: "password not matched" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ msg: `server error ${err}` });
  }
};

export {
  signup,
  login,
};
