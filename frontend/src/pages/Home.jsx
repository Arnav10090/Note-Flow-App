import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [viewNote, setViewNote] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}/`);
      if (res.status === 204) alert("Note deleted!");
      else alert("Failed to delete note.");
    } catch (error) {
      alert(error);
    } finally {
      // refresh notes after deletion attempt
      getNotes();
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/notes/", { content, title });
      if (res.status === 201) {
        alert("Note created!");
        setTitle("");
        setContent("");
        await getNotes();
        // close modal on successful creation
        setShowModal(false);
      } else {
        alert("Failed to make note.");
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="note-page">
      {/* Main content that will be blurred when modal is open (either create modal or view modal) */}
      <div className={`main-content ${showModal || viewNote ? "blurred" : ""}`}>
        <div className="notes-header">
          <div>
            <div className="app-brand">
              <h1 className="brand-title">NoteFlow</h1>
              <span className="brand-section">Notes</span>
            </div>
            <p className="notes-sub">Create and manage your notes quickly</p>
          </div>

          <div className="header-actions">
            <button className="add-note-btn" onClick={() => setShowModal(true)}>
              + Add Note
            </button>
            <button
              className="logout-btn"
              disabled={logoutLoading}
              onClick={() => {
                if (!window.confirm("Are you sure you want to logout?")) return;

                // show loader while logging out
                setLogoutLoading(true);
                // clear tokens
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                // small delay so user sees the loader before navigation
                setTimeout(() => {
                  navigate("/logout");
                }, 2000);
              }}
            >
              {logoutLoading ? (
                <>
                  <svg className="spinner" viewBox="0 0 50 50" aria-hidden>
                    <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
                  </svg>
                  Logging out...
                </>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </div>

        <div className="notes-list">
          {notes.length === 0 ? (
            <p className="no-notes">No notes yet — click "Add Note" to create one.</p>
          ) : (
            notes.map((note) => (
              <Note note={note} onDelete={deleteNote} onView={() => setViewNote(note)} key={note.id} />
            ))
          )}
        </div>
      </div>

      {/* Modal (create note) - only visible when showModal is true */}
      {showModal && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              aria-label="Close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <h3 className="card-title">Create a Note</h3>

            <form className="note-form" onSubmit={createNote}>
              <div className="field">
                <label htmlFor="title" className="label">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="input"
                  placeholder="Give your note a short title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="content" className="label">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  className="textarea"
                  placeholder="Write something useful..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <div className="actions">
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? (
                    <>
                      <svg className="spinner" viewBox="0 0 50 50" aria-hidden>
                        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View full note modal */}
      {viewNote && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setViewNote(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              aria-label="Close"
              onClick={() => setViewNote(null)}
            >
              ×
            </button>

            <h3 className="card-title">{viewNote.title}</h3>
            <div className="full-note-content">
              {viewNote.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;