"use client"
import { useEffect } from "react";
import Script from "next/script";
import './style.css'
declare global {
  interface Window {
    google:any,
    googleTranslateElementInit:any
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
        },
        "google_translate_element"
      );
    };

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <div className="google-translate-container">
        <div className="flex items-center justify-center">
          <div
            id="google_translate_element"
            className="google-translate-element"
          ></div>
        </div>
      </div>
    </>
  );
};

export default GoogleTranslate;
