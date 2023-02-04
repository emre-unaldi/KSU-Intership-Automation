import React from "react";
import { useSelector } from "react-redux";

function TeacherFooter() {
  const ksuLink = useSelector((state) => state.system.ksuLink);

  return (
    <footer id="footer" className="footer">
      <div className="copyright">
        Tüm hakları{" "}
        <strong>
          <span>KSÜ</span>
        </strong>{" "}
        tarafından saklıdır. &copy; 2022
      </div>
      <div className="credits">
        Tasarım ve Geliştirme: <a href={ksuLink}>Öğretmen</a>
      </div>
    </footer>
  );
}

export default TeacherFooter;
