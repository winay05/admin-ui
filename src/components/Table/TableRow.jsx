import "./Table.css";

const TableRow = (props) => {
  const handleDelete = (id) => {
    props.delete(id);
  };
  const handleToggle = (id) => {
    console.log("inside click handler");
    props.onSelect(id);
  };

  return (
    <tr>
      <td id="checkbox">
        <input
          type="checkbox"
          checked={props.checked}
          onChange={() => {
            handleToggle(props.el.id);
          }}
          value={props.el.id}
        />
      </td>
      <td id="name">{props.el.name}</td>
      <td id="email">{props.el.email}</td>
      <td id="role">{props.el.role}</td>
      <td id="actions">
        <button>Edit</button>
        <button
          onClick={(e) => {
            handleDelete(props.el.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
