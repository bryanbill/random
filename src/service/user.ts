import { UserObj } from "../interface/user"

import { User } from "../model"


const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    return user?.dataValues;
}

const createUser = async (user: UserObj) => {
    const newUser = await User.create({
        ...user
    });
    return newUser.dataValues;
}

export default {
    getUserByEmail,
    createUser
}