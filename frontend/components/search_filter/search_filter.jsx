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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // console.log(e.currentTarget);
    const { location, filterType, history, choicesArray } = this.props;

    const oldCheckedInputs = this.state.checkedInputs.slice();
    const newCheckedInputs = modifyCheckedInputsArray(oldCheckedInputs, e.currentTarget, choicesArray);

    this.setState({
      checkedInputs: newCheckedInputs,
      [e.currentTarget.value]: !(this.state[e.currentTarget.value])
    });
    const newHash = createNewHashString(location.hash, filterType, newCheckedInputs);
    history.push(`${location.pathname}${location.search}${newHash}`);
  }

  render() {
    const { choicesArray } = this.props;
    const filterInputs = choicesArray.map((choice) => {
      return (
        <div className="choice-div" key={ choice }>
          <label className="choice-label" >
            <input type="checkbox"
              value={ choice }
              checked={ this.state[choice] }
              onChange={ this.handleChange }
              />
            <span>{ choice }</span>
          </label>
        </div>
      );
    });

    return (
      <form className="filter-form">
        { filterInputs }
      </form>
    );
  }
}

export default withRouter(SearchFilter);
