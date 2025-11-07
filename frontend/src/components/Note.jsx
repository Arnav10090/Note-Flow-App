import React from "react";
import "../styles/Note.css";

function Note({ note, onDelete, onView }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <article className="note-card" aria-label={`Note: ${note.title}`}>
      <div className="note-main">
        <h4 className="note-title">{note.title}</h4>
        <p className="note-content">{note.content}</p>
      </div>

      <div className="note-footer">
        <time className="note-date" dateTime={note.created_at}>
          {formattedDate}
        </time>

        <div className="note-actions">
          <button
            type="button"
            className="view-button"
            onClick={() => onView && onView(note)}
            aria-label={`View note ${note.title}`}
          >
            View
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this note?")) {
                onDelete(note.id);
              }
            }}
            aria-label={`Delete note ${note.title}`}
          >
            <svg className="trash-icon" viewBox="0 0 24 24" aria-hidden>
              <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default Note;
