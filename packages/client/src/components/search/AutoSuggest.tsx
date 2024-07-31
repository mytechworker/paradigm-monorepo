import React, { useState, memo } from 'react';
import Autosuggest, { InputProps, GetSuggestionValue, RenderSuggestion } from 'react-autosuggest';

import { defaultTheme } from 'react-autosuggest/dist/theme';

type Suggestion = { name: string; year: number };

type SuggestionTypes = {
  value: string;
  suggestions: Array<Suggestion> | [];
};

const AutoSuggestTheme = {
  input: 'react_autosuggest__input',
  inputOpen: 'react_autosuggest__input__open',
  inputFocused: 'react_autosuggest__input__focused',
  suggestionsContainer: 'react_autosuggest__suggestions_container',
  suggestionsContainerOpen: 'react_autosuggest__suggestions_container__open',
  suggestionsList: 'react_autosuggest__suggestions_list',
  suggestion: 'react_autosuggest__suggestion',
  suggestionHighlighted: 'react_autosuggest__suggestion__highlighted',
};

const languages = [
  {
    name: 'C',
    year: 1972,
  },
  {
    name: 'Elm',
    year: 2012,
  },
  {
    name: 'harsh',
    year: 1999,
  },
  {
    name: 'ramesh',
    year: 2012,
  },
  {
    name: 'Science',
    year: 1000,
  },
];

const initState: SuggestionTypes = {
  value: '',
  suggestions: [],
};

const AutoSuggestSearch: React.FC = () => {
  const [state, setState] = useState(initState);

  const { value, suggestions } = state;

  const onChange = (event, { newValue }) => {
    setState({ ...state, value: newValue });
  };

  const SearchInput: InputProps<any> = {
    placeholder: 'Searching...',
    value: value,
    onChange,
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : languages.filter((lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const getSuggestionValue: GetSuggestionValue<Suggestion> = (suggestion) => suggestion.name;

  const renderSuggestion: RenderSuggestion<Suggestion> = (suggestion) => <div>{suggestion.name}</div>;

  const onSuggestionsFetchRequested = ({ value }) => {
    setState({
      ...state,
      suggestions: getSuggestions(value),
    });
  };

  const onSuggestionsClearRequested = () => {
    setState({
      ...state,
      suggestions: [],
    });
  };

  return (
    <Autosuggest
      theme={{ ...AutoSuggestTheme, ...defaultTheme }}
      inputProps={SearchInput}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
    />
  );
};

export default memo(AutoSuggestSearch);
