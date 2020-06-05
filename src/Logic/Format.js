const regex = {
    newLine:  /[\n\r]/g,
    tab: /\t/g,
    space: /\s/g,
}

const encoding = {
    newLine: '%0A%0D',
    tab: '%09',
    space: '%20',
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
        let emailSubject = "subject="+subject.replace(regex.space, encoding.space);
        rest.push(emailSubject);
    }

    if (body) {
        let emailBody = "body="+body.replace(regex.newLine, encoding.newLine).replace(regex.tab, encoding.tab).replace(regex.space, encoding.space);
        rest.push(emailBody);
    }

    const emailRest = (rest.length > 0) ? rest.join('&') : '';
    const mailTo = initial + emailRecipients + '?' + emailRest;
    
    return { 
        url: mailTo,
    };
}