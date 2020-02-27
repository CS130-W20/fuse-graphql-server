module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateEvent {
  count: Int!
}

type AggregateFriendship {
  count: Int!
}

type AggregateNotification {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Event {
  id: ID!
  title: String!
  owner: User!
  status: EventStatus!
  invited(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  joined(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type EventConnection {
  pageInfo: PageInfo!
  edges: [EventEdge]!
  aggregate: AggregateEvent!
}

input EventCreateInput {
  id: ID
  title: String!
  owner: UserCreateOneWithoutOwnedEventsInput!
  status: EventStatus!
  invited: UserCreateManyInput
  joined: UserCreateManyInput
}

input EventCreateManyWithoutOwnerInput {
  create: [EventCreateWithoutOwnerInput!]
  connect: [EventWhereUniqueInput!]
}

input EventCreateWithoutOwnerInput {
  id: ID
  title: String!
  status: EventStatus!
  invited: UserCreateManyInput
  joined: UserCreateManyInput
}

type EventEdge {
  node: Event!
  cursor: String!
}

enum EventOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  status_ASC
  status_DESC
}

type EventPreviousValues {
  id: ID!
  title: String!
  status: EventStatus!
}

input EventScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  status: EventStatus
  status_not: EventStatus
  status_in: [EventStatus!]
  status_not_in: [EventStatus!]
  AND: [EventScalarWhereInput!]
  OR: [EventScalarWhereInput!]
  NOT: [EventScalarWhereInput!]
}

enum EventStatus {
  SET
  LIT
  COMPLETED
}

type EventSubscriptionPayload {
  mutation: MutationType!
  node: Event
  updatedFields: [String!]
  previousValues: EventPreviousValues
}

input EventSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EventWhereInput
  AND: [EventSubscriptionWhereInput!]
  OR: [EventSubscriptionWhereInput!]
  NOT: [EventSubscriptionWhereInput!]
}

input EventUpdateInput {
  title: String
  owner: UserUpdateOneRequiredWithoutOwnedEventsInput
  status: EventStatus
  invited: UserUpdateManyInput
  joined: UserUpdateManyInput
}

input EventUpdateManyDataInput {
  title: String
  status: EventStatus
}

input EventUpdateManyMutationInput {
  title: String
  status: EventStatus
}

input EventUpdateManyWithoutOwnerInput {
  create: [EventCreateWithoutOwnerInput!]
  delete: [EventWhereUniqueInput!]
  connect: [EventWhereUniqueInput!]
  set: [EventWhereUniqueInput!]
  disconnect: [EventWhereUniqueInput!]
  update: [EventUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [EventUpsertWithWhereUniqueWithoutOwnerInput!]
  deleteMany: [EventScalarWhereInput!]
  updateMany: [EventUpdateManyWithWhereNestedInput!]
}

input EventUpdateManyWithWhereNestedInput {
  where: EventScalarWhereInput!
  data: EventUpdateManyDataInput!
}

input EventUpdateWithoutOwnerDataInput {
  title: String
  status: EventStatus
  invited: UserUpdateManyInput
  joined: UserUpdateManyInput
}

input EventUpdateWithWhereUniqueWithoutOwnerInput {
  where: EventWhereUniqueInput!
  data: EventUpdateWithoutOwnerDataInput!
}

input EventUpsertWithWhereUniqueWithoutOwnerInput {
  where: EventWhereUniqueInput!
  update: EventUpdateWithoutOwnerDataInput!
  create: EventCreateWithoutOwnerInput!
}

input EventWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  owner: UserWhereInput
  status: EventStatus
  status_not: EventStatus
  status_in: [EventStatus!]
  status_not_in: [EventStatus!]
  invited_every: UserWhereInput
  invited_some: UserWhereInput
  invited_none: UserWhereInput
  joined_every: UserWhereInput
  joined_some: UserWhereInput
  joined_none: UserWhereInput
  AND: [EventWhereInput!]
  OR: [EventWhereInput!]
  NOT: [EventWhereInput!]
}

input EventWhereUniqueInput {
  id: ID
}

type Friendship {
  id: ID!
  user: User!
  friend: User!
  pairKey: String!
  status: FriendStatus!
}

type FriendshipConnection {
  pageInfo: PageInfo!
  edges: [FriendshipEdge]!
  aggregate: AggregateFriendship!
}

input FriendshipCreateInput {
  id: ID
  user: UserCreateOneWithoutFriendsInput!
  friend: UserCreateOneInput!
  pairKey: String!
  status: FriendStatus!
}

input FriendshipCreateManyWithoutUserInput {
  create: [FriendshipCreateWithoutUserInput!]
  connect: [FriendshipWhereUniqueInput!]
}

input FriendshipCreateWithoutUserInput {
  id: ID
  friend: UserCreateOneInput!
  pairKey: String!
  status: FriendStatus!
}

type FriendshipEdge {
  node: Friendship!
  cursor: String!
}

enum FriendshipOrderByInput {
  id_ASC
  id_DESC
  pairKey_ASC
  pairKey_DESC
  status_ASC
  status_DESC
}

type FriendshipPreviousValues {
  id: ID!
  pairKey: String!
  status: FriendStatus!
}

input FriendshipScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  pairKey: String
  pairKey_not: String
  pairKey_in: [String!]
  pairKey_not_in: [String!]
  pairKey_lt: String
  pairKey_lte: String
  pairKey_gt: String
  pairKey_gte: String
  pairKey_contains: String
  pairKey_not_contains: String
  pairKey_starts_with: String
  pairKey_not_starts_with: String
  pairKey_ends_with: String
  pairKey_not_ends_with: String
  status: FriendStatus
  status_not: FriendStatus
  status_in: [FriendStatus!]
  status_not_in: [FriendStatus!]
  AND: [FriendshipScalarWhereInput!]
  OR: [FriendshipScalarWhereInput!]
  NOT: [FriendshipScalarWhereInput!]
}

type FriendshipSubscriptionPayload {
  mutation: MutationType!
  node: Friendship
  updatedFields: [String!]
  previousValues: FriendshipPreviousValues
}

input FriendshipSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: FriendshipWhereInput
  AND: [FriendshipSubscriptionWhereInput!]
  OR: [FriendshipSubscriptionWhereInput!]
  NOT: [FriendshipSubscriptionWhereInput!]
}

input FriendshipUpdateInput {
  user: UserUpdateOneRequiredWithoutFriendsInput
  friend: UserUpdateOneRequiredInput
  pairKey: String
  status: FriendStatus
}

input FriendshipUpdateManyDataInput {
  pairKey: String
  status: FriendStatus
}

input FriendshipUpdateManyMutationInput {
  pairKey: String
  status: FriendStatus
}

input FriendshipUpdateManyWithoutUserInput {
  create: [FriendshipCreateWithoutUserInput!]
  delete: [FriendshipWhereUniqueInput!]
  connect: [FriendshipWhereUniqueInput!]
  set: [FriendshipWhereUniqueInput!]
  disconnect: [FriendshipWhereUniqueInput!]
  update: [FriendshipUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [FriendshipUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [FriendshipScalarWhereInput!]
  updateMany: [FriendshipUpdateManyWithWhereNestedInput!]
}

input FriendshipUpdateManyWithWhereNestedInput {
  where: FriendshipScalarWhereInput!
  data: FriendshipUpdateManyDataInput!
}

input FriendshipUpdateWithoutUserDataInput {
  friend: UserUpdateOneRequiredInput
  pairKey: String
  status: FriendStatus
}

input FriendshipUpdateWithWhereUniqueWithoutUserInput {
  where: FriendshipWhereUniqueInput!
  data: FriendshipUpdateWithoutUserDataInput!
}

input FriendshipUpsertWithWhereUniqueWithoutUserInput {
  where: FriendshipWhereUniqueInput!
  update: FriendshipUpdateWithoutUserDataInput!
  create: FriendshipCreateWithoutUserInput!
}

input FriendshipWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user: UserWhereInput
  friend: UserWhereInput
  pairKey: String
  pairKey_not: String
  pairKey_in: [String!]
  pairKey_not_in: [String!]
  pairKey_lt: String
  pairKey_lte: String
  pairKey_gt: String
  pairKey_gte: String
  pairKey_contains: String
  pairKey_not_contains: String
  pairKey_starts_with: String
  pairKey_not_starts_with: String
  pairKey_ends_with: String
  pairKey_not_ends_with: String
  status: FriendStatus
  status_not: FriendStatus
  status_in: [FriendStatus!]
  status_not_in: [FriendStatus!]
  AND: [FriendshipWhereInput!]
  OR: [FriendshipWhereInput!]
  NOT: [FriendshipWhereInput!]
}

input FriendshipWhereUniqueInput {
  id: ID
  pairKey: String
}

enum FriendStatus {
  SENT_REQUEST
  RECEIVED_REQUEST
  CONFIRMED
}

scalar Long

type Mutation {
  createEvent(data: EventCreateInput!): Event!
  updateEvent(data: EventUpdateInput!, where: EventWhereUniqueInput!): Event
  updateManyEvents(data: EventUpdateManyMutationInput!, where: EventWhereInput): BatchPayload!
  upsertEvent(where: EventWhereUniqueInput!, create: EventCreateInput!, update: EventUpdateInput!): Event!
  deleteEvent(where: EventWhereUniqueInput!): Event
  deleteManyEvents(where: EventWhereInput): BatchPayload!
  createFriendship(data: FriendshipCreateInput!): Friendship!
  updateFriendship(data: FriendshipUpdateInput!, where: FriendshipWhereUniqueInput!): Friendship
  updateManyFriendships(data: FriendshipUpdateManyMutationInput!, where: FriendshipWhereInput): BatchPayload!
  upsertFriendship(where: FriendshipWhereUniqueInput!, create: FriendshipCreateInput!, update: FriendshipUpdateInput!): Friendship!
  deleteFriendship(where: FriendshipWhereUniqueInput!): Friendship
  deleteManyFriendships(where: FriendshipWhereInput): BatchPayload!
  createNotification(data: NotificationCreateInput!): Notification!
  updateNotification(data: NotificationUpdateInput!, where: NotificationWhereUniqueInput!): Notification
  updateManyNotifications(data: NotificationUpdateManyMutationInput!, where: NotificationWhereInput): BatchPayload!
  upsertNotification(where: NotificationWhereUniqueInput!, create: NotificationCreateInput!, update: NotificationUpdateInput!): Notification!
  deleteNotification(where: NotificationWhereUniqueInput!): Notification
  deleteManyNotifications(where: NotificationWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type Notification {
  id: ID!
  status: NotificationStatus!
  text: String!
}

type NotificationConnection {
  pageInfo: PageInfo!
  edges: [NotificationEdge]!
  aggregate: AggregateNotification!
}

input NotificationCreateInput {
  id: ID
  status: NotificationStatus!
  text: String!
}

input NotificationCreateManyInput {
  create: [NotificationCreateInput!]
  connect: [NotificationWhereUniqueInput!]
}

type NotificationEdge {
  node: Notification!
  cursor: String!
}

enum NotificationOrderByInput {
  id_ASC
  id_DESC
  status_ASC
  status_DESC
  text_ASC
  text_DESC
}

type NotificationPreviousValues {
  id: ID!
  status: NotificationStatus!
  text: String!
}

input NotificationScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  status: NotificationStatus
  status_not: NotificationStatus
  status_in: [NotificationStatus!]
  status_not_in: [NotificationStatus!]
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  AND: [NotificationScalarWhereInput!]
  OR: [NotificationScalarWhereInput!]
  NOT: [NotificationScalarWhereInput!]
}

enum NotificationStatus {
  UNREAD
  READ
}

type NotificationSubscriptionPayload {
  mutation: MutationType!
  node: Notification
  updatedFields: [String!]
  previousValues: NotificationPreviousValues
}

input NotificationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: NotificationWhereInput
  AND: [NotificationSubscriptionWhereInput!]
  OR: [NotificationSubscriptionWhereInput!]
  NOT: [NotificationSubscriptionWhereInput!]
}

input NotificationUpdateDataInput {
  status: NotificationStatus
  text: String
}

input NotificationUpdateInput {
  status: NotificationStatus
  text: String
}

input NotificationUpdateManyDataInput {
  status: NotificationStatus
  text: String
}

input NotificationUpdateManyInput {
  create: [NotificationCreateInput!]
  update: [NotificationUpdateWithWhereUniqueNestedInput!]
  upsert: [NotificationUpsertWithWhereUniqueNestedInput!]
  delete: [NotificationWhereUniqueInput!]
  connect: [NotificationWhereUniqueInput!]
  set: [NotificationWhereUniqueInput!]
  disconnect: [NotificationWhereUniqueInput!]
  deleteMany: [NotificationScalarWhereInput!]
  updateMany: [NotificationUpdateManyWithWhereNestedInput!]
}

input NotificationUpdateManyMutationInput {
  status: NotificationStatus
  text: String
}

input NotificationUpdateManyWithWhereNestedInput {
  where: NotificationScalarWhereInput!
  data: NotificationUpdateManyDataInput!
}

input NotificationUpdateWithWhereUniqueNestedInput {
  where: NotificationWhereUniqueInput!
  data: NotificationUpdateDataInput!
}

input NotificationUpsertWithWhereUniqueNestedInput {
  where: NotificationWhereUniqueInput!
  update: NotificationUpdateDataInput!
  create: NotificationCreateInput!
}

input NotificationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  status: NotificationStatus
  status_not: NotificationStatus
  status_in: [NotificationStatus!]
  status_not_in: [NotificationStatus!]
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  AND: [NotificationWhereInput!]
  OR: [NotificationWhereInput!]
  NOT: [NotificationWhereInput!]
}

input NotificationWhereUniqueInput {
  id: ID
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  event(where: EventWhereUniqueInput!): Event
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event]!
  eventsConnection(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EventConnection!
  friendship(where: FriendshipWhereUniqueInput!): Friendship
  friendships(where: FriendshipWhereInput, orderBy: FriendshipOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Friendship]!
  friendshipsConnection(where: FriendshipWhereInput, orderBy: FriendshipOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FriendshipConnection!
  notification(where: NotificationWhereUniqueInput!): Notification
  notifications(where: NotificationWhereInput, orderBy: NotificationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Notification]!
  notificationsConnection(where: NotificationWhereInput, orderBy: NotificationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): NotificationConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  event(where: EventSubscriptionWhereInput): EventSubscriptionPayload
  friendship(where: FriendshipSubscriptionWhereInput): FriendshipSubscriptionPayload
  notification(where: NotificationSubscriptionWhereInput): NotificationSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  hash: String
  name: String!
  ownedEvents(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event!]
  friends(where: FriendshipWhereInput, orderBy: FriendshipOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Friendship!]
  notifications(where: NotificationWhereInput, orderBy: NotificationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Notification!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  email: String!
  hash: String
  name: String!
  ownedEvents: EventCreateManyWithoutOwnerInput
  friends: FriendshipCreateManyWithoutUserInput
  notifications: NotificationCreateManyInput
}

input UserCreateManyInput {
  create: [UserCreateInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutFriendsInput {
  create: UserCreateWithoutFriendsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutOwnedEventsInput {
  create: UserCreateWithoutOwnedEventsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutFriendsInput {
  id: ID
  email: String!
  hash: String
  name: String!
  ownedEvents: EventCreateManyWithoutOwnerInput
  notifications: NotificationCreateManyInput
}

input UserCreateWithoutOwnedEventsInput {
  id: ID
  email: String!
  hash: String
  name: String!
  friends: FriendshipCreateManyWithoutUserInput
  notifications: NotificationCreateManyInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  hash_ASC
  hash_DESC
  name_ASC
  name_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  hash: String
  name: String!
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  hash: String
  hash_not: String
  hash_in: [String!]
  hash_not_in: [String!]
  hash_lt: String
  hash_lte: String
  hash_gt: String
  hash_gte: String
  hash_contains: String
  hash_not_contains: String
  hash_starts_with: String
  hash_not_starts_with: String
  hash_ends_with: String
  hash_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  email: String
  hash: String
  name: String
  ownedEvents: EventUpdateManyWithoutOwnerInput
  friends: FriendshipUpdateManyWithoutUserInput
  notifications: NotificationUpdateManyInput
}

input UserUpdateInput {
  email: String
  hash: String
  name: String
  ownedEvents: EventUpdateManyWithoutOwnerInput
  friends: FriendshipUpdateManyWithoutUserInput
  notifications: NotificationUpdateManyInput
}

input UserUpdateManyDataInput {
  email: String
  hash: String
  name: String
}

input UserUpdateManyInput {
  create: [UserCreateInput!]
  update: [UserUpdateWithWhereUniqueNestedInput!]
  upsert: [UserUpsertWithWhereUniqueNestedInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  set: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyMutationInput {
  email: String
  hash: String
  name: String
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutFriendsInput {
  create: UserCreateWithoutFriendsInput
  update: UserUpdateWithoutFriendsDataInput
  upsert: UserUpsertWithoutFriendsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutOwnedEventsInput {
  create: UserCreateWithoutOwnedEventsInput
  update: UserUpdateWithoutOwnedEventsDataInput
  upsert: UserUpsertWithoutOwnedEventsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutFriendsDataInput {
  email: String
  hash: String
  name: String
  ownedEvents: EventUpdateManyWithoutOwnerInput
  notifications: NotificationUpdateManyInput
}

input UserUpdateWithoutOwnedEventsDataInput {
  email: String
  hash: String
  name: String
  friends: FriendshipUpdateManyWithoutUserInput
  notifications: NotificationUpdateManyInput
}

input UserUpdateWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  data: UserUpdateDataInput!
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutFriendsInput {
  update: UserUpdateWithoutFriendsDataInput!
  create: UserCreateWithoutFriendsInput!
}

input UserUpsertWithoutOwnedEventsInput {
  update: UserUpdateWithoutOwnedEventsDataInput!
  create: UserCreateWithoutOwnedEventsInput!
}

input UserUpsertWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  hash: String
  hash_not: String
  hash_in: [String!]
  hash_not_in: [String!]
  hash_lt: String
  hash_lte: String
  hash_gt: String
  hash_gte: String
  hash_contains: String
  hash_not_contains: String
  hash_starts_with: String
  hash_not_starts_with: String
  hash_ends_with: String
  hash_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  ownedEvents_every: EventWhereInput
  ownedEvents_some: EventWhereInput
  ownedEvents_none: EventWhereInput
  friends_every: FriendshipWhereInput
  friends_some: FriendshipWhereInput
  friends_none: FriendshipWhereInput
  notifications_every: NotificationWhereInput
  notifications_some: NotificationWhereInput
  notifications_none: NotificationWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    