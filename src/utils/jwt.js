const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Usually I keep the token between 5 minutes - 15 minutes
function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '5m',
  });
}

function generateRefreshToken() {
  const token = crypto.randomBytes(16).toString('base64url');
  return token;
}

function generateTokens(user) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();
  return { accessToken, refreshToken };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
