import { useEffect, useRef, useState } from "react";
import "./contactForm.css"

import MessageSent_Icon from "../../assets/img/icon-success-check.svg"

export default function ContactForm() {
    const [isgeneralrequest, setgeneralrequest] = useState(null);
    const [isradiochecked, setradiochecked] = useState(false)
    const [isposting, setisposting] = useState(false);
    const handleinputstyle = (setrequest) => {
        setradiochecked(true);
        setgeneralrequest(setrequest)
    }
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
    const agreeterms_input = useRef(null);
    const inputfirstoption = useRef(null);
    const inputsecondoption = useRef(null);
    const message_input = useRef(null);
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
        if (sucesspoput && sucesspoput.current) {
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
            const errormessage = span_ref[element].current
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const handleerror = () => {
                errormessage.classList.remove("no-visible-style");
                setTimeout(() => errormessage.classList.add("no-visible-style"), 5000);
            }
            if (!data.get(element) && errormessage || data.get(element).trim() === "" && errormessage) {
                errormessage.textContent = "Field required."
                handleerror()
            }
            else if (element === 'email' && !regex.test((data.get('email')).trim())) {
                errormessage.textContent = "Please enter a valid email address"
                handleerror();
            }
        })
        if (fields.every(element => data.has(element) && data.get(element).trim() !== "")) {
            const radios = ["general_radio", "support_radio"]
            const actualinputs = [...fields, ...radios]
            actualinputs.forEach((element) => {
                const input = input_ref[element].current
                if (input && input.type === 'text' || input && input.type === 'email') input.value = ""
                else if (input && input.type === 'radio' || input && input.type === 'checkbox') {
                    input.checked = false
                    setradiochecked(false);
                }
                else if (input && input.type === 'textarea') input.value = "";
                else return
            })
            sendsucessmesage();
        }
        setTimeout(() => { setisposting(false) }, 5000);
    }
    return (
        <div className="div-contactform-fullcontext">
            <form onSubmit={handlesubmit} noValidate className="form-fullcontext flex-collumn-style">
                <h1 className="h1-form-title">Contact Us</h1>
                <div className="div-form-input-context flex-collumn-style">
                    <div className="div-name-block flex-collumn-style">
                        <div className="div-name-field-block labelinput-gap-style flex-collumn-style">
                            <label className="label-field-style">First Name <span className="span-requiredfield-style">*</span></label>
                            <input ref={firstname_input} className="textinput-style" type="text" name="firstname" required />
                            <span ref={firstname_span} className="span-error-style no-visible-style">Field required.</span>
                        </div>
                        <div className="div-name-field-block labelinput-gap-style flex-collumn-style">
                            <label className="label-field-style">Last Name <span className="span-requiredfield-style">*</span></label>
                            <input ref={lastname_input} className="textinput-style" type="text" name="lastname" required />
                            <span ref={lastname_span} className="span-error-style no-visible-style">Field required.</span>
                        </div>
                    </div>
                    <div className="labelinput-gap-style flex-collumn-style">
                        <label className="label-field-style">Email <span className="span-requiredfield-style">*</span></label>
                        <input ref={email_input} className="textinput-style" type="email" name="email" required />
                        <span ref={email_span} className="span-error-style no-visible-style">Field required.</span>
                    </div>
                    <div className="flex-collumn-style">
                        <label className="label-main-typequery-style label-field-style">Query Type <span className="span-requiredfield-style">*</span></label>
                        <div className="div-typequery-option-block flex-row-style">
                            <div onClick={() => handleinputstyle(true)} className={`div-typequery-optionstyle flex-row-style ${isgeneralrequest === true && isradiochecked ? "selected-option-style" : ""}`}>
                                <input ref={inputfirstoption} className="radio-typequery-style" type="radio" name="querytype" value="General Enquiry" required />
                                <label className="label-typequery-style">General Enquiry</label>
                            </div>
                            <div onClick={() => handleinputstyle(false)} className={`div-typequery-optionstyle flex-row-style ${isgeneralrequest === false && isradiochecked ? "selected-option-style" : ""}`}>
                                <input ref={inputsecondoption} className="radio-typequery-style" type="radio" name="querytype" value="Support Request" required />
                                <label className="label-typequery-style">Support Request</label>
                            </div>
                        </div>
                        <span ref={querytype_span} className="span-error-style no-visible-style">Field required.</span>
                    </div>
                    <div className="labelinput-gap-style flex-collumn-style">
                        <label className="label-field-style">Message <span className="span-requiredfield-style">*</span></label>
                        <textarea ref={message_input} name="message" className="textarea-message textinput-style" maxLength={255} required></textarea>
                        <span ref={message_span} className="span-error-style no-visible-style">Field required.</span>
                    </div>
                    <div className="labelinput-gap-style flex-collumn-style">
                        <div className="div-agreeterms-block flex-row-style">
                            <input ref={agreeterms_input} type="checkbox" name="agreeterms" className="check-contact-agree" required />
                            <label onClick={() => agreeterms_input.current.checked = !agreeterms_input.current.checked} className="label-field-style label-contact-agree">I consent to being contacted by the team <span className="span-requiredfield-style">*</span></label>
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