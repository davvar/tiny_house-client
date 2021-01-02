 type Maybe<T> = T | null;
 type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
 type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
 type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
 type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


 type IBooking = {
  id: Scalars['ID'];
  listing: IListing;
  tenant: IUser;
  checkIn: Scalars['String'];
  checkOut: Scalars['String'];
};

 type IBookings = {
  total: Scalars['Int'];
  result: Array<IBooking>;
};

 enum IListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE'
}

 enum IListingsFilter {
  PriceLowToHigh = 'PRICE_LOW_TO_HIGH',
  PriceHighToLow = 'PRICE_HIGH_TO_LOW'
}

 type IListing = {
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


 type IListingBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

 type IListings = {
  total: Scalars['Int'];
  result: Array<IListing>;
};

 type IUser = {
  id: Scalars['ID'];
  name: Scalars['String'];
  avatar: Scalars['String'];
  contact: Scalars['String'];
  hasWallet: Scalars['Boolean'];
  income?: Maybe<Scalars['Int']>;
  bookings?: Maybe<IBookings>;
  listings: IListings;
};


 type IUserBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


 type IUserListingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

 type IViewer = {
  id?: Maybe<Scalars['ID']>;
  token?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  hasWallet?: Maybe<Scalars['Boolean']>;
  didRequest: Scalars['Boolean'];
};

 type ILogInInput = {
  code: Scalars['String'];
};

 type IQuery = {
  authUrl: Scalars['String'];
  user: IUser;
  listing: IListing;
  listings: IListings;
};


 type IQueryUserArgs = {
  id: Scalars['ID'];
};


 type IQueryListingArgs = {
  id: Scalars['ID'];
};


 type IQueryListingsArgs = {
  filter: IListingsFilter;
  page: Scalars['Int'];
  limit: Scalars['Int'];
};

 type IMutation = {
  logIn: IViewer;
  logOut: IViewer;
};


 type IMutationLogInArgs = {
  input?: Maybe<ILogInInput>;
};

 enum ICacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


 type ILogInMutationVariables = Exact<{
  input?: Maybe<ILogInInput>;
}>;


 type ILogInMutation = { logIn: Pick<IViewer, 'id' | 'token' | 'avatar' | 'hasWallet' | 'didRequest'> };

 type ILogOutMutationVariables = Exact<{ [key: string]: never; }>;


 type ILogOutMutation = { logOut: Pick<IViewer, 'id' | 'token' | 'avatar' | 'hasWallet' | 'didRequest'> };

 type IListingQueryVariables = Exact<{
  id: Scalars['ID'];
  bookingsPage: Scalars['Int'];
  limit: Scalars['Int'];
}>;


 type IListingQuery = { listing: (
    Pick<IListing, 'id' | 'title' | 'description' | 'image' | 'type' | 'address' | 'city' | 'bookingsIndex' | 'price' | 'numOfGuests'>
    & { host: Pick<IUser, 'id' | 'name' | 'avatar' | 'hasWallet'>, bookings?: Maybe<(
      Pick<IBookings, 'total'>
      & { result: Array<(
        Pick<IBooking, 'id' | 'checkIn' | 'checkOut'>
        & { tenant: Pick<IUser, 'id' | 'name' | 'avatar'> }
      )> }
    )> }
  ) };

 type IListingsQueryVariables = Exact<{
  filter: IListingsFilter;
  listingsPage: Scalars['Int'];
  limit: Scalars['Int'];
}>;


 type IListingsQuery = { listings: (
    Pick<IListings, 'total'>
    & { result: Array<Pick<IListing, 'address' | 'price' | 'description' | 'numOfGuests'>> }
  ) };

 type IUserQueryVariables = Exact<{
  id: Scalars['ID'];
  bookingsPage: Scalars['Int'];
  listingsPage: Scalars['Int'];
  limit: Scalars['Int'];
}>;


 type IUserQuery = { user: (
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

 type IAuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


 type IAuthUrlQuery = Pick<IQuery, 'authUrl'>;
