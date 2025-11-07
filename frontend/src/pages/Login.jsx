import "../styles/Loginform.css";
import Form from "../components/Form";

function Login() {
  return (
    <div className="login-page">
      <div className="login-hero" aria-hidden>
        <div className="hero-inner">
          <div className="app-branding">
            <h1 className="app-title">NoteFlow</h1>
            <p className="app-tagline">Where thoughts become organized</p>
          </div>
          <div className="welcome-section">
            <h2>Welcome back</h2>
            <p className="hero-sub">Sign in to manage your notes quickly and securely.</p>
          </div>
        </div>
      </div>

      <div className="login-card">
        <Form route="/api/token/" method="login" />
      </div>
    </div>
  );
}

export default Login;