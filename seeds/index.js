const users = require('./users');
const {User} = require('../models');
const sequelize = require('../config/connection');

// Create db data by running seeder
const seeder = async () => {
    await sequelize.sync({force: true});
    await User.bulkCreate(users, {
        individualHooks: true,
    });
    process.exit(0);
};

(async () => {
    await seeder();
})();