import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import TableView from "./Table/TableView";

import { apiEndpoint, PAGELIMIT, DATALIMIT } from "../config";
import "./styles.css";
import Paginate from "./Paginate";
export default class Main extends Component {
  constructor() {
    super();
    this.totalData = [];
    this.debounceTimeout = "";
    this.state = {
      loading: false,
      data: [],
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
  //call search only when user stops typing for 300ms
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

  deleteUser = (id) => {
    this.setState({ data: [...this.state.data.filter((el) => el.id !== id)] });
  };

  multiDelete = (id) => {
    //id is array of id's to be deleted
    this.setState({
      data: [...this.state.data.filter((el) => id.indexOf(el.id) < 0)],
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
          className="inline"
          id="search-bar"
          type="text"
          onChange={(e) => {
            this.debounceSearch(e);
          }}
          placeholder="seach by name, email or role"
        />

        {/* </span> */}
        {this.state.data.length > 0 ? (
          <Paginate
            data={this.state.data}
            pageLimit={PAGELIMIT}
            dataLimit={DATALIMIT}
            onDelete={this.deleteUser}
            onMultiDelete={this.multiDelete}
            RenderComponent={TableView}
          />
        ) : (
          <div>No data to display</div>
        )}
      </Container>
    );
  }
}
