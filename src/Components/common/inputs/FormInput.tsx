import { FaCheckCircle } from "components/common/icons/index";

interface IFormInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  handleChange: (e: any) => void;
  error: string;
}
//TODO: change the way errors are handled
const FormInput = ({ label, name, type = "text", value, handleChange, error = "" }: IFormInputProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name}>{label}</label>
      {type === "textArea" ? (
        <textarea
          id={name}
          className="form-control"
          rows={5}
          onChange={(e) => {
            handleChange(e);
          }}
          defaultValue={value}></textarea>
      ) : (
        <input
          type={type}
          id={name}
          className="form-control"
          placeholder={label}
          value={value}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      )}
      {error && <strong className="error">{error}</strong>}
      {!error && value ? <FaCheckCircle className="success" /> : null}
    </div>
  );
};

export default FormInput;
