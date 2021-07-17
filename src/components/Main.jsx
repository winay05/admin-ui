import React, { Component } from "react";
import { Container } from "react-bootstrap";
import TableView from "./Table/TableView";

import { apiEndpoint } from "./../ipConfig";
import "./styles.css";
export default class Main extends Component {
  constructor() {
    super();
    this.totalData = [];
    this.debounceTimeout = "";
    this.state = {
      loading: false,
      data: [],
      selected: [],
    };
  }

  search = (text) => {
    if (text === "") {
      this.setState({ data: [...this.totalData] });
    } else {
      this.setState((state) => {
        return {
          data: this.totalData.filter(
            (el) =>
              el.name.toLowerCase().includes(text.toLowerCase()) ||
              el.email.toLowerCase().includes(text.toLowerCase()) ||
              el.role.toLowerCase().includes(text.toLowerCase())
          ),
        };
      });
    }
  };

  debounceSearch = (event) => {
    let txt = event.target.value;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(
      function () {
        this.search(txt);
      }.bind(this),
      300
    );
  };
  selectAll = () => {
    if (this.state.selected.length === this.state.data.length) {
      //need to toggle
      console.log("unselect all");
      this.setState({ selected: [] });
    } else {
      console.log("selecting all");
      // this.state.data.map((el) => el.id);
      this.setState({ selected: [...this.state.data.map((el) => el.id)] });
    }
  };
  selectRow = (id) => {
    let newSelected = [...this.state.selected];
    let idx = this.state.selected.indexOf(id);

    if (idx >= 0) {
      //need to remove
      // newSelected.splice(1, idx);
      console.log("removing object");

      newSelected = this.state.selected.filter((el) => el !== id);
    } else {
      console.log("adding object");
      newSelected = [id, ...newSelected];
    }
    console.log(newSelected);
    this.setState({ selected: [...newSelected] });
  };
  deleteUser = (id) => {
    this.setState({ data: [...this.state.data.filter((el) => el.id !== id)] });
    this.setState({
      selected: [...this.state.selected.filter((el) => el !== id)],
    });
  };
  callAPI = async () => {
    let res = [];
    try {
      res = await (await fetch(apiEndpoint.URL)).json();
    } catch (err) {
      console.log(err);
    } finally {
      return res;
    }
  };
  async componentDidMount() {
    let res;
    try {
      res = await this.callAPI();
    } catch (err) {
      alert("coulnt fetch users");
      console.log(err);
    }

    if (res && res.length > 0) {
      this.setState({ data: [...res] });
      this.totalData = [...res];
    }
  }
  render() {
    return (
      <Container>
        <h2 className="mb-5 mt-5">Admin UI</h2>
        <input
          id="search-bar"
          type="text"
          onChange={(e) => {
            this.debounceSearch(e);
          }}
          placeholder="seach by name, email or role"
        />
        {this.state.data.length > 0 ? (
          <TableView
            data={this.state.data}
            delete={this.deleteUser}
            columns={Object.keys(this.state.data[0]).slice(1)}
            allSelected={false}
            onSelect={this.selectRow}
            selectAll={this.selectAll}
            selected={this.state.selected}
          />
        ) : (
          ""
        )}
      </Container>
    );
  }
}
