const initialData = {
  name: "",
  email: "",
  comment: "",
};

const CommentForm = (props) => {
  const { blogId, setUpdateComments } = props;
  const [formData, setFormData] = React.useState(initialData);
  const [loading, setLoading] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [result, setResult] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.classList.add("submitted");
    const allInputs = e.target.querySelectorAll(".input-text");
    const allValid = Array.from(allInputs).every((input) =>
      input.classList.contains("correct")
    );

    if (allValid) {
      setLoading(true);
      e.target.classList.remove("submitted");

      const data = {
        commentedBy: formData.name,
        description: formData.comment,
      };

      const Services = new window.CommentServices();
      Services.addBlogComment(blogId, data)
        .then((data) => {
          setResult(data);
          setUpdateComments(true);
          setLoading(false);
          setFormData(initialData);
          e.target.classList.remove("submitted");
          allInputs.forEach((input) => {
            input.classList.remove('correct');
    
            // const user = JSON.parse(localStorage.getItem('user')) || '';
            // if (user) {
            //   setFormData({...formData, email: user.email});
            //   const email = document.querySelector('#email');
            //   email.classList.add('correct');
            // }
          });
          // eslint-disable-next-line no-undef
          Toastify({
            text: data.data.message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            stopOnFocus: true,
          }).showToast();
        })
        .catch((error) => {
          // eslint-disable-next-line no-undef
          Toastify({
            text: result.data.message || error,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
            stopOnFocus: true,
          }).showToast();
        });
    }
  };

  return (
    <div className="addComment flex-col">
      <h2 className="title">
        Add comment <span>( )</span>
      </h2>
      <form
        className="contactMe"
        data-aos="zoom-out-up"
        onSubmit={(e) => handleSubmit(e)}
      >
        <InputElement
          name="FullName"
          type="text"
          value={formData.name}
          onChange={(input) => setFormData({ ...formData, name: input })}
        />
        <InputElement
          name="Email"
          type="email"
          value={formData.email}
          onChange={(input) => setFormData({ ...formData, email: input })}
        />
        <InputElement
          name="Comment"
          type="textarea"
          value={formData.comment}
          onChange={(input) => setFormData({ ...formData, comment: input })}
        />
        <button
          type="submit"
          className="button"
          id="submitButton"
          disabled={loading}
        >
          {loading && <span className="loader show"></span>}
          {loading? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

window.CommentForm = CommentForm;

const InputElement = (props) => {
  const { name, type, value, onChange } = props;
  const regExPatterns = window.regExPatterns;

  const formatName = (text) => {
    return text.toLowerCase().replace(" ", "-");
  };

  return (
    <span className="input-text">
      <label htmlFor={formatName(name)}>{name}:</label>
      {type && type === "textarea" ? (
        <textarea
          type={type}
          id={formatName(name)}
          placeholder={`${name} ...`}
          value={value}
          onChange={(e) => {
            checkInput(regExPatterns[name], e.target);
            onChange(e.target.value);
          }}
        />
      ) : (
        <input
          type={type}
          id={formatName(name)}
          placeholder={`${name} ...`}
          value={value}
          onChange={(e) => {
            checkInput(regExPatterns[name], e.target);
            onChange(e.target.value);
          }}
        />
      )}
      <span className="error-message">{`Please enter a valid ${name}!`}</span>
      <span className="formIcon"></span>
    </span>
  );
};

const checkInput = (regEx, input) => {
  const nearestCorrectIcon = input.closest(".input-text");

  if (regEx.test(input.value) && input.value !== "") {
    nearestCorrectIcon.classList.add("correct");
    nearestCorrectIcon.classList.remove("notCorrect");
  } else if (!regEx.test(input.value) && input.value.length > 0) {
    nearestCorrectIcon.classList.add("notCorrect");
    nearestCorrectIcon.classList.remove("correct");
  } else {
    nearestCorrectIcon.classList.remove("correct");
    nearestCorrectIcon.classList.remove("notCorrect");
  }
};
