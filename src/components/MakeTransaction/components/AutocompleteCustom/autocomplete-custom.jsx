import React, { Fragment } from 'react';
import Autocomplete from 'react-autocomplete';

const AutocompleteCustom = ({ value, items, selectValue, onFiltred }) => {

  const input = (props) => <input {...props} className='form-control mb-1' /> ;

  return(
    <Fragment>
      <Autocomplete
        getItemValue={(item) => item && item.name}
        items={items}
        renderInput={input}
        renderItem={(item, isHighlighted) =>
          <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }} className='pl-2'>
            {item.name}
          </div>
        }
        value={value}
        onChange={(e) => onFiltred(e.target.value)}
        onSelect={(value) => selectValue(value)}
      />
    </Fragment>
  );
};

export default AutocompleteCustom;