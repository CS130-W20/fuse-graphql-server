import { AuthenticationError } from 'apollo-server';
import {
  getUserId,
  mergeListsByUpdateTime,
} from '../utils';
import {
  EVENT_STATUS,
  ASSOCIATION,
} from '../constants';

async function events(parent, { association, status }, context) {
  const currentUserId = await getUserId({ context });

  if (currentUserId !== parent.id) {
    throw new AuthenticationError('Not authorized to fetch other user events');
  }

  const userId = parent.id;
  let ownerEvents = [];
  let invitedEvents = [];
  let joinedEvents = [];

  if (association.includes(ASSOCIATION.owner)) {
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

  if (association.includes(ASSOCIATION.invited)) {
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

  if (association.includes(ASSOCIATION.joined)) {
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
  const requestingUserId = await getUserId({ context });

  // Can only view your own owned events
  if (requestingUserId !== parent.id) {
    throw new AuthenticationError('Not authorized to view owned events');
  }

  return events(parent, {
    association: [ASSOCIATION.owner],
    status: [EVENT_STATUS.set, EVENT_STATUS.lit, EVENT_STATUS.completed],
  }, context);
}

export default {
  events,
  ownedEvents,
};
