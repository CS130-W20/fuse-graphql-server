import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import fetch from 'node-fetch';

const APP_SECRET = 'l1ght-Th3-4uz3';

async function getUserId({ context }) {
  const authorization = context.request.get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    return fetch(`https://graph.facebook.com/me?access_token=${token}&fields=name,email`)
      .then((response) => response.json())
      .then(async ({ email }) => context.prisma.user({ email }).id())
      .catch(() => {
        const { userId } = jwt.verify(token, APP_SECRET);
        return userId;
      })
      .catch(() => {
        throw new AuthenticationError('Not authenticated');
      });
  }
  throw new AuthenticationError('Not authenticated');
}

function createPairKey(selfUserId, userId) {
  return `${selfUserId}-${userId}`;
}

function incrementStatus(currentStatus) {
  switch (currentStatus) {
    case 'SET': {
      return 'LIT';
    }
    case 'LIT': {
      return 'COMPLETED';
    }
    default:
      return 'COMPLETED';
  }
}

function mergeListsByUpdateTime(eventListA, eventListB) {
  let merged = [];
  const lenA = eventListA.length;
  const lenB = eventListB.length;
  let iA = 0;
  let iB = 0;

  while (iA < lenA && iB < lenB) {
    const timeUpdatedA = Date.parse(eventListA[iA].updatedAt);
    const timeUpdatedB = Date.parse(eventListB[iB].updatedAt);

    if (timeUpdatedA > timeUpdatedB) {
      merged.push(eventListA[iA]);
      iA += 1;
    } else {
      merged.push(eventListB[iB]);
      iB += 1;
    }
  }

  if (iA < lenA) {
    merged = merged.concat(eventListA.slice(iA));
  }

  if (iB < lenB) {
    merged = merged.concat(eventListB.slice(iB));
  }

  return merged;
}

const millisInDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * millis
function daysDiff(start, end) {
  return Math.round(end - start) / millisInDay;
}

export {
  APP_SECRET,
  getUserId,
  createPairKey,
  incrementStatus,
  mergeListsByUpdateTime,
  daysDiff,
};
