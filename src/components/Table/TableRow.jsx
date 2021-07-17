import { useState } from "react";
import "./Table.css";

const TableRow = (props) => {
  const [editing, toggleEdit] = useState(false);

  const handleDelete = (id) => {
    props.delete(id);
  };
  const handleToggle = (id) => {
    console.log("inside click handler");
    props.onSelect(id);
  };
  const handleSave = () => {
    toggleEdit(false);
    document.getElementById("name").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("role").disabled = true;
  };
  const handleEdit = () => {
    toggleEdit(true);
    document.getElementById("name").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("role").disabled = false;
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
      <td>
        <input id="name" type="text" defaultValue={props.el.name} disabled />
      </td>
      <td>
        <input id="email" type="email" defaultValue={props.el.email} disabled />
      </td>
      <td>
        <select id="role" defaultValue={props.el.role} disabled>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
          <option value="guest">Guest</option>
        </select>
      </td>
      <td id="actions">
        {editing ? (
          <button onClick={handleSave}>
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/save--v2.png"
              alt="save button"
            />
          </button>
        ) : null}
        <button onClick={handleEdit}>
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
