import React, { Fragment } from 'react';

// icons
import CompanyLogo from '@client/components/icons/SearchCompanyIcon';
import SearchIcon from '@client/components/icons/SearchIcon';

import AutoSuggestSearch from './AutoSuggest';
import NavItems from './NavItems';

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  return (
    <Fragment>
      <div className="container">
        <div className="serach-sec">
          <div className="flex-box">
            <CompanyLogo />
            <div className="serach-input">
              <div className="ser-input-box">
                <AutoSuggestSearch />
                <SearchIcon />
              </div>
              <NavItems />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
