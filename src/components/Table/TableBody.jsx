import TableRow from "./TableRow";

const TableBody = (props) => {
  return (
    <tbody>
      {props.data.map((el) => (
        <TableRow
          checked={props.selected.indexOf(el.id) >= 0 ? true : false}
          delete={props.delete}
          onSelect={props.onSelect}
          el={el}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
