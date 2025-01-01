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
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phoneNumber.length > 11) {
      setError('خطا در ارتباط با سرور');
      setMessage('');
    } else if (validatePhoneNumber(phoneNumber)) {
      setError('');
      
      navigate('/newpage'); // هدایت به صفحه جدید
    } 
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    // پاک کردن پیام خطا در هنگام تغییر ورودی
    if (value.length <= 11) {
      setError('');
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
    {!error && <label className='shomareTamas'>{message}</label>}
    <input
      id="phon"
      type="text"
      value={phoneNumber}
      onChange={handleInputChange}
      placeholder=""
      className={`phoneInput ${error ? "inputError" : ""}`}
    />
  </div>
  <br />
  <p>
    عضویت در آی اپس به منزله اطلاع از کلیه{" "}
    <a className="termsButton" href="https://app.iapps.ir/terms">
      قوانین
    </a>{" "}
    و پذیرش آنها می باشد.
  </p>
  <button
    type="submit"
    className={`submitButton ${
      phoneNumber.length >= 11 ? "active" : ""
    }`}
    disabled={phoneNumber.length < 11}
  >
    بعدی
  </button>
</form>

      </div>
    </div>
  );
}

export default ContactPage;
