const TableHead = (props) => {
  const selectAll = () => {
    props.onSelect();
  };

  return (
    <thead>
      <tr>
        <th>
          <input onClick={selectAll} type="checkbox" />
        </th>

        {props.columns.map((el) => (
          <th>{el}</th>
        ))}

        <th>Actions</th>
      </tr>
    </thead>
  );
};
export default TableHead;
