import { Select } from 'antd';
import React, { FC } from 'react';
import { listingsFilter } from 'utils';

interface IProps {
	filter: IListingsFilter
	setFilter: (filter: IListingsFilter) => void
}

export const ListingsFilters: FC<IProps> = ({ filter, setFilter }) =>
<div className='listings-filters'>
  <span>Filter By</span>
  <Select value={filter} onChange={setFilter}>
    <Select.Option value={listingsFilter.PRICE_LOW_TO_HIGH}>
      Price: Low to High
    </Select.Option>
    <Select.Option value={listingsFilter.PRICE_HIGH_TO_LOW}>
      Price: High to Low
    </Select.Option>
  </Select>
</div>

