import PropTypes from "prop-types";
function Title({ title, titleStyles }) {
  // console.log("Title props:", { title, titleStyles }); // Depuración
  return (
    <div className={`${titleStyles} pb-20`}>
      <span className="after:rounded text-[25px] leading-tight md:text-[35px] md:leading-[1.3] mb-4 font-bold pb-1 relative after:w-2/3 after:bg-secondary after:absolute after:right-0">
        {title}
      </span>
    </div>
  );
}
Title.propTypes = {
  title: PropTypes.string.isRequired, // 'title' debe ser una cadena y es requerido
  titleStyles: PropTypes.string, // 'titleStyles' debe ser una cadena, pero no es obligatorio
};

export default Title;
