import { useRef } from "react";
import html2pdf from "html2pdf.js/dist/html2pdf.bundle.min.js";

const WATERMARK_COUNT = 21;

function App() {
  const formRef = useRef(null);

  const downloadPDF = async () => {
    const form = formRef.current;
    if (!form) return;

    // html2canvas shifts <input> text downward — swap with centered divs for capture
    const inputs = Array.from(form.querySelectorAll("input"));
    const clones = inputs.map((input) => {
      const style = window.getComputedStyle(input);
      const div = document.createElement("div");
      div.className = input.className;
      div.textContent = input.value;
      div.setAttribute("style", input.getAttribute("style") || "");
      Object.assign(div.style, {
        position: style.position,
        left: style.left,
        top: style.top,
        width: style.width,
        height: style.height,
        border: style.border,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        fontFamily: style.fontFamily,
        color: style.color,
        boxSizing: "border-box",
        padding: "0 2px",
        margin: "0",
        display: "flex",
        alignItems: "center",
        lineHeight: "1",
        background: "transparent",
        overflow: "hidden",
        whiteSpace: "nowrap",
        zIndex: "2",
      });
      input.style.visibility = "hidden";
      input.parentNode.insertBefore(div, input);
      return { input, div };
    });

    const opt = {
      margin: 0,
      filename: "MEDICAL.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 3,
        dpi: 300,
        letterRendering: true,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: form.scrollWidth,
        windowHeight: form.scrollHeight,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    try {
      await html2pdf().set(opt).from(form).save();
    } catch (error) {
      console.error("PDF download failed:", error);
      alert("PDF download failed. Please try again.");
    } finally {
      clones.forEach(({ input, div }) => {
        div.remove();
        input.style.visibility = "";
      });
    }
  };

  return (
    <>
      <div id="form-to-download" ref={formRef}>
        <div className="watermark">
          {Array.from({ length: WATERMARK_COUNT }, (_, index) => (
            <span key={index}>
              JUBAIL <span style={{ color: "#b20000" }}>MEDICARE</span> COMPANY
            </span>
          ))}
        </div>

        <div className="content">
          <div className="logo-section">
            <img src="/images/logo2.png" alt="Jubail Medicare Logo" />
          </div>

          <div className="header-section">
            <div></div>
            <div className="header-title">
              <h1 className="header-title">
                MEDICAL CHECK UP SUMMARY / CERTIFICATE
              </h1>
              <hr className="header-hr" />
            </div>
            <div className="qr-section">
              <img src="/images/qr-scan.png" alt="QR Code" className="qr-code" />
              <p className="qr-label">
                Scan QR to Verify
                <br />
                Authenticity
              </p>
            </div>
          </div>

          <div className="form-row">
            <span className="form-label" style={{ left: 0 }}>
              TO
            </span>
            <input
              type="text"
              className="form-field"
              readOnly
              style={{ left: 60, width: 310 }}
            />
            <span className="form-label" style={{ left: 375 }}>
              DATE
            </span>
            <input
              type="text"
              className="form-field"
              readOnly
              defaultValue="20/02/2025 04:48 PM"
              style={{ left: 440, width: 160 }}
            />
          </div>

          <div className="form-row">
            <span className="form-label" style={{ left: 0 }}>
              FILE NO
            </span>
            <input
              type="text"
              className="form-field"
              readOnly
              style={{ left: 60, width: 110 }}
              defaultValue="13875255"
            />
            <span className="form-label" style={{ left: 200 }}>
              CATEGORY
            </span>
            <input
              type="text"
              className="form-field"
              readOnly
              style={{ left: 265, width: 105 }}
              defaultValue="NEW"
            />
            <span className="form-label" style={{ left: 375 }}>
              BLOOD GROUP
            </span>
            <input
              type="text"
              className="form-field"
              readOnly
              style={{ left: 500, width: 100 }}
              defaultValue="A+VE"
            />
          </div>

          <div className="form-section">
            <h2 className="section-title">PERSONAL DETAILS</h2>

            <div className="form-row">
              <span className="form-label" style={{ left: 0 }}>
                NAME
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="BILLAL HOSSAIN"
                style={{ left: 100, width: 500 }}
              />
            </div>

            <div className="form-row">
              <span className="form-label" style={{ left: 0 }}>
                NATIONALITY
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="Bangladesh"
                style={{ left: 100, width: 100, top: -5 }}
              />
              <span className="form-label" style={{ left: 205, top: -3 }}>
                AGE
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="35 YRS"
                style={{ left: 310, width: 176, top: -5 }}
              />
              <span className="form-label" style={{ left: 490, top: -3 }}>
                SEX
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="M"
                style={{ left: 530, width: 70, top: -5 }}
              />
            </div>

            <div className="form-row">
              <span className="form-label" style={{ left: 0, top: -6 }}>
                PASSPORT NO/IQAMA
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                style={{ left: 200, width: 110, top: -10 }}
                defaultValue="2597566708"
              />
              <span className="form-label" style={{ left: 315, top: -6 }}>
                DATE OF BIRTH
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="01/01/1990"
                style={{ left: 487, width: 113, top: -10 }}
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title" style={{ marginTop: -15 }}>
              EMPLOYMENT DETAILS
            </h2>

            <div className="form-row">
              <span className="form-label" style={{ left: 0 }}>
                SPONSOR / COMPANY
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="ACROSS THE DESERTS SAUDI EST."
                style={{ left: 185, width: 415 }}
              />
            </div>

            <div className="form-row j">
              <span className="form-label" style={{ left: 0, top: -3 }}>
                JOB DESCRIPTION
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                style={{ left: 185, width: 280, top: -5 }}
              />
              <span className="form-label" style={{ left: 470, top: -3 }}>
                CITY
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="JUBAIL"
                style={{ left: 520, width: 80, top: -5 }}
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title" style={{ marginTop: -15 }}>
              MEDICAL EXAMINATION
            </h2>

            <div className="form-row">
              <span className="form-label" style={{ left: 0 }}>
                HEIGHT
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="165cm"
                style={{ left: 155, width: 80 }}
              />
              <span className="form-label" style={{ left: 280 }}>
                WEIGHT
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="72 kg"
                style={{ left: 325, width: 140 }}
              />
            </div>

            <div className="form-row">
              <span className="form-label" style={{ left: 0, top: -3 }}>
                PULSE
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="76 b/min"
                style={{ left: 155, width: 80, top: -5 }}
              />
              <span className="form-label" style={{ left: 305, top: -3 }}>
                BP
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="180/20 mmHg"
                style={{ left: 325, width: 140, top: -5 }}
              />
              <span className="form-label" style={{ left: 485, top: -3 }}>
                TEMP
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="36.8 C"
                style={{ left: 520, width: 80, top: -5 }}
              />
            </div>

            <div className="form-row">
              <span className="form-label" style={{ left: 0, top: -6 }}>
                LUNGS & CHEST
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="NORMAL"
                style={{ left: 155, width: 445, top: -10 }}
              />
            </div>

            <div className="form-row">
              <span className="form-label" style={{ left: 0, top: -12 }}>
                CURDIO VASCULAR
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="NORMAL"
                style={{ left: 155, width: 445, top: -15 }}
              />
            </div>

            <div className="form-row">
              <span className="form-label" style={{ left: 0, top: -18 }}>
                NEUROLOGICAL
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="NORMAL"
                style={{ left: 155, width: 445, top: -20 }}
              />
            </div>

            <div className="form-row" style={{ top: 0 }}>
              <span className="form-label" style={{ left: 0 }}>
                VISION
              </span>
              <span
                style={{
                  position: "absolute",
                  left: 119,
                  width: 125,
                  textAlign: "center",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#3c3b3b",
                }}
              >
                N6 = NORMAL
              </span>
              <span
                style={{
                  position: "absolute",
                  left: 335,
                  width: 245,
                  textAlign: "center",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#3c3b3b",
                }}
              >
                N6 = NORMAL
              </span>
            </div>

            <div className="vision-section">
              <div className="vision-row" style={{ top: -5 }}>
                <span className="form-label" style={{ left: 35 }}>
                  NEAR
                </span>
                <span className="form-label" style={{ left: 90 }}>
                  LEFT
                </span>
                <input
                  type="text"
                  className="form-field"
                  readOnly
                  defaultValue="6/6=NORMAL"
                  style={{ left: 119, width: 125 }}
                />
                <span className="form-label" style={{ left: 300 }}>
                  RIGHT
                </span>
                <input
                  type="text"
                  className="form-field"
                  readOnly
                  defaultValue="6/6=NORMAL"
                  style={{ left: 335, width: 245 }}
                />
              </div>

              <div className="vision-row">
                <span className="form-label" style={{ left: 40 }}>
                  FAR
                </span>
                <span className="form-label" style={{ left: 90 }}>
                  LEFT
                </span>
                <input
                  type="text"
                  className="form-field"
                  readOnly
                  defaultValue="6/6=NORMAL"
                  style={{ left: 119, width: 125, top: -3 }}
                />
                <span className="form-label" style={{ left: 300 }}>
                  RIGHT
                </span>
                <input
                  type="text"
                  className="form-field"
                  readOnly
                  defaultValue="6/6=NORMAL"
                  style={{ left: 335, width: 245, top: -3 }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: 335,
                    width: 245,
                    top: 18,
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#3c3b3b",
                  }}
                >
                  WITHOUT GLASSES
                </span>
              </div>

              <div className="vision-row" style={{ marginTop: 30 }}>
                <span className="form-label" style={{ left: 90 }}>
                  LEFT
                </span>
                <input
                  type="text"
                  className="form-field"
                  readOnly
                  defaultValue="6/6=NORMAL"
                  style={{ left: 119, width: 125 }}
                />
                <span className="form-label" style={{ left: 300 }}>
                  RIGHT
                </span>
                <input
                  type="text"
                  className="form-field"
                  readOnly
                  defaultValue="6/6=NORMAL"
                  style={{ left: 335, width: 245 }}
                />
              </div>
            </div>

            <div className="form-row" style={{ marginTop: 25 }}>
              <span className="form-label" style={{ left: 0 }}>
                GENERAL HEAL TH CONDITION
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="NO COUGH-NO FEVER-NO BREATHING DEFFICULTY"
                style={{ left: 265, width: 335 }}
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="NO COVID-19  SYMPTOMS"
                style={{ left: 265, width: 335, top: -5 }}
              />
            </div>

            <div className="form-row">
              <span className="form-label" style={{ left: 0, top: -5 }}>
                APPEARANCE
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="NORMAL"
                style={{ left: 265, width: 335, top: -10 }}
              />
            </div>

            <div className="form-row">
              <span className="form-label" style={{ left: 0, top: -12 }}>
                IF SUFFERING FROM ANY CHRONIC DISEASES
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="NIL"
                style={{ left: 265, width: 335, top: -15 }}
              />
            </div>

            <div className="form-row">
              <span className="form-label" style={{ left: 0, top: -20 }}>
                ADDITIONAL COMMENTS IF ANY
              </span>
              <input
                type="text"
                className="form-field"
                readOnly
                defaultValue="FIT FOR WORK"
                style={{ left: 265, width: 335, top: -20 }}
              />
            </div>
          </div>

          <div
            style={{
              border: "1px solid black",
              textAlign: "center",
              padding: 3,
              marginTop: -10,
              fontSize: 11,
              fontWeight: 600,
              color: "#3c3b3b",
              width: 600,
            }}
          >
            NOTE: THIS MEDICAL FITNESS REPORT IS VALID TILL 19/02/2026
          </div>

          <div className="signature-section">
            <div>
              <p
                style={{
                  fontSize: 13,
                  color: "#000000e3",
                  fontWeight: "bold",
                }}
              >
                DR. SHAHID HUSSAIN ( )
              </p>
              <p style={{ fontSize: 13, color: "#3c3b3b", fontWeight: 500 }}>
                ATTENDING PHYSICIAN
              </p>
              <img
                src="/images/shahed.png"
                alt="Signature 1"
                className="signature-img"
              />
            </div>
            <img
              src="/images/logo-signature.png"
              alt="Logo Signature"
              className="logo-signature-img"
            />
            <div>
              <p
                style={{
                  fontSize: 13,
                  color: "#000000e3",
                  fontWeight: "bold",
                }}
              >
                DR. SAEED ABDUL KHALIQ ( )
              </p>
              <p style={{ fontSize: 13, color: "#3c3b3b", fontWeight: 500 }}>
                MEDICAL DERECTOR
              </p>
              <p></p>
              <img
                src="/images/saeed.png"
                alt="Signature 2"
                className="signature-img"
              />
            </div>
          </div>

          <div className="footer">
            <hr />
            <p className="arabic">
              س.ت ٢٠٥٥٠٢٣٨٤٨ - ص.ب ٢٨٧ - الجبيل ٣١٩٥١ - المملكة العربية
              السعودية - تلفون : +٩٦٦ ١٣ ٣٦٣ ١٨٨٨ - +٩٦٦ ١٣ ٣٦٣ ٢٨٨٨
            </p>
            <p className="contact">
              C.R. 2055023848 - Tel.: +966 13 363 1888 - +966 13 363 2888 - P.O.
              Box 287 Jubail 31951 - Kingdom of Saudi Arabia
            </p>
            <p className="email">
              E-mail: info@jubailmedicare.com - Website: www.jubailmedicare.com
            </p>
          </div>
        </div>
      </div>

      <button id="download-btn" className="download-btn" onClick={downloadPDF}>
        Download PDF
      </button>
    </>
  );
}

export default App;
