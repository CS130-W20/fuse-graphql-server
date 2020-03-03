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
async function events(parent, { association, status }, context) {
  // TODO add association support
  const userId = await getUserId({ context });
  let eventList = [];

  if (association.includes('OWNER')) {
    const ownerEvents = await context.prisma.events({
      where: {
        AND: [
          {
            owner: {
              id: userId,
            },
          },
          {
            status_in: status,
          },
        ],
      },
    });

    eventList = eventList.concat(ownerEvents);
  }

  if (association.includes('INVITED')) {
    const invitedEvents = await context.prisma.events({
      where: {
        AND: [
          {
            invited_some: {
              id: userId,
            },
          },
          {
            status_in: status,
          },
        ],
      },
    });

    eventList = eventList.concat(invitedEvents);
  }

  if (association.includes('JOINED')) {
    const joinedEvents = await context.prisma.events({
      where: {
        AND: [
          {
            joined_some: {
              id: userId,
            },
          },
          {
            status_in: status,
          },
        ],
      },
    });

    eventList = eventList.concat(joinedEvents);
  }

  return eventList;
}

export default {
  ownedEvents,
  events,
};
