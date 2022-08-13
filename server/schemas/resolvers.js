const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {

    users: async() => {
      return User.find();
    },
    
    me: async (parent, args ,context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    

    // login: async (parent, { email, password }) => {
    //   const user = await User.findOne({ email });

    //   if (!user) {
    //     throw new AuthenticationError('No user found with this email address');
    //   }

    //   const correctPw = await user.isCorrectPassword(password);

    //   if (!correctPw) {
    //     throw new AuthenticationError('Incorrect credentials');
    //   }

    //   const token = signToken(user);

    //   return { token, user };
    // },
    // deleteBook: async (parent, { bookId }, context) => {
    //   if (context.user) {
    //     const updatedBooks = User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { savedBooks: { bookId }}},
    //       { new: true } 
    //     )
    //     return updatedBooks
    //   }
    // },
    // saveBook: async (parent, { bookToSave }, context) => {
    //   if (context.user) {
    //     const updateBooks = await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { savedBooks: bookToSave }},
    //       { new: true }
    //     ).poulate('savedBooks');
    //     return updateBooks;
    //   }
    //   throw new AuthenticationError('Please log in!');
    // } 
   },
};

module.exports = resolvers;