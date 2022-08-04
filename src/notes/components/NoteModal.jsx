import Modal from "react-modal";
import { useUiStore } from "../../hooks/useUiStore";
import { useNotesStore } from "../../hooks/useNotesStore";
import { useEffect, useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "80%",
    height: "95%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "10px",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement(document.getElementById("root"));

export const NoteModal = () => {
  const { isNoteModalOpen, closeNoteModal } = useUiStore();
  const { activeNote, startSavingNote } = useNotesStore();

  const [formValues, setFormValues] = useState({});

  const [newCategory, setNewCategory] = useState("");

  //const { title, content, categories } = activeNote || {};
  //console.log({ title, content, categories });

  useEffect(() => {
    if (activeNote !== null) setFormValues({ ...activeNote });
    else
      setFormValues({
        title: "Title",
        content: "Content",
        categories: ["no-category"],
      });
  }, [activeNote]);

  let { categories } = formValues;
  //console.log(categories);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onInputCategory = ({ target }) => {
    setNewCategory(target.value);
  };

  const onBadgeClick = (category) => {
    categories = categories.filter((cat) => cat !== category);
    if(categories.length === 0) categories = ['no-category'];
    setFormValues({
      ...formValues,
      categories,
    });
  };

  const onAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.length > 0) {
      categories = [...categories, newCategory];
      setFormValues({
        ...formValues,
        categories,
      });
      //console.log(categories)
      setNewCategory("");
    }
  }

  const onSubmit = async () => {
    //console.log("onSubmit");
    startSavingNote(formValues);
    closeNoteModal();
  };

  const onCloseModal = () => {
    closeNoteModal();
  };

  return (
    <Modal
      isOpen={isNoteModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName="modal-fondo"
    >
      <h1> Create/edit note </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mt-2 mb-2">
          <label>Title</label>
          <input
            name="title"
            value={formValues.title}
            type="text"
            className="form-control"
            placeholder="Title"
            onChange={onInputChange}
            required
          />
          <label>Content</label>
          <textarea
            style={{ height: "150px" }}
            name="content"
            value={formValues.content}
            className="form-control"
            placeholder="Content"
            onChange={onInputChange}
            required
          />
          <label>Categories</label>
          <br />
          {categories &&
            categories.map((category) => (
              <button
                key={category}
                type="button"
                className="btn btn-dark me-1"
                onClick={() => onBadgeClick(category)}
              >
                {category}{" "}
                <span className="badge rounded-pill text-bg-dark">X</span>
              </button>
            ))}
          <input
            name="category"
            value={newCategory}
            type="text"
            onChange={onInputCategory}
            className="form-control mt-2 mb-2"
            placeholder="Add a category"
          />
          <button className="btn btn-outline-dark me-3" onClick={onAddCategory}>Add Category</button>
        </div>
        <hr />
        <div className="form-group mt-2 mb-2">
          <button className="btn btn-dark me-3">Save</button>
          <button className="btn btn-dark" onClick={onCloseModal}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
