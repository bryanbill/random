import { User } from './user';
import { Journal } from './journal';

Journal.hasOne(User, {
    sourceKey: "userId",
    foreignKey: "id",
});

User.hasMany(Journal, {
    sourceKey: "id",
    foreignKey: "userId",
});

export {
    User,
    Journal,
}