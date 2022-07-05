import { useState } from "react";
import Modal from "../Modal";

export default function Content() {
  const [manga, setManga] = useState([]);
  const [dataEdit, setDataEdit] = useState("");
  const [isActive, setActive] = useState(false);

  function rmManga(id) {
    setManga(manga.filter((item) => item.id !== id));
  }

  function upManga(id) {
    const result = manga.filter((item) => item.id === id);
    setDataEdit(result);
    setActive(!isActive);
  }

  return (
    <main className="pt-20">
      <div className="pl-8">
        <Modal
          setManga={setManga}
          text="add manga"
          color="btn-primary"
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
          activeModal={isActive}
          setActiveModal={setActive}
        />
      </div>
      <section className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {manga?.map((item) => (
          <div key={item.id} className="card shadow-md">
            <div className="card-body">
              <div className="card-title flex-col items-start">
                <h1>{item.title}</h1>
                <small className="text-sm font-normal italic">
                  release: {item.year}
                </small>
              </div>
              <p>Author: {item.author}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => rmManga(item.id)}
                  className="btn btn-sm bg-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => upManga(item.id)}
                  className="btn btn-sm bg-blue-500"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
