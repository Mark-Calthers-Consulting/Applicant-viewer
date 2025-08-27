import modalStyles from './Modal.module.css'
import {
    User,
    Calendar,
    Heart,
    Mail,
    Phone,
    MapPin,
    Building2,
    BadgeCheck,
    FileText,
    MessageSquareText,
    BookOpen,
    GraduationCap,
    BadgeInfo,
    ClipboardSignature,
    X
} from 'lucide-react';

const Backdrop = ({ onClick }) => {
    return <div className={modalStyles.backdrop} onClick={onClick}></div>
}

const Modal = ({ isOpen, onClose, modalData }) => {
    // console.log(modalData)



    if (!isOpen) return null
    return (
        <>
            <Backdrop onClick={onClose} />
            <div className={modalStyles.modal}>
                <button onClick={onClose} className={modalStyles.closeButton}><X size={28} /></button>
                {/* <X onClick={onClose} /> */}
                <div className={modalStyles.modalContent}>

                    <div className={modalStyles.modalHeader}>
                        <h5>Applicant Name</h5>
                        <h2>{modalData.Surname} {modalData['Other Names']}</h2>
                    </div>

                    <div className={modalStyles.modalBody}>
                        {/* PERSONAL INFO */}
                        <section>
                            <h4><User size={16} /> Personal Info</h4>
                            <p><strong>Gender:</strong> {modalData.Gender}</p>
                            <p><strong><Calendar size={14} /> Date of Birth:</strong> {modalData['Date of Birth']}</p>
                            <p><strong>Age Next Birthday:</strong> {modalData['Age Next Birthday']}</p>
                            <p><strong><Heart size={14} /> Marital Status:</strong> {modalData['Marital Status']}</p>
                        </section>

                        {/* CONTACT DETAILS */}
                        <section>
                            <h4><MapPin size={16} /> Contact Info</h4>
                            <p><strong>Residential Address:</strong> {modalData['Residential Address']}</p>
                            <p><strong><Mail size={14} /> Email:</strong> {modalData['Email Address'] || modalData['Email Address_1']}</p>
                            <p><strong><Phone size={14} /> Phone:</strong> {modalData['Phone number']}</p>
                            {modalData['WhatsApp Number (if different)'] && (
                                <p><strong>WhatsApp:</strong> {modalData['WhatsApp Number (if different)']}</p>
                            )}
                        </section>

                        {/* EMPLOYMENT INFO */}
                        <section>
                            <h4><Building2 size={16} /> Employment</h4>
                            <p><strong>Currently Employed:</strong> {modalData['Are you currently Employed? ']}</p>
                            <p><strong>Department Applied:</strong> {modalData['\t']}</p>
                            <p><strong>Previous Company:</strong> {modalData['If yes above, state name of company'] || 'N/A'}</p>
                            <p><strong>Position:</strong> {modalData["If yes above, what's your current position?"] || 'N/A'}</p>
                            <p><strong>Salary:</strong> {modalData["If yes above, what's your current salary?"] || 'N/A'}</p>
                            <p><strong>Notice Period:</strong> {modalData['Job Cessation Notice Period Needed'] || 'N/A'}</p>
                            <p><strong>Minimum Salary Expectation:</strong> {modalData['Minimum Salary Expectation If Considered']}</p>
                            <p><strong>Okay with lower salary?</strong> {modalData['Should we contact you if the proposed salary is lower than your expected minimum figures?']}</p>
                        </section>

                        {/* EDUCATION & CERTIFICATIONS */}
                        <section>
                            <h4><GraduationCap size={16} /> Education & Certifications</h4>
                            <p><strong>Highest Qualification:</strong> {modalData['  Highest Educational Qualification  ']}</p>
                            <p><strong>NYSC Status:</strong> {modalData['NYSC Certification Status']}</p>
                            <p><strong>Post-NYSC Experience (years):</strong> {modalData['How many years post NYSC experience do you have?']}</p>
                            {modalData['If you have any other certifications or qualifications, please specify'] && (
                                <p><strong>Other Certifications:</strong> {modalData['If you have any other certifications or qualifications, please specify']}</p>
                            )}
                        </section>

                        {/* APPLICATION */}
                        <section>
                            <h4><ClipboardSignature size={16} /> Application</h4>
                            <p><strong>Social Media Followed:</strong> {modalData['Which of our social media handles are you following?']}</p>
                            <p><strong><MessageSquareText size={14} /> Interest in Position:</strong></p>
                            <p>{modalData['Briefly describe, in 100 words or fewer, why you are interested in this position. ']}</p>
                            <p><strong><FileText size={14} /> CV / Cover Letter:</strong> <a href={modalData['Submit your cover letter and CV/Resume']} target="_blank" rel="noopener noreferrer">View Document</a></p>
                            <p><strong>Consent to Background Check:</strong> {modalData['If successful with the application process, MCC will conduct a background check on the contents of this form, do you have any objection to this?']}</p>
                        </section>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Modal

// <div className={modalStyles.modal}>
//     <div className={modalStyles.modalHeader}>
//         <h5>Applicant Name</h5>
//         <h2>{modalData.Surname} {modalData['Other Names']}</h2>
//     </div>

//     <div className={modalStyles.modalBody}>
//         {/* PERSONAL INFO */}
//         <section>
//             <h4>Personal Info</h4>
//             <p><strong>Gender:</strong> {modalData.Gender}</p>
//             <p><strong>Date of Birth:</strong> {modalData['Date of Birth']}</p>
//             <p><strong>Age Next Birthday:</strong> {modalData['Age Next Birthday']}</p>
//             <p><strong>Marital Status:</strong> {modalData['Marital Status']}</p>
//         </section>

//         {/* CONTACT DETAILS */}
//         <section>
//             <h4>Contact Info</h4>
//             <p><strong>Residential Address:</strong> {modalData['Residential Address']}</p>
//             <p><strong>Email:</strong> {modalData['Email Address'] || modalData['Email Address_1']}</p>
//             <p><strong>Phone:</strong> {modalData['Phone number']}</p>
//             {modalData['WhatsApp Number (if different)'] && (
//                 <p><strong>WhatsApp:</strong> {modalData['WhatsApp Number (if different)']}</p>
//             )}
//         </section>

//         {/* EMPLOYMENT INFO */}
//         <section>
//             <h4>Employment</h4>
//             <p><strong>Currently Employed:</strong> {modalData['Are you currently Employed? ']}</p>
//             <p><strong>Department Applied:</strong> {modalData['\t']}</p>
//             <p><strong>Previous Company:</strong> {modalData['If yes above, state name of company'] || 'N/A'}</p>
//             <p><strong>Position:</strong> {modalData["If yes above, what's your current position?"] || 'N/A'}</p>
//             <p><strong>Salary:</strong> {modalData["If yes above, what's your current salary?"] || 'N/A'}</p>
//             <p><strong>Notice Period:</strong> {modalData['Job Cessation Notice Period Needed'] || 'N/A'}</p>
//             <p><strong>Minimum Salary Expectation:</strong> {modalData['Minimum Salary Expectation If Considered']}</p>
//             <p><strong>Okay with lower salary?</strong> {modalData['Should we contact you if the proposed salary is lower than your expected minimum figures?']}</p>
//         </section>

//         {/* EDUCATION & CERTIFICATIONS */}
//         <section>
//             <h4>Education & Certifications</h4>
//             <p><strong>Highest Qualification:</strong> {modalData['  Highest Educational Qualification  ']}</p>
//             <p><strong>NYSC Status:</strong> {modalData['NYSC Certification Status']}</p>
//             <p><strong>Post-NYSC Experience (years):</strong> {modalData['How many years post NYSC experience do you have?']}</p>
//             {modalData['If you have any other certifications or qualifications, please specify'] && (
//                 <p><strong>Other Certifications:</strong> {modalData['If you have any other certifications or qualifications, please specify']}</p>
//             )}
//         </section>

//         {/* APPLICATION */}
//         <section>
//             <h4>Application</h4>
//             <p><strong>Social Media Followed:</strong> {modalData['Which of our social media handles are you following?']}</p>
//             <p><strong>Interest in Position:</strong></p>
//             <p>{modalData['Briefly describe, in 100 words or fewer, why you are interested in this position. ']}</p>
//             <p><strong>CV / Cover Letter:</strong> <a href={modalData['Submit your cover letter and CV/Resume']} target="_blank" rel="noopener noreferrer">View Document</a></p>
//             <p><strong>Consent to Background Check:</strong> {modalData['If successful with the application process, MCC will conduct a background check on the contents of this form, do you have any objection to this?']}</p>
//         </section>
//     </div>

// </div>