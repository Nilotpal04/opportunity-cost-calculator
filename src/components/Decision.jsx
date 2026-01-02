function Decision({title, id, onClick}) {
  return (
        <li onClick={() => onClick(id)}>{title}</li>
  );
}

export default Decision;