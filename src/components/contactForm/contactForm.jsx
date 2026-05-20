import { useEffect, useRef, useState } from "react";
import "./contactForm.css"

import MessageSent_Icon from "../../assets/img/icon-success-check.svg"

export default function ContactForm() {
    const [isgeneralrequest, setgeneralrequest] = useState(null);
    const [ismobile, setismobile] = useState(false);
    const [isposting, setisposting] = useState(false);
    const sucesspoput = useRef(null);
    const labelcheckbox = useRef(null);
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
        querytype: querytype_span,
        message: message_span,
        agreeterms: agreeterms_span
    }
    const firstname_input = useRef(null);
    const lastname_input = useRef(null);
    const email_input = useRef(null);
    const querytype_input = useRef(null);
    const message_input = ureRef(null);
    const agreeterms_input = useRef(null);
    const inputfirstoption = useRef(null);
    const inputsecondoption = useRef(null);
    const input_ref = {
        firstname: firstname_input,
        lastname: lastname_input,
        email: email_input,
        querytype: querytype_input,
        message: message_input,
        agreeterms: agreeterms_input,
        general_radio: inputfirstoption,
        support_radio: inputsecondoption
    }
    useEffect(() => {
        if (isgeneralrequest === true) inputfirstoption.current.checked = true;
        else if (isgeneralrequest === false) inputsecondoption.current.checked = true
        else return
    }, [isgeneralrequest])
    const sendsucessmesage = () => {
        if (sucesspoput !== null && sucesspoput.current) {
            const tab = sucesspoput.current
            tab.classList.add("notify-animation-style")
            setTimeout(() => tab.classList.remove("notify-animation-style"), 5000);
        }
        else console.log("Thanks for completing the form. We'll be in touch soon!")
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        if (isposting) return
        setisposting(true)
        const form = e.target;
        const data = new FormData(form);
        const fields = ['firstname', 'lastname', 'email', 'querytype', 'message', 'agreeterms'];
        fields.forEach((element) => {
            if (!data.get(element) || data.get(element).trim() === "") {
                const elementmessage = span_ref[element]
                const errormessage = span_ref[element].current
                if (elementmessage === email_span) email_span.current.textContent = "Field required." 
                if (errormessage) {
                    errormessage.classList.remove("no-visible-style");
                    setTimeout(() => errormessage.classList.add("no-visible-style"), 5000);
                }
                setisposting(false)
            }
        })
        if (fields.every(element => data.has(element) && data.get(element).trim() !== "")) {
            sendsucessmesage();
            const radios = ["general_radio", "support_radio"]
            const actualinputs = [...fields, ...radios]
            actualinputs.forEach((element) => {
                const input = input_ref[element].current
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (input && input.type === 'text') input.value = ""
                else if (input && input.type === 'radio' && input.checked === true) input.checked = false
                else if (input && input.type === 'email' && !regex.test(input.value)) {
                    email_input.current.textContent = ""
                }
            })
            setTimeout(() => { setisposting(false) }, 5000);
        }
    }
    return (
        <div style={{ width: `${!ismobile ? "50%" : "85%"}` }} className="div-contactform-fullcontext">
            <form onSubmit={handlesubmit} className="form-fullcontext flex-collumn-style">
                <h1 className="h1-form-title">Contact Us</h1>
                <div className="div-form-input-context flex-collumn-style">
                    <div className={`div-name-block ${!ismobile ? "flex-row-style" : "flex-collumn-style"}`}>
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
                    <div className="flex-collumn-style">
                        <label className="label-main-typequery-style label-field-style">Query Type <span className="span-requiredfield-style">*</span></label>
                        <div className={`div-typequery-option-block ${!ismobile ? "flex-row-style" : "flex-collumn-style"}`}>
                            <div onClick={() => setgeneralrequest(true)} className={`div-typequery-optionstyle flex-row-style ${isgeneralrequest === true ? "selected-option-style" : ""}`}>
                                <input ref={inputfirstoption} className="radio-typequery-style" type="radio" name="typequery" value="General Enquiry" />
                                <label className="label-typequery-style">General Enquiry</label>
                            </div>
                            <div onClick={() => setgeneralrequest(false)} className={`div-typequery-optionstyle flex-row-style ${isgeneralrequest === false ? "selected-option-style" : ""}`}>
                                <input ref={inputsecondoption} className="radio-typequery-style" type="radio" name="typequery" value="Support Request" />
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
                            <input ref={labelcheckbox} type="checkbox" name="agreeterms" className="check-contact-agree" />
                            <label onClick={() => labelcheckbox.current.checked = !labelcheckbox.current.checked} className="label-field-style label-contact-agree">I consent to being contacted by the team <span className="span-requiredfield-style">*</span></label>
                        </div>
                        <span ref={agreeterms_span} className="span-error-style no-visible-style">Field required.</span>
                    </div>
                    <button type="submit" className="button-submit-form">Submit</button>
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