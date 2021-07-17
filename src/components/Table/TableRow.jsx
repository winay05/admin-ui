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
        <button>
          <img
            className="icon"
            src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"
            alt="edit button"
          />
        </button>
        <button
          onClick={(e) => {
            handleDelete(props.el.id);
          }}
        >
          <img
            className="icon"
            src="https://img.icons8.com/color/48/000000/delete-forever.png"
            alt="delete button"
          />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
