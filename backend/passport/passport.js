import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

import { GraphQLLocalStrategy, buildContext } from "graphql-passport";


export const passportConfig = () => {
    passport.serializeUser((user, done) => {
        console.log("serializeUser", user);
        done(null, user._id);
    });
    passport.deserializeUser(async(userId, done) => {
        console.log("deserializeUser", userId);
       try {
           const user = await User.findById(userId);
           done(null, user);
       }
       catch (error) {
           done(error);
       }
    })

    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    throw new Error("Invalid username or password");
                }
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }));
};