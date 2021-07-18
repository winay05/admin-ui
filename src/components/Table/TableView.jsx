import { Table } from "react-bootstrap";

import TableBody from "./TableBody";
import TableHead from "./TableHead";

export default function TableView(props) {
  // console.log(props.data);
  return (
    <Table bordered hover>
      <TableHead
        columns={props.columns}
        checked={props.selected.length === props.data.length ? true : false}
        onSelect={props.onAllSelect}
      />

      <TableBody
        data={props.data}
        onSelect={props.onSelect}
        selected={props.selected}
        delete={props.delete}
      />
    </Table>
  );
}
