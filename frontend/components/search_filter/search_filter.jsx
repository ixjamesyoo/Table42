import React from "react";
import { withRouter } from "react-router-dom";
import { merge } from "lodash";
import {
  relevantHashSubstring,
  parseSelections,
  optionCheckedStatus,
  modifyCheckedInputsArray,
  createNewHashString,
} from "./search_filter_helper";


class SearchFilter extends React.Component {
  constructor(props) {
    super(props);

    const { location, filterType, choicesArray } = this.props;

    const relevantSubstring = relevantHashSubstring(location.hash, filterType);
    const checkedInputs = parseSelections(relevantSubstring);

    this.state = merge({ checkedInputs }, optionCheckedStatus(choicesArray, checkedInputs));
    debugger
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {

  }

  handleChange(e) {
    console.log(e.currentTarget);
    const { location, filterType, history, choicesArray } = this.props;

    const copyCheckedInputs = this.state.checkedInputs.slice();
    const newCheckedInputs = modifyCheckedInputsArray(copyCheckedInputs, e.currentTarget);

    this.setState({ checkedInputs: newCheckedInputs, [e.currentTarget.value]: !(this.state[e.currentTarget.value])});
    const newHash = createNewHashString(location.hash, filterType, newCheckedInputs);
    debugger
    history.push(`${location.pathname}${location.search}${newHash}`);
  }

  render() {
    const { choicesArray } = this.props;
    const filterInputs = choicesArray.map((choice) => {
      return (
        <label className="choice-label" key={ choice }>{ choice }
          <input type="checkbox"
            value={ choice }
            checked={ this.state[choice] }
            onChange={ this.handleChange }
            />
        </label>
      );
    });

    return (
      <div className="filter-container">
        <form className="filter-form">
          { filterInputs }
        </form>
      </div>
    );
  }
}

export default withRouter(SearchFilter);
