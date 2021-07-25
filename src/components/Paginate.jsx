import React, { Component } from "react";
import "./Paginate.css";
import { Button } from "react-bootstrap";

export default class Paginate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      pages: Math.max(
        Math.round(this.props.data.length / this.props.dataLimit),
        1
      ),
      currentPage: 1,
    };
  }

  goToFirstPage = () => {
    this.setState({ currentPage: 1, selected: [] });
  };

  goToLastPage = () => {
    this.setState({ currentPage: this.state.pages, selected: [] });
  };
  goToNextPage = () => {
    if (this.state.currentPage < this.state.pages)
      this.setState({ currentPage: this.state.currentPage + 1, selected: [] });
  };

  goToPreviousPage = () => {
    if (this.state.currentPage > 0)
      this.setState({ currentPage: this.state.currentPage - 1, selected: [] });
  };

  changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    this.setState({ currentPage: pageNumber, selected: [] });
  };
  getPaginatedData = () => {
    const startIndex =
      this.state.currentPage * this.props.dataLimit - this.props.dataLimit;
    const endIndex = startIndex + this.props.dataLimit;
    return this.props.data.slice(startIndex, endIndex);
  };

  getPaginationGroup = () => {
    let start =
      Math.floor((this.state.currentPage - 1) / this.props.dataLimit) *
      this.props.dataLimit;

    return new Array(Math.min(this.state.pages, this.props.pageLimit))
      .fill()
      .map((_, idx) => start + idx + 1);
  };

  toggleAllVisible = () => {
    if (this.state.selected.length === this.getPaginatedData().length) {
      //need to toggle
      this.setState({ selected: [] });
    } else {
      //need to select all
      this.setState({
        selected: [...this.getPaginatedData().map((el) => el.id)],
      });
    }
  };
  toggleRow = (id) => {
    let newSelected = [...this.state.selected];
    let idx = this.state.selected.indexOf(id);

    if (idx >= 0) {
      //need to remove
      newSelected = this.state.selected.filter((el) => el !== id);
    } else {
      //need to select row
      newSelected = [id, ...newSelected];
    }
    this.setState({ selected: [...newSelected] });
  };
  handleDelete = (id) => {
    if (!id.length) {
      //single value
      //remove id from selected and call the delete method
      this.setState({
        selected: [...this.state.selected.filter((el) => el !== id)],
      });
      //call the parent method
      this.props.onDelete(id);
    } else {
      //an array of id's
      this.setState({
        selected: [...this.state.selected.filter((el) => id.indexOf(el) < 0)],
      });
      //call the parent method
      this.props.onMultiDelete(id);
    }
  };
  calculatePages = (newProps) => {
    return Math.max(1, Math.round(newProps.data.length / newProps.dataLimit));
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({
      pages: this.calculatePages(newProps),
      currentPage: 1,
    });
  }

  render() {
    return (
      <>
        <this.props.RenderComponent
          columns={Object.keys(this.props.data[0]).slice(1)}
          data={this.getPaginatedData()}
          selected={this.state.selected}
          onAllSelect={this.toggleAllVisible}
          onSelect={this.toggleRow}
          delete={this.handleDelete}
        />

        {this.state.selected.length > 0 ? (
          <Button
            onClick={() => {
              this.handleDelete(this.state.selected);
            }}
            variant="danger"
          >
            Delete Selected
          </Button>
        ) : null}

        {/* show the pagiantion
                it consists of next and previous buttons
                along with page numbers, in our case, 5 page
                numbers at a time
            */}

        <div className="pagination">
          {/* First button */}
          <button
            onClick={this.goToFirstPage}
            className={`prev ${this.state.currentPage === 1 ? "disabled" : ""}`}
          >
            first
          </button>
          {/* previous button */}
          <button
            onClick={this.goToPreviousPage}
            className={`prev ${this.state.currentPage === 1 ? "disabled" : ""}`}
          >
            <img
              src="https://img.icons8.com/material-sharp/24/000000/chevron-left.png"
              alt="previous button"
            />
          </button>

          {/* show page numbers */}
          {this.getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={this.changePage}
              className={`paginationItem ${
                this.state.currentPage === item ? "active" : null
              }`}
            >
              <span>{item}</span>
            </button>
          ))}

          {/* next button */}
          <button
            onClick={this.goToNextPage}
            className={`next ${
              this.state.currentPage === this.state.pages ? "disabled" : ""
            }`}
          >
            <img
              src="https://img.icons8.com/material-rounded/24/000000/chevron-right.png"
              alt="next button"
            />
          </button>
          {/* last page button */}
          <button
            onClick={this.goToLastPage}
            className={`next ${
              this.state.currentPage === this.state.pages ? "disabled" : ""
            }`}
          >
            last
          </button>
        </div>
      </>
    );
  }
}
