const BaseRepository = require('./BaseRepository');
const { User } = require('../models');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return this.model.findOne({ email }).select('+password +refreshToken');
    }

    async updateRefreshToken(userId, refreshToken) {
        return this.model.findByIdAndUpdate(userId, { refreshToken }, { new: true });
    }

    async clearRefreshToken(userId) {
        return this.model.findByIdAndUpdate(userId, { refreshToken: null });
    }
}

module.exports = new UserRepository();
