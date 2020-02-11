// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  person: (where?: PersonWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  person: (where: PersonWhereUniqueInput) => PersonNullablePromise;
  persons: (args?: {
    where?: PersonWhereInput;
    orderBy?: PersonOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Person>;
  personsConnection: (args?: {
    where?: PersonWhereInput;
    orderBy?: PersonOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => PersonConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createPerson: (data: PersonCreateInput) => PersonPromise;
  updatePerson: (args: {
    data: PersonUpdateInput;
    where: PersonWhereUniqueInput;
  }) => PersonPromise;
  updateManyPersons: (args: {
    data: PersonUpdateManyMutationInput;
    where?: PersonWhereInput;
  }) => BatchPayloadPromise;
  upsertPerson: (args: {
    where: PersonWhereUniqueInput;
    create: PersonCreateInput;
    update: PersonUpdateInput;
  }) => PersonPromise;
  deletePerson: (where: PersonWhereUniqueInput) => PersonPromise;
  deleteManyPersons: (where?: PersonWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  person: (
    where?: PersonSubscriptionWhereInput
  ) => PersonSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type PersonOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "age_ASC"
  | "age_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface PersonCreateInput {
  id?: Maybe<ID_Input>;
  name: String;
  age: Int;
}

export interface PersonUpdateInput {
  name?: Maybe<String>;
  age?: Maybe<Int>;
}

export interface PersonWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  age?: Maybe<Int>;
  age_not?: Maybe<Int>;
  age_in?: Maybe<Int[] | Int>;
  age_not_in?: Maybe<Int[] | Int>;
  age_lt?: Maybe<Int>;
  age_lte?: Maybe<Int>;
  age_gt?: Maybe<Int>;
  age_gte?: Maybe<Int>;
  AND?: Maybe<PersonWhereInput[] | PersonWhereInput>;
  OR?: Maybe<PersonWhereInput[] | PersonWhereInput>;
  NOT?: Maybe<PersonWhereInput[] | PersonWhereInput>;
}

export interface PersonUpdateManyMutationInput {
  name?: Maybe<String>;
  age?: Maybe<Int>;
}

export interface PersonSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<PersonWhereInput>;
  AND?: Maybe<PersonSubscriptionWhereInput[] | PersonSubscriptionWhereInput>;
  OR?: Maybe<PersonSubscriptionWhereInput[] | PersonSubscriptionWhereInput>;
  NOT?: Maybe<PersonSubscriptionWhereInput[] | PersonSubscriptionWhereInput>;
}

export type PersonWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface NodeNode {
  id: ID_Output;
}

export interface AggregatePerson {
  count: Int;
}

export interface AggregatePersonPromise
  extends Promise<AggregatePerson>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregatePersonSubscription
  extends Promise<AsyncIterator<AggregatePerson>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface PersonPreviousValues {
  id: ID_Output;
  name: String;
  age: Int;
}

export interface PersonPreviousValuesPromise
  extends Promise<PersonPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  age: () => Promise<Int>;
}

export interface PersonPreviousValuesSubscription
  extends Promise<AsyncIterator<PersonPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  age: () => Promise<AsyncIterator<Int>>;
}

export interface PersonEdge {
  node: Person;
  cursor: String;
}

export interface PersonEdgePromise extends Promise<PersonEdge>, Fragmentable {
  node: <T = PersonPromise>() => T;
  cursor: () => Promise<String>;
}

export interface PersonEdgeSubscription
  extends Promise<AsyncIterator<PersonEdge>>,
    Fragmentable {
  node: <T = PersonSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface PersonSubscriptionPayload {
  mutation: MutationType;
  node: Person;
  updatedFields: String[];
  previousValues: PersonPreviousValues;
}

export interface PersonSubscriptionPayloadPromise
  extends Promise<PersonSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = PersonPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = PersonPreviousValuesPromise>() => T;
}

export interface PersonSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<PersonSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = PersonSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = PersonPreviousValuesSubscription>() => T;
}

export interface Person {
  id: ID_Output;
  name: String;
  age: Int;
}

export interface PersonPromise extends Promise<Person>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  age: () => Promise<Int>;
}

export interface PersonSubscription
  extends Promise<AsyncIterator<Person>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  age: () => Promise<AsyncIterator<Int>>;
}

export interface PersonNullablePromise
  extends Promise<Person | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  age: () => Promise<Int>;
}

export interface PersonConnection {
  pageInfo: PageInfo;
  edges: PersonEdge[];
}

export interface PersonConnectionPromise
  extends Promise<PersonConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<PersonEdge>>() => T;
  aggregate: <T = AggregatePersonPromise>() => T;
}

export interface PersonConnectionSubscription
  extends Promise<AsyncIterator<PersonConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<PersonEdgeSubscription>>>() => T;
  aggregate: <T = AggregatePersonSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

export type Long = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "Person",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;