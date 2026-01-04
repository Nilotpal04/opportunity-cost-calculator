function Decision({label, id, onClick}) {
  return (
        <li onClick={() => onClick(id)}>{label}</li>
  );
}

export default Decision;