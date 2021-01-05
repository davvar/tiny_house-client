import { Skeleton } from 'antd';
import { ListingsSkeleton } from 'pages/Listings';
import React from 'react';

export const HomeListingsSkeleton = () => (
	<ListingsSkeleton>
		<Skeleton paragraph={{ rows: 0 }} />
	</ListingsSkeleton>
)
