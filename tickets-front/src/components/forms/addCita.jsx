import PropTypes from "prop-types";
export default function addCita({ handleCloseAddCita }) {
  return (
    <div>
      addCita
      <button onClick={handleCloseAddCita}>Close</button>
    </div>
  );
}

addCita.propTypes = {
  handleCloseAddCita: PropTypes.func.isRequired,
};
