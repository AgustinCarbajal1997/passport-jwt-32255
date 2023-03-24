const User = require("../models/user");

class UserDao {
  async findOne(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async insertOne(newUser) {
    try {
      const newUsers = await User.create(newUser);
      return newUsers;
    } catch (error) {
      throw error;
    }
  }

  // de aca para abajo no hace falta para el ejemplo, solo a modo ilustrativo
  async find() {
    try {
      const users = await User.find({});

      return users;
    } catch (error) {
      throw error;
    }
  }

  async insertMany(usersInfo) {
    try {
      const newUsers = await User.insertMany(usersInfo);
      return newUsers;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(userId, productId) {
    try {
      const user = await User.findOne({ _id: userId });
      user.products.push({ product: productId });
      const response = User.updateOne({ _id: userId }, user);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteMany() {
    await User.deleteMany();
    throw "Usuarios eliminados";
  }
}

module.exports = UserDao;
