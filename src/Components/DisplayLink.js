import React, { useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Copy from 'copy-to-clipboard';

export default function DisplayLink({label, url, copy}) {

    const copyToClipboard = (url,e) => {
        Copy(url);
    }

    return (
        <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            {label}
            </Form.Label>
            <Col sm={10}>
                <InputGroup>
                    <Form.Control readOnly={true} value={url}/>
                    <InputGroup.Append>
                        <Button variant="outline-dark" type="submit" onClick={(e) => {copyToClipboard(url, e)}}>📋</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}