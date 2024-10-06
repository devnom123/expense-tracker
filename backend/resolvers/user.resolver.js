import { users } from "../dummyData/data.js"

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
    Mutation: {
        signUp: async (_, { input }, context) => {
            try {
                const { username, password, name, gender } = input;
                if (!username || !password || !name || !gender) {
                    throw new Error("Please provide all the required fields");
                }
                const userExist = await User.findOne({ username });
                if (userExist) {
                    throw new Error("User already exist");
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                let profilePic;
                if (gender == "male") {
                    const boyProfilePic = "https://avatar.iran.liara.run/public/boy?username=${username}";
                    profilePic = boyProfilePic;
                }
                else {
                    const girlProfilePic = "https://avatar.iran.lia.run/public/girl?username=${username}";
                    profilePic = girlProfilePic;
                }
                const user = new User({
                    username,
                    password: hashedPassword,
                    name,
                    gender,
                    profilePicture: profilePic,
                });
                await user.save();
                await context.login(user);
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }

        },
        login: async (_, { input }, context) => {
            try {
                const { username, password } = input;
                if (!username || !password) {
                    throw new Error("Please provide all the required fields");
                }
                const { user } = await context.authenticate("graphql-local", { username, password });

                await context.login(user);
               
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        },
        logout: async (_, __, context) => {
            try {
                await context.logout();
                req.session.destroy((err)=>{
                    if(err) throw new Error(err.message);
                    res.clearCookie("connect.sid");
                });
                return { message: "Logout successfully" };
            }
            catch (error) {
                throw new Error(error.message);
            }
        },
    },
    Query: {
        authUser: async(_, __, context) => {
            const { user } = await context.getUser();
            return user;
        },
        user: async(_, {userId}) => {
            const user = await User.findById(userId);
            return user;
        },
    },
}

export default userResolver;