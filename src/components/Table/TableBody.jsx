import { InputGroup } from "react-bootstrap";

const TableBody = (props) => {
  const handleDelete = (id) => {
    props.delete(id);
  };
  const handleToggle = (id) => {
    console.log("inside click handler");
    props.onSelect(id);
  };

  return (
    <tbody>
      {props.data.map((el) => (
        <tr>
          <td>
            <input
              type="checkbox"
              // defaultChecked={props.selected.indexOf(el.id) >= 0 ? true : false}
              checked={props.selected.indexOf(el.id) >= 0 ? true : false}
              onChange={() => {
                handleToggle(el.id);
              }}
              value={el.id}
            />
            {/* <button type="checkbox"></button> */}
          </td>
          <td>{el.name}</td>
          <td>{el.email}</td>
          <td>{el.role}</td>
          <td>
            <button>Edit</button>
            <button
              onClick={(e) => {
                handleDelete(el.id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
