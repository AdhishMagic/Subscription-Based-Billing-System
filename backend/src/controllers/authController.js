const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendCreated } = require('../utils/response');

const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    sendCreated(res, {
        user: result.user,
        token: result.token,
        refreshToken: result.refreshToken,
    }, 'Registration successful');
});

const login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    sendSuccess(res, {
        user: result.user,
        token: result.token,
        refreshToken: result.refreshToken,
    }, 'Login successful');
});

const getMe = asyncHandler(async (req, res) => {
    const user = await authService.getMe(req.user.id);
    sendSuccess(res, { user });
});

const logout = asyncHandler(async (req, res) => {
    await authService.logout(req.user.id);
    sendSuccess(res, null, 'Logged out successfully');
});

const refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken: oldToken } = req.body;
    const tokens = await authService.refreshTokens(oldToken);
    sendSuccess(res, tokens, 'Token refreshed');
});

const forgotPassword = asyncHandler(async (req, res) => {
    // Placeholder — in production integrate with email service
    sendSuccess(res, null, 'If the email exists, a reset link has been sent');
});

const resetPassword = asyncHandler(async (req, res) => {
    // Placeholder — in production validate token and update password
    sendSuccess(res, null, 'Password has been reset');
});

module.exports = {
    register,
    login,
    getMe,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
};
