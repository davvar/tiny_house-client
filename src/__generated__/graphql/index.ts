import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type IBooking = {
  id: Scalars['ID'];
  listing: IListing;
  tenant: IUser;
  checkIn: Scalars['String'];
  checkOut: Scalars['String'];
};

export type IBookings = {
  total: Scalars['Int'];
  result: Array<IBooking>;
};

export enum IListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE'
}

export type IListing = {
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  host: IUser;
  type: IListingType;
  address: Scalars['String'];
  city: Scalars['String'];
  bookings?: Maybe<IBookings>;
  bookingsIndex: Scalars['String'];
  price: Scalars['Int'];
  numOfGuests: Scalars['Int'];
};


export type IListingBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type IListings = {
  total: Scalars['Int'];
  result: Array<IListing>;
};

export type IUser = {
  id: Scalars['ID'];
  name: Scalars['String'];
  avatar: Scalars['String'];
  contact: Scalars['String'];
  hasWallet: Scalars['Boolean'];
  income?: Maybe<Scalars['Int']>;
  bookings?: Maybe<IBookings>;
  listings: IListings;
};


export type IUserBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type IUserListingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type IViewer = {
  id?: Maybe<Scalars['ID']>;
  token?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  hasWallet?: Maybe<Scalars['Boolean']>;
  didRequest: Scalars['Boolean'];
};

export type ILogInInput = {
  code: Scalars['String'];
};

export type IQuery = {
  authUrl: Scalars['String'];
  user: IUser;
  listing: IListing;
};


export type IQueryUserArgs = {
  id: Scalars['ID'];
};


export type IQueryListingArgs = {
  id: Scalars['ID'];
};

export type IMutation = {
  logIn: IViewer;
  logOut: IViewer;
};


export type IMutationLogInArgs = {
  input?: Maybe<ILogInInput>;
};

export enum ICacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type ILogInMutationVariables = Exact<{
  input?: Maybe<ILogInInput>;
}>;


export type ILogInMutation = { logIn: Pick<IViewer, 'id' | 'token' | 'avatar' | 'hasWallet' | 'didRequest'> };

export type ILogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type ILogOutMutation = { logOut: Pick<IViewer, 'id' | 'token' | 'avatar' | 'hasWallet' | 'didRequest'> };

export type IAuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type IAuthUrlQuery = Pick<IQuery, 'authUrl'>;

export type IListingQueryVariables = Exact<{
  id: Scalars['ID'];
  bookingsPage: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type IListingQuery = { listing: (
    Pick<IListing, 'id' | 'title' | 'description' | 'image' | 'type' | 'address' | 'city' | 'bookingsIndex' | 'price' | 'numOfGuests'>
    & { host: Pick<IUser, 'id' | 'name' | 'avatar' | 'hasWallet'>, bookings?: Maybe<(
      Pick<IBookings, 'total'>
      & { result: Array<(
        Pick<IBooking, 'id' | 'checkIn' | 'checkOut'>
        & { tenant: Pick<IUser, 'id' | 'name' | 'avatar'> }
      )> }
    )> }
  ) };

export type IUserQueryVariables = Exact<{
  id: Scalars['ID'];
  bookingsPage: Scalars['Int'];
  listingsPage: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type IUserQuery = { user: (
    Pick<IUser, 'id' | 'name' | 'avatar' | 'contact' | 'hasWallet' | 'income'>
    & { bookings?: Maybe<(
      Pick<IBookings, 'total'>
      & { result: Array<(
        Pick<IBooking, 'id' | 'checkIn' | 'checkOut'>
        & { listing: Pick<IListing, 'id' | 'title' | 'image' | 'address' | 'price' | 'numOfGuests'> }
      )> }
    )>, listings: (
      Pick<IListings, 'total'>
      & { result: Array<Pick<IListing, 'id' | 'title' | 'image' | 'address' | 'price' | 'numOfGuests'>> }
    ) }
  ) };


export const LogInDocument = gql`
    mutation LogIn($input: LogInInput) {
  logIn(input: $input) {
    id
    token
    avatar
    hasWallet
    didRequest
  }
}
    `;
export type ILogInMutationFn = Apollo.MutationFunction<ILogInMutation, ILogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<ILogInMutation, ILogInMutationVariables>) {
        return Apollo.useMutation<ILogInMutation, ILogInMutationVariables>(LogInDocument, baseOptions);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<ILogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<ILogInMutation, ILogInMutationVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut {
    id
    token
    avatar
    hasWallet
    didRequest
  }
}
    `;
export type ILogOutMutationFn = Apollo.MutationFunction<ILogOutMutation, ILogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<ILogOutMutation, ILogOutMutationVariables>) {
        return Apollo.useMutation<ILogOutMutation, ILogOutMutationVariables>(LogOutDocument, baseOptions);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<ILogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<ILogOutMutation, ILogOutMutationVariables>;
export const AuthUrlDocument = gql`
    query AuthUrl {
  authUrl
}
    `;

/**
 * __useAuthUrlQuery__
 *
 * To run a query within a React component, call `useAuthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthUrlQuery(baseOptions?: Apollo.QueryHookOptions<IAuthUrlQuery, IAuthUrlQueryVariables>) {
        return Apollo.useQuery<IAuthUrlQuery, IAuthUrlQueryVariables>(AuthUrlDocument, baseOptions);
      }
export function useAuthUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IAuthUrlQuery, IAuthUrlQueryVariables>) {
          return Apollo.useLazyQuery<IAuthUrlQuery, IAuthUrlQueryVariables>(AuthUrlDocument, baseOptions);
        }
export type AuthUrlQueryHookResult = ReturnType<typeof useAuthUrlQuery>;
export type AuthUrlLazyQueryHookResult = ReturnType<typeof useAuthUrlLazyQuery>;
export type AuthUrlQueryResult = Apollo.QueryResult<IAuthUrlQuery, IAuthUrlQueryVariables>;
export const ListingDocument = gql`
    query Listing($id: ID!, $bookingsPage: Int!, $limit: Int!) {
  listing(id: $id) {
    id
    title
    description
    image
    host {
      id
      name
      avatar
      hasWallet
    }
    type
    address
    city
    bookings(limit: $limit, page: $bookingsPage) {
      total
      result {
        id
        tenant {
          id
          name
          avatar
        }
        checkIn
        checkOut
      }
    }
    bookingsIndex
    price
    numOfGuests
  }
}
    `;

/**
 * __useListingQuery__
 *
 * To run a query within a React component, call `useListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingQuery({
 *   variables: {
 *      id: // value for 'id'
 *      bookingsPage: // value for 'bookingsPage'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListingQuery(baseOptions: Apollo.QueryHookOptions<IListingQuery, IListingQueryVariables>) {
        return Apollo.useQuery<IListingQuery, IListingQueryVariables>(ListingDocument, baseOptions);
      }
export function useListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IListingQuery, IListingQueryVariables>) {
          return Apollo.useLazyQuery<IListingQuery, IListingQueryVariables>(ListingDocument, baseOptions);
        }
export type ListingQueryHookResult = ReturnType<typeof useListingQuery>;
export type ListingLazyQueryHookResult = ReturnType<typeof useListingLazyQuery>;
export type ListingQueryResult = Apollo.QueryResult<IListingQuery, IListingQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!, $bookingsPage: Int!, $listingsPage: Int!, $limit: Int!) {
  user(id: $id) {
    id
    name
    avatar
    contact
    hasWallet
    income
    bookings(limit: $limit, page: $bookingsPage) {
      total
      result {
        id
        listing {
          id
          title
          image
          address
          price
          numOfGuests
        }
        checkIn
        checkOut
      }
    }
    listings(limit: $limit, page: $listingsPage) {
      total
      result {
        id
        title
        image
        address
        price
        numOfGuests
      }
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      bookingsPage: // value for 'bookingsPage'
 *      listingsPage: // value for 'listingsPage'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<IUserQuery, IUserQueryVariables>) {
        return Apollo.useQuery<IUserQuery, IUserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IUserQuery, IUserQueryVariables>) {
          return Apollo.useLazyQuery<IUserQuery, IUserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<IUserQuery, IUserQueryVariables>;