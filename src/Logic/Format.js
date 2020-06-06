const regex = {
    space: /\s/g,
}

const FormatEmails = (str) => {
    let strArray = str.replace(regex.space,'').split(';');
    return strArray.join();
}

export default function FormatMailTo({recipients, cc, bcc, subject, body}) {
    const initial = "mailto:";
    if (!recipients) {
        return { 
            err: 'Missing Data',
        };
    }
    const emailRecipients = FormatEmails(recipients);
    let rest = [];
    if (cc) {
        let emailCc = "cc="+FormatEmails(cc);
        rest.push(emailCc);
    }

    if (bcc) {
        let emailBcc = "bcc="+FormatEmails(bcc);
        rest.push(emailBcc);
    }
    
    if (subject) {
        let emailSubject = "subject="+encodeURIComponent(subject);
        rest.push(emailSubject);
    }

    if (body) {
        let emailBody = "body="+encodeURIComponent(body);
        rest.push(emailBody);
    }

    const emailRest = (rest.length > 0) ? rest.join('&') : '';
    const mailTo = initial + emailRecipients + '?' + emailRest;
    
    return { 
        url: mailTo,
    };
}