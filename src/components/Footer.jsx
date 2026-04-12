export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-disclaimer">
            <span className="footer-disclaimer-icon">⚕️</span>
            <p>
              Die Inhalte auf VitalWissen dienen ausschließlich der allgemeinen Information
              und ersetzen <strong>keinen Arztbesuch, keine Diagnose und keine Behandlung</strong>.
              Bei gesundheitlichen Beschwerden wende dich an eine Ärztin oder einen Arzt.
            </p>
          </div>
          <div className="footer-meta">
            <span className="footer-badge">Werbefrei · Kein Affiliate · Kein Sponsoring</span>
            <span className="footer-copy">© {new Date().getFullYear()} VitalWissen</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
