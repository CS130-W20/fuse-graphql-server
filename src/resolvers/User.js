import { getUserId } from '../utils';

async function ownedEvents(parent, args, context) {
  return context.prisma.events({
    where: {
      owner: {
        id: parent.id,
      },
    },
  });
}

// eslint-disable-next-line no-unused-vars
async function events(parent, { userId, association, status }, context) {
  // TODO add association support
  let queryUserId;

  if (userId == null) {
    queryUserId = await getUserId({ context });
  }

  return context.prisma.events({
    where: {
      AND: [
        {
          OR: [
            {
              owner: {
                id: queryUserId,
              },
            },
            {
              joined_some: {
                id: queryUserId,
              },
            },
          ],
        },
        {
          status_in: status,
        },
      ],
    },
  });
}

export default {
  ownedEvents,
  events,
};
