const TableHead = (props) => {
  const selectAll = () => {
    props.onSelect();
  };

  return (
    <thead>
      <tr>
        <th key="select-all-checkbox">
          <input onClick={selectAll} type="checkbox" />
        </th>

        {props.columns.map((el, idx) => (
          <th key={idx}>{el}</th>
        ))}

        <th>Actions</th>
      </tr>
    </thead>
  );
};
export default TableHead;
