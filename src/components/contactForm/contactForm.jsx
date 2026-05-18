import { useEffect, useRef, useState } from "react";
import "./contactForm.css"

import MessageSent_Icon from "../../assets/img/icon-success-check.svg"

export default function ContactForm() {
    const [ismobile, setismobile] = useState(false);
    const [isposting, setisposting] = useState(false);
    const [firstsubmit, setfirstsubmit] = useState(false);
    const inputcheckbox = useRef(null);
    const firstname_span = useRef(null);
    const lastname_span = useRef(null);
    const email_span = useRef(null);
    const querytype_span = useRef(null);
    const message_span = useRef(null);
    const agreeterms_span = useRef(null);
    const span_ref = {
        firstname: firstname_span,
        lastname: lastname_span,
        email: email_span,
        typequery: querytype_span,
        message: message_span,
        agreeterms: agreeterms_span
    }
    const sucesspoput = useRef(null);
    const radio_general = useRef(null)
    const radio_support = useRef(null);
    useEffect(() => {
        const query = window.matchMedia("(max-width: 768px)");
        const onchange = (e) => setismobile(e.matches);
        query.addEventListener("change", onchange);
        return () => query.removeEventListener("change", onchange);
    }, [])
    const sendsucessmesage = () => {
        if (sucesspoput !== null && sucesspoput.current) {
            const tab = sucesspoput.current
            tab.classList.add("notify-animation-style")
            setTimeout(() => tab.classList.remove("notify-animation-style"), 2500);
        }
        else console.log("Thanks for completing the form. We'll be in touch soon!")
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        if (isposting || !firstsubmit) return
        setisposting(true)
        const form = e.target;
        const data = new FormData(form);
        const fields = ['firstname', 'lastname', 'email', 'typequery', 'message', 'agreeterms'];
        fields.forEach((element) => {
            if (!data.get(element) || data.get(element).trim() === "") {
                const errormessage = span_ref[element].current
                if (errormessage) {
                    errormessage.classList.remove("no-visible-style");
                    setTimeout(() => errormessage.classList.add("no-visible-style"), 5000);
                }
                setisposting(false)
            }
        })
        if (fields.every(element => data.has(element) && data.get(element).trim() !== "")) {
            sendsucessmesage();
            setTimeout(() => setisposting(false), 2500);
        }
    }
    return (
        <div className="div-contactform-fullcontext">
            <form onSubmit={handlesubmit} className="form-fullcontext flex-collumn-style">
                <h1 className="h1-form-title">Contact Us</h1>
                <div className="div-form-input-context flex-collumn-style">
                    <div className="div-name-block">
                        <div className="div-name-field-block labelinput-gap-style flex-collumn-style">
                            <label className="label-field-style">First Name <span className="span-requiredfield-style">*</span></label>
                            <input className="textinput-style" type="text" name="firstname" />
                            <span ref={firstname_span} className="span-error-style no-visible-style">Field required.</span>
                        </div>
                        <div className="div-name-field-block labelinput-gap-style flex-collumn-style">
                            <label className="label-field-style">Last Name <span className="span-requiredfield-style">*</span></label>
                            <input className="textinput-style" type="text" name="lastname" />
                            <span ref={lastname_span} className="span-error-style no-visible-style">Field required.</span>
                        </div>
                    </div>
                    <div className="labelinput-gap-style flex-collumn-style">
                        <label className="label-field-style">Email <span className="span-requiredfield-style">*</span></label>
                        <input className="textinput-style" type="email" name="email" />
                        <span ref={email_span} className="span-error-style no-visible-style">Field required.</span>
                    </div>
                    <div className="div-typequery-block flex-collumn-style">
                        <h1 className="label-field-style">Query Type <span className="span-requiredfield-style">*</span></h1>
                        <div className="div-typequery-option-block">
                            <div onClick={() => radio_general.current.checked = true} className={`div-typequery-optionstyle flex-row-style ${g ? "selected-option-style" : ""}`}>
                                <input ref={radio_general} className="radio-typequery-style" type="radio" name="typequery" value="General Enquiry" />
                                <label className="label-typequery-style">General Enquiry</label>
                            </div>
                            <div onClick={() => radio_support.current.checked = true} className={`div-typequery-optionstyle flex-row-style ${radio_support.current.checked ? "selected-option-style" : ""}`}>
                                <input ref={radio_support} className="radio-typequery-style" type="radio" name="typequery" value="Support Request" />
                                <label className="label-typequery-style">Support Request</label>
                            </div>
                        </div>
                        <span ref={querytype_span} className="span-error-style no-visible-style">Field required.</span>
                    </div>
                    <div className="labelinput-gap-style flex-collumn-style">
                        <label className="label-field-style">Message <span className="span-requiredfield-style">*</span></label>
                        <textarea name="message" className="textarea-message textinput-style" maxLength={255}></textarea>
                        <span ref={message_span} className="span-error-style no-visible-style">Field required.</span>
                    </div>
                    <div className="labelinput-gap-style flex-collumn-style">
                        <div className="div-agreeterms-block flex-row-style">
                            <input ref={inputcheckbox} type="checkbox" name="agreeterms" className="check-contact-agree" />
                            <label onClick={() => labelinputcheckboxcheckbox.current.checked = !inputcheckbox.current.checked} className="label-field-style label-contact-agree">I consent to being contacted by the team <span className="span-requiredfield-style">*</span></label>
                        </div>
                        <span ref={agreeterms_span} className="span-error-style no-visible-style">Field required.</span>
                    </div>
                    <button onClick={() => setfirstsubmit(true)} type="submit" className="button-submit-form">Submit</button>
                </div>
            </form>
            <div ref={sucesspoput} className="div-sucessmessage-context flex-collumn-style">
                <div className="div-sucessmessage-header flex-row-style">
                    <img className="img-sucessmessage-icon" src={MessageSent_Icon} />
                    <h1 className="h1-sucessmessage-title">Message Sent!</h1>
                </div>
                <p className="p-sucessmessage-description">Thanks for completing the form. We'll be in touch soon!</p>
            </div>
        </div>
    );
}