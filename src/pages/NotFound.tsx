import React from "react";
import "./NotFound.css";

const NotFound: React.FC = () => {
  return (
    <div className="background-img">
      <div className="space"></div>
      <div className="wrapper">
        <div className="img-wrapper">
          <span>44</span>
        </div>
        <p>
          صفحه‌ای که دنبال آن هستید به یک
          <br />
           جهان دیگر منتقل شده است!
        </p>
        <button style={{color : "#e38317"}} type="button" onClick={() => (window.location.href = "/")}>
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
};

export default NotFound;
