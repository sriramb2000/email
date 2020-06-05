import React, { useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function DisplayLink({label, url, copy}) {
    const linkRef = useRef(null);

    const copyToClipboard = (e) => {
        linkRef.current.select();
        document.execCommand('copy');

        e.target.focus();
    }

    return (
        <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            {label}
            </Form.Label>
            <Col sm={9}>
                <Form.Control readOnly={true} value={url} ref={linkRef}/>
            </Col>
            <Col className={(!copy) ? 'd-none d-md-block' : ''} sm={1}>
                <Button variant="outline-dark" type="submit" onClick={copyToClipboard}>📋</Button>
            </Col>
        </Form.Group>
        
    )
}