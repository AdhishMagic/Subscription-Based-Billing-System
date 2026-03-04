const jwt = require('jsonwebtoken');
const config = require('../config');
const { userRepository } = require('../repositories');
const AppError = require('../utils/AppError');

class AuthService {
    generateAccessToken(user) {
        return jwt.sign(
            { id: user._id || user.id, email: user.email, role: user.role },
            config.jwt.accessSecret,
            { expiresIn: config.jwt.accessExpiry }
        );
    }

    generateRefreshToken(user) {
        return jwt.sign(
            { id: user._id || user.id },
            config.jwt.refreshSecret,
            { expiresIn: config.jwt.refreshExpiry }
        );
    }

    verifyAccessToken(token) {
        return jwt.verify(token, config.jwt.accessSecret);
    }

    verifyRefreshToken(token) {
        return jwt.verify(token, config.jwt.refreshSecret);
    }

    async register({ name, email, password, role }) {
        const existing = await userRepository.findByEmail(email);
        if (existing) throw AppError.conflict('Email already registered');

        const user = await userRepository.create({ name, email, password, role });
        const token = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        await userRepository.updateRefreshToken(user._id, refreshToken);

        return { user, token, refreshToken };
    }

    async login({ email, password }) {
        const user = await userRepository.findByEmail(email);
        if (!user) throw AppError.unauthorized('Invalid email or password');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw AppError.unauthorized('Invalid email or password');

        const token = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        await userRepository.updateRefreshToken(user._id, refreshToken);

        return { user: user.toJSON(), token, refreshToken };
    }

    async getMe(userId) {
        const user = await userRepository.findById(userId);
        if (!user) throw AppError.notFound('User not found');
        return user;
    }

    async logout(userId) {
        await userRepository.clearRefreshToken(userId);
    }

    async refreshTokens(oldRefreshToken) {
        let payload;
        try {
            payload = this.verifyRefreshToken(oldRefreshToken);
        } catch {
            throw AppError.unauthorized('Invalid or expired refresh token');
        }

        const user = await userRepository.findByEmail(
            (await userRepository.findById(payload.id))?.email
        );

        if (!user || user.refreshToken !== oldRefreshToken) {
            throw AppError.unauthorized('Refresh token mismatch');
        }

        const token = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        await userRepository.updateRefreshToken(user._id, refreshToken);

        return { token, refreshToken };
    }
}

module.exports = new AuthService();
