import { getUserId, mergeListsByUpdateTime } from '../utils';

async function events(parent, { association, status }, context) {
  // TODO add association support
  const userId = await getUserId({ context });
  let ownerEvents = [];
  let invitedEvents = [];
  let joinedEvents = [];

  if (association.includes('OWNER')) {
    const fetchedOwnedEvents = await context.prisma.events({
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
      orderBy: 'updatedAt_DESC',
    });

    ownerEvents = ownerEvents.concat(fetchedOwnedEvents);
  }

  if (association.includes('INVITED')) {
    const fetchedInvitedEvents = await context.prisma.events({
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
      orderBy: 'updatedAt_DESC',
    });

    invitedEvents = invitedEvents.concat(fetchedInvitedEvents);
  }

  if (association.includes('JOINED')) {
    const fetchedJoinedEvents = await context.prisma.events({
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
      orderBy: 'updatedAt_DESC',
    });

    joinedEvents = joinedEvents.concat(fetchedJoinedEvents);
  }

  // Merge the 3 sorted lists to create one sorted list by update time
  const ownedAndInvitedEvents = mergeListsByUpdateTime(ownerEvents, invitedEvents);
  const eventList = mergeListsByUpdateTime(ownedAndInvitedEvents, joinedEvents);

  return eventList;
}

async function ownedEvents(parent, args, context) {
  return events(parent, { association: ['OWNER'], status: ['SET', 'LIT', 'COMPLETED'] }, context);
}

export default {
  events,
  ownedEvents,
};
