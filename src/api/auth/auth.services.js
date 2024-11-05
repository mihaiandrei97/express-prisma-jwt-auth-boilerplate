const { db } = require('../../utils/db');
const { hashToken } = require('../../utils/hash');

// used when we create a refresh token.
function addRefreshTokenToWhitelist({ refreshToken, userId }) {
  return db.refreshToken.create({
    data: {
      hashedToken: hashToken(refreshToken),
      userId,
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    },
  });
}

// used to check if the token sent by the client is in the database.
function findRefreshToken(token) {
  return db.refreshToken.findUnique({
    where: {
      hashedToken: hashToken(token),
    },
  });
}

// soft delete tokens after usage.
function deleteRefreshTokenById(id) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
}

function revokeTokens(userId) {
  return db.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
}

module.exports = {
  addRefreshTokenToWhitelist,
  findRefreshToken,
  deleteRefreshTokenById,
  revokeTokens,
};
