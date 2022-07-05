import { useEffect, useState } from "react";
import Input from "../Input";

export default function Modal({
  setManga,
  text,
  color,
  dataEdit,
  setDataEdit,
  activeModal,
  setActiveModal,
}) {
  const [modal, setModal] = useState("");
  const [inputs, setInputs] = useState({});

  function toggleModal() {
    setModal((old) => (old === "modal-open" ? "" : "modal-open"));
    setActiveModal(false);
    if (!activeModal) {
      setInputs({});
    }
  }

  useEffect(() => {
    if (activeModal) {
      setInputs(dataEdit[0]);
      return toggleModal();
    }
    return;
  }, [activeModal]);

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!dataEdit) {
      setManga((val) => [
        ...val,
        {
          id: +new Date(),
          title: inputs.title,
          author: inputs.author,
          year: inputs.year,
        },
      ]);
      setInputs({});
      return setModal("");
    }
    setManga((val) => {
      const index = val.findIndex((item) => item.id === dataEdit[0].id);
      const newValue = {
        id: inputs.id,
        title: inputs.title,
        author: inputs.author,
        year: inputs.year,
      };
      val[index] = newValue;
      return val;
    });

    setDataEdit("");
    setModal("");
  }

  return (
    <>
      <label onClick={toggleModal} className={`btn btn-sm ${color}`}>
        {text}
      </label>

      <div className={`modal ${modal}`}>
        <div className="modal-box relative">
          <div
            onClick={toggleModal}
            className="font-bold absolute right-4 top-2 cursor-pointer"
          >
            ✕
          </div>
          <form className="space-y-6 pt-8" onSubmit={handleSubmit}>
            <div className="form-control">
              <Input
                type="text"
                onChange={handleInput}
                placeholder="Title"
                name="title"
                val={inputs.title || ""}
              />
            </div>
            <div className="form-control">
              <Input
                type="text"
                onChange={handleInput}
                placeholder="Author"
                name="author"
                val={inputs.author || ""}
              />
            </div>
            <div className="form-control">
              <Input
                type="text"
                onChange={handleInput}
                placeholder="Year"
                name="year"
                val={inputs.year || ""}
              />
            </div>
            <button type="submit" className="btn btn-medium bg-blue-500">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
