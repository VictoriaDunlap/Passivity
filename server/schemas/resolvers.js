const { AuthenticationError } = require('apollo-server-express');
const { User, Stocks } = require('../models/');
const { signToken } = require("../utils/auth");
// will need to import auth and User model 


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                return User.findById(context.user._id).populate('userPortfolio')
            }
        }
    }, 

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            const token = signToken(user);

            return {token, user};

        }, 
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if(!user) {
                throw new AuthenticationError('No user with this login found.')
            }

            const passwordAuth = await user.checkPassword(password);

            if(!passwordAuth) {
                throw new AuthenticationError('Incorrect Password.')
            }
            const token = signToken(user);
            
            return {token, user};

        }, 
        saveHolding: async (parent, {holdingData}, context) => {

            //if(context.user) {
                const stock = await Stocks.create({
                            ticker: holdingData.ticker,
                            holding: holdingData.holding,
                            value: holdingData.value
                })
                const updatedPortfolio = User.findOneAndUpdate(
                    { _id: context.user._id },
                    {$push: {
                        userPortfolio: stock
                    }},
                    {new: true}
                );
                
                return updatedPortfolio;

            //}
            
            //throw new AuthenticationError("Please log in first.");

        }
    }
};

module.exports = resolvers;