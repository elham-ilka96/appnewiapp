// ContactPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./contactPage.css";

function ContactPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState("شماره تماس");
  const navigate = useNavigate(); 

  const validatePhoneNumber = (number) => {
    // بررسی شماره تماس (11 رقم)
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      setError('لطفاً شماره تماس خود را وارد کنید.');
    } else if (!validatePhoneNumber(phoneNumber)) {
      setError('خطا در ارتباط با سرور');
      setMessage('');
      setPhoneNumber(''); // پاک کردن شماره تماس
    } else {
      setError('');
      // تغییر مسیر به صفحه جدید
      navigate('/newpage'); 
    }
  };

  return (
    <div className='login'>
      <div className="phonFrom">
        <h2>ورود به حساب کاربری</h2>
        <p>شماره تماس خود را در قسمت زیر وارد نمایید</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="errorMessage">{error}</p>}
          <div>
            <label htmlFor="phon">{message}</label>
            <input
              id="phon"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder=""
              className={error ? "inputError" : ""}
            />
          </div>
          <br />
          <p>
            عضویت در آی اپس به منزله اطلاع از کلیه{" "}
            <a className="termsButton" href="/terms">
              قوانین
            </a>{" "}
            و پذیرش آنها می باشد.
          </p>
          <button type="submit">بعدی</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
